import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  first_name: string;
  last_name: string;
  company_name?: string;
  phone_number: string;
  email_id: string;
  state?: string;
  specialities?: string;
  staff?: number;
  other_software_experience?: boolean;
  software_name?: string;
  comments?: string;
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

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY environment variable is not set');
    return false;
  }

  if (!token || token.trim() === '') {
    console.error('reCAPTCHA token is empty or null');
    return false;
  }

  try {
    // Use URLSearchParams for proper encoding
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

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ContactFormData = await request.json();

    // Basic server-side validation
    if (!body.first_name || !body.email_id) {
      return NextResponse.json(
        {
          errors: [
            ...(body.first_name ? [] : [{ field: 'first_name', message: 'First name is required' }]),
            ...(body.email_id ? [] : [{ field: 'email_id', message: 'Email is required' }]),
          ],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    if (!body.recaptcha_token) {
      return NextResponse.json(
        {
          errors: [{ field: 'recaptcha', message: 'Please complete the reCAPTCHA verification' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(body.recaptcha_token);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        {
          errors: [{ field: 'recaptcha', message: 'reCAPTCHA verification failed. Please try again.' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email_id)) {
      return NextResponse.json(
        {
          errors: [{ field: 'email_id', message: 'Please enter a valid email address' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    // Get the admin API URL from environment variables
    const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_APP_API_URL;
    
    if (!adminApiUrl) {
      console.error('NEXT_PUBLIC_ADMIN_APP_API_URL environment variable is not set');
      return NextResponse.json(
        {
          errors: [{ field: 'general', message: 'Service configuration error' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }

    // Remove recaptcha_token before forwarding to admin API
    const { recaptcha_token, ...bodyForApi } = body;

    // Forward the request to the admin API
    const response = await fetch(`${adminApiUrl}pages/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify(bodyForApi),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      // Handle API errors
      let errorData: ApiErrorResponse;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          errors: [{ field: 'general', message: 'An unexpected error occurred' }],
          status_code: response.status,
        };
      }

      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      {
        errors: [{ field: 'general', message: 'An unexpected error occurred. Please try again later.' }],
        status_code: 500,
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
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
