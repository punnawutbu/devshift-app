// src/app/gold-price/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { Col, Label, Row } from "reactstrap";

interface GoldPrice {
  buy_bar: string;
  sell_bar: string;
  buy_ornament: string;
  sell_ornament: string;
  date: string;
  updatetime: string;
}

const GoldPricePage: React.FC = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice | null>(null);

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch('/api/gold-price');
        const data: GoldPrice = await response.json();
        setGoldPrice(data);
      } catch (error) {
        console.error('Error fetching gold price:', error);
      }
    };

    fetchGoldPrice();
    const intervalId = setInterval(fetchGoldPrice, 1200000); // 20 นาที = 1200000 มิลลิวินาที
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      {goldPrice ? (
        <div className="body">
          {/* Header */}
          <Row className="header-style">
            <Col className="col-8" style={{ margin: '1.25rem 0' }}>
              <Label className="price-th">Gold Price by GTA / ราคาทองตามประกาศของสมาคมค้าทองคำ</Label>
            </Col>
            <Col style={{ margin: '1.25rem 0' }}>
              <Label className="date-time">{goldPrice.updatetime}</Label>
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
              <Label className="price">{goldPrice.sell_bar}</Label>
            </Col>
            <Col>
              <Label className="price">{goldPrice.buy_bar}</Label>
            </Col>
          </Row>

          {/* Gold Ornament 96.5% */}
          <Row className="row-size">
            <Col>
              <Label className="head-gold-type">ทองรูปพรรณ 96.5%</Label>
            </Col>
            <Col>
              <Label className="price">{goldPrice.sell_ornament}</Label>
            </Col>
            <Col>
              <Label className="price">{goldPrice.buy_ornament}</Label>
            </Col>
          </Row>

          {/* Footer */}
          <Row className="page-footer" style={{ marginBottom: '8.125rem' }}>
            <Label>ข้อมูลจาก สมาคมค้าทองคำ</Label>
          </Row>
        </div>
      ) : (
        <p>ไม่มีข้อมูลราคาทองคำ</p>
      )}
    </>
  );
};

export default GoldPricePage;
