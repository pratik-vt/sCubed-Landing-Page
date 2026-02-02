import { NextRequest, NextResponse } from 'next/server';

const PLACES_DETAILS_URL = 'https://places.googleapis.com/v1/places';

interface PlaceDetailsV1Response {
  addressComponents?: Array<{
    longText: string;
    shortText: string;
    types: string[];
  }>;
  formattedAddress?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  timeZone?: {
    id: string;
  };
  error?: {
    message: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ placeId: string }> }
) {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.error('GOOGLE_PLACES_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    const { placeId } = await params;

    if (!placeId) {
      return NextResponse.json(
        { error: 'Place ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${PLACES_DETAILS_URL}/${placeId}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'addressComponents,formattedAddress,location,timeZone',
      },
    });

    if (!response.ok) {
      console.error('Google Places API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch place details' },
        { status: response.status }
      );
    }

    const data: PlaceDetailsV1Response = await response.json();

    if (data.error) {
      console.error('Places API error:', data.error.message);
      return NextResponse.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Place details API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
