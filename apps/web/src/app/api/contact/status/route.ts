import { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/api-client';
import { isApiError } from '@/types/api';

interface FormData {
  email_id?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  company_name?: string;
  state?: string;
  comments?: string;
}

interface FormStatusResponse {
  current_step: number;
  completion_status: 'incomplete' | 'completed';
  form_data: FormData;
}

export async function GET(request: NextRequest) {
  try {
    // Get session token from query parameters
    const { searchParams } = new URL(request.url);
    const session = searchParams.get('session');

    if (!session) {
      return NextResponse.json(
        {
          errors: [{ message: 'Session parameter is required' }],
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
          errors: [{ message: 'Service configuration error' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }

    try {
      // Forward the request to the admin API
      const data = await fetchApi<FormStatusResponse>(
        `pages/contact-us/status?session=${encodeURIComponent(session)}`,
        {
          method: 'GET',
        }
      );

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      // Handle API errors
      if (isApiError(error)) {
        return NextResponse.json(
          {
            errors: error.errors,
            status_code: error.statusCode,
          },
          { status: error.statusCode }
        );
      }

      // Handle unexpected errors
      return NextResponse.json(
        {
          errors: [{ message: 'An unexpected error occurred' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form status API error:', error);
    return NextResponse.json(
      {
        errors: [{ message: 'An unexpected error occurred. Please try again later.' }],
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
