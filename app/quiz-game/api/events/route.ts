import { NextResponse } from 'next/server';
import { events } from '@/lib/my-events'; // Your original data source

/**
 * Handles GET requests to /api/events.
 * This function fetches the event data (currently from a local file)
 * and returns it as a JSON response.
 */
export async function GET() {
  try {
    // In a real-world scenario, you might fetch this from a database.
    // For now, we are just returning the static data from the file.
    if (!events) {
      // Data not found, return a 404 error
      return new NextResponse('Event data not found', { status: 404 });
    }
    
    // Send the events array as a JSON response with a 200 OK status
    return NextResponse.json(events, { status: 200 });

  } catch (error) {
    
    console.error('[API_EVENTS_GET] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
