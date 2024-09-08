// src/app/gold-price/page.tsx

"use client"; // เพิ่ม directive นี้เพื่อระบุว่าเป็น Client Component

import { useState, useEffect } from 'react';

interface GoldPrice {
  sellPrice: number;
  buyPrice: number;
  diff: number;
}

const GoldPricePage = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // จำลองการดึงข้อมูล
    setTimeout(() => {
      setGoldPrice({
        sellPrice: 2000.50,
        buyPrice: 1980.75,
        diff: 19.75
      });
      setLoading(false);
    }, 1000); // จำลองการโหลดข้อมูล
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!goldPrice) {
    return <div className="text-center py-8">No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">ราคาทองตามประกาศของสมาคมค้าทองคำ</h1>
      <div className="bg-GoldPrice p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold"> ประจำวันที่</h2>
          <p className="text-lg">Sell Price: ${goldPrice.sellPrice.toFixed(2)}</p>
          <p className="text-lg">Buy Price: ${goldPrice.buyPrice.toFixed(2)}</p>
          <p className="text-lg">Difference: ${goldPrice.diff.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default GoldPricePage;
