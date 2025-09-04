import crypto from 'crypto';

import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

interface NewsletterFormData {
  email: string;
  recaptcha_token?: string;
}

interface ApiError {
  field: string;
  message: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
  status_code: number;
}

interface ApiSuccessResponse {
  success: boolean;
  message: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  // Use V3 secret key for newsletter (invisible reCAPTCHA)
  const secretKey = process.env.RECAPTCHA_SECRET_KEY_V3;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY_V3 environment variable is not set');
    return false;
  }

  if (!token || token.trim() === '') {
    console.error('reCAPTCHA token is empty or null');
    return false;
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();
    
    if (!data.success && data['error-codes']) {
      console.error('reCAPTCHA API Error Codes:', data['error-codes']);
    }
    
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

function initializeMailchimp() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !serverPrefix) {
    throw new Error('Mailchimp configuration is missing');
  }

  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  return mailchimp;
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterFormData = await request.json();

    if (!body.email) {
      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'email', message: 'Email is required' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'email', message: 'Please enter a valid email address' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    if (!body.recaptcha_token) {
      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'recaptcha', message: 'Please complete the reCAPTCHA verification' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(body.recaptcha_token);
    if (!isRecaptchaValid) {
      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'recaptcha', message: 'reCAPTCHA verification failed. Please try again.' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    const listId = process.env.MAILCHIMP_LIST_ID;
    
    if (!listId) {
      console.error('MAILCHIMP_LIST_ID environment variable is not set');
      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'general', message: 'Newsletter service is not configured' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }

    try {
      const mc = initializeMailchimp();
      
      const subscriberHash = crypto
        .createHash('md5')
        .update(body.email.toLowerCase())
        .digest('hex');

      try {
        const existingMember = await mc.lists.getListMember(listId, subscriberHash);
        
        if (existingMember.status === 'subscribed') {
          return NextResponse.json<ApiSuccessResponse>(
            {
              success: true,
              message: "You're already subscribed to our newsletter!",
            },
            { status: 200 }
          );
        } else {
          await mc.lists.updateListMember(listId, subscriberHash, {
            status: 'subscribed',
          });

          return NextResponse.json<ApiSuccessResponse>(
            {
              success: true,
              message: 'Welcome back! You have been re-subscribed to our newsletter.',
            },
            { status: 200 }
          );
        }
      } catch (error: any) {
        if (error.status === 404) {
          const response = await mc.lists.addListMember(listId, {
            email_address: body.email,
            status: 'subscribed',
            merge_fields: {
              SOURCE: 'Website Footer',
            },
            tags: ['Website Signup'],
          });

          return NextResponse.json<ApiSuccessResponse>(
            {
              success: true,
              message: 'Thank you for subscribing to our newsletter!',
            },
            { status: 200 }
          );
        } else {
          throw error;
        }
      }
    } catch (mailchimpError: any) {
      console.error('Mailchimp API error:', mailchimpError);
      
      if (mailchimpError.response?.body?.title === 'Member Exists') {
        return NextResponse.json<ApiSuccessResponse>(
          {
            success: true,
            message: "You're already on our list!",
          },
          { status: 200 }
        );
      }

      if (mailchimpError.response?.body?.detail) {
        return NextResponse.json<ApiErrorResponse>(
          {
            errors: [{ field: 'email', message: mailchimpError.response.body.detail }],
            status_code: 400,
          },
          { status: 400 }
        );
      }

      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'general', message: 'Failed to subscribe. Please try again later.' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json<ApiErrorResponse>(
      {
        errors: [{ field: 'general', message: 'An unexpected error occurred. Please try again later.' }],
        status_code: 500,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}