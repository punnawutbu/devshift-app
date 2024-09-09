// src/app/gold-price/page.tsx

"use client"; // เพิ่ม directive นี้เพื่อระบุว่าเป็น Client Component

import { useState, useEffect } from 'react';
import { Col, Label, Row } from "reactstrap";

interface GoldPrice {
  sellPrice: number;
  buyPrice: number;
  diff: number;
  sellAu23k: number;
  buyAu23k: number;
  sellAu22k: number;
  buyAu22k: number;
}

const GoldPricePage = () => {

  // const { t } = useTranslation("common");
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  // AU 22K = Gold 96.5 Jewelry
  const [sellAu22k, setSellAu22k] = useState<GoldPrice | null>(null);
  const [buyAu22k, setBuyAu22k] = useState<GoldPrice | null>(null);

  // AU 23K = Gold 96.5 Bar
  const [sellAu23k, setSellAu23k] = useState<GoldPrice | null>(null);
  const [buyAu23k, setBuyAu23k] = useState<GoldPrice | null>(null);

  useEffect(() => {
    // จำลองการดึงข้อมูล
    setTimeout(() => {
      setGoldPrice({
        sellPrice: 2000.50,
        buyPrice: 1980.75,
        diff: 19.75,
        sellAu23k: 40000.00,
        buyAu23k: 39900.00,
        sellAu22k: 40500.00,
        buyAu22k: 39188.60
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
    <>
      <div className="body">
        {/* Header */}
        <Row className="header-style">
          <Col className="col-8" style={{ margin: '1.25rem 0' }}>
            <Label className="price-th">Gold Price by GTA / ราคาทองตามประกาศของสมาคมค้าทองคำ</Label>
          </Col>
          <Col style={{ margin: '1.25rem 0' }}>
            <Label className="date-time">{date} เวลา {time}</Label>
          </Col>
        </Row>

        {/* Price Headers */}
        <Row className="header-price-row row-size">
          <Col>
            <Label className="head-1">ราคาทองคำ</Label>
          </Col>
          <Col>
            <Label className="head-1">ขายออก</Label>
          </Col>
          <Col>
            <Label className="head-1">รับซื้อ</Label>
          </Col>
        </Row>

        {/* Gold Bar 96.5% */}
        <Row className="row-size">
          <Col>
            <Label className="head-gold-type">ทองคำแท่ง 96.5%</Label>
          </Col>
          <Col>
            <Label className="price">{goldPrice.sellAu23k}</Label>
          </Col>
          <Col>
            <Label className="price">{goldPrice.buyAu23k}</Label>
          </Col>
        </Row>

        {/* Gold Ornament 96.5% */}
        <Row className="row-size">
          <Col>
            <Label className="head-gold-type">ทองรูปพรรณ 96.5%</Label>
          </Col>
          <Col>
            <Label className="price">{goldPrice.sellAu22k}</Label>
          </Col>
          <Col>
            <Label className="price">{goldPrice.buyAu22k}</Label>
          </Col>
        </Row>

        {/* Footer */}
        <Row className="page-footer" style={{ marginBottom: '8.125rem' }}>
          <Label>ข้อมูลจาก สมาคมค้าทองคำ</Label>
        </Row>
      </div>

    </>
  );
};

export default GoldPricePage;
