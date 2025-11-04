import { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/api-client';
import { isApiError } from '@/types/api';

interface FreeTrialFormData {
  clinic_name: string;
  tax_id: string;
  street_address_line_1: string;
  street_address_line_2?: string;
  state_id: number;
  city_id: string;
  zipcode: string;
  npi: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
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
  // Use V3 secret key for invisible reCAPTCHA
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

    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      },
    );

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

// Function to split full name into first and last name
function splitFullName(
  fullName: string,
): { firstName: string; lastName: string } | null {
  const nameParts = fullName.trim().split(/\s+/);

  // Require at least two name parts
  if (nameParts.length < 2) {
    return null;
  }

  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return { firstName, lastName };
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Basic server-side validation
    if (!body.clinic_name || !body.full_name || !body.email) {
      return NextResponse.json(
        {
          errors: [
            ...(body.clinic_name
              ? []
              : [{ field: 'clinic_name', message: 'Clinic name is required' }]),
            ...(body.full_name
              ? []
              : [{ field: 'full_name', message: 'Full name is required' }]),
            ...(body.email
              ? []
              : [{ field: 'email', message: 'Email is required' }]),
          ],
          status_code: 400,
        },
        { status: 400 },
      );
    }

    // Verify reCAPTCHA token
    if (!body.recaptcha_token) {
      return NextResponse.json(
        {
          errors: [
            {
              field: 'recaptcha',
              message: 'Please complete the reCAPTCHA verification',
            },
          ],
          status_code: 400,
        },
        { status: 400 },
      );
    }

    const isRecaptchaValid = await verifyRecaptcha(body.recaptcha_token);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        {
          errors: [
            {
              field: 'recaptcha',
              message: 'reCAPTCHA verification failed. Please try again.',
            },
          ],
          status_code: 400,
        },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          errors: [
            { field: 'email', message: 'Please enter a valid email address' },
          ],
          status_code: 400,
        },
        { status: 400 },
      );
    }

    // Split full name into first and last name
    const nameResult = splitFullName(body.full_name);

    if (!nameResult) {
      return NextResponse.json(
        {
          errors: [
            {
              field: 'full_name',
              message: 'Please enter your full name (first and last name)',
            },
          ],
          status_code: 400,
        },
        { status: 400 },
      );
    }

    const { firstName, lastName } = nameResult;

    // Get the admin API URL from environment variables
    const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_APP_API_URL;

    if (!adminApiUrl) {
      console.error(
        'NEXT_PUBLIC_ADMIN_APP_API_URL environment variable is not set',
      );
      return NextResponse.json(
        {
          errors: [
            { field: 'general', message: 'Service configuration error' },
          ],
          status_code: 500,
        },
        { status: 500 },
      );
    }

    // Prepare the API payload
    const apiPayload: FreeTrialFormData = {
      clinic_name: body.clinic_name,
      tax_id: body.tax_id.replace(/-/g, ''), // Remove hyphen from Tax ID
      street_address_line_1: body.address_line_1,
      street_address_line_2: body.address_line_2 || '',
      state_id: parseInt(body.state_id, 10),
      city_id: body.city_id,
      zipcode: body.zip_code,
      npi: body.npi,
      first_name: firstName,
      last_name: lastName,
      email: body.email,
      phone_number: body.phone_number,
    };

    try {
      // Forward the request to the admin API using centralized API client
      const data = await fetchApi('pages/free-trial-registration', {
        method: 'POST',
        body: apiPayload as unknown as Record<string, unknown>,
      });

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      // Handle API errors
      if (isApiError(error)) {
        // Map API field names back to frontend field names
        const fieldMapping: Record<string, string> = {
          clinic_name: 'clinic_name',
          tax_id: 'tax_id',
          street_address_line_1: 'address_line_1',
          street_address_line_2: 'address_line_2',
          state_id: 'state',
          city_id: 'city',
          zipcode: 'zip_code',
          npi: 'npi',
          first_name: 'full_name',
          last_name: 'full_name',
          email: 'email',
          phone_number: 'phone_number',
        };

        const mappedErrors = error.errors.map((err) => ({
          ...err,
          field: err.field ? fieldMapping[err.field] || err.field : err.field,
        }));

        return NextResponse.json(
          {
            errors: mappedErrors,
            status_code: error.statusCode,
          },
          { status: error.statusCode }
        );
      }

      // Handle unexpected errors
      return NextResponse.json(
        {
          errors: [{ field: 'general', message: 'An unexpected error occurred' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Free trial API error:', error);
    return NextResponse.json(
      {
        errors: [
          {
            field: 'general',
            message: 'An unexpected error occurred. Please try again later.',
          },
        ],
        status_code: 500,
      },
      { status: 500 },
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
