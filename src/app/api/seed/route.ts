import { NextRequest, NextResponse } from 'next/server';
import { SelectionSeeder } from '@/lib/seeder';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    let result;
    
    switch (action) {
      case 'reset-votes':
        result = await SelectionSeeder.resetVotes();
        break;
      case 'seed':
      default:
        result = await SelectionSeeder.seedSelections();
        break;
    }

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 500 });
    }

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get('gender') as 'male' | 'female' | null;

    let result;
    
    if (gender) {
      result = await SelectionSeeder.getSelectionsByGender(gender);
    } else {
      result = await SelectionSeeder.getSelections();
    }

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 500 });
    }

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}