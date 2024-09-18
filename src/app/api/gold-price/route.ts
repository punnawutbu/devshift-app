// src/app/api/gold-price/route.ts
import { NextResponse } from 'next/server';
import { getGoldPrice } from '../../../../service/goldPriceService';

export async function GET() {
  try {
    const goldPrice = await getGoldPrice();
    return NextResponse.json(goldPrice);
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
