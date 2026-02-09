
import { NextResponse } from 'next/server';
import { getGoldPriceFromGTA } from '../../../../service/goldPriceService';

export async function GET() {
  try {
    const goldPrice = await getGoldPriceFromGTA();
    return NextResponse.json(goldPrice);
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
