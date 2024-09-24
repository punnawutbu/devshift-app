"use client";
import React, { useEffect, useState } from 'react';
import { Col, Label, Row } from "reactstrap";
import '../../styles/gold-price.css';
import LoadingSpinner from '../../components/LoadingSpinner';

interface GoldPrice {
  buy_bar: string;
  sell_bar: string;
  buy_ornament: string;
  sell_ornament: string;
  date: string;
  time: string;
  updatetime: string;
}

const GoldPricePage: React.FC = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice>();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchGoldPrice = async () => {
  //     try {
  //       const response = await fetch('/api/gold-price');
  //       const data: GoldPrice = await response.json();
  //       setGoldPrice(data);
  //       setLoading(false);
  //       console.log('data' , typeof data );
  //       console.log('buy_bar' , typeof data.buy_bar );
  //     } catch (error) {
  //       console.error('Error fetching gold price:', error);
  //       setLoading(false);
  //     }
  //   };
  //   const intervalId = setInterval(fetchGoldPrice, 5000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);
  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch('/.netlify/functions/getGoldPrice');
        const data = await response.json();
        setGoldPrice(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gold price:', error);
        setLoading(false);
      }
    };

    fetchGoldPrice();
    const intervalId = setInterval(fetchGoldPrice, 5 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="body">
          {/* Header */}
          <Row className="header-style">
            <div className="header-text">
              <Label className="Gold-Text">
                Gold Price by GTA / ราคาทองตามประกาศของสมาคมค้าทองคำ
              </Label>
            </div>
            <Col xs={12} >
              <Label className="Gold-Text">
                ประจำวันที่ {goldPrice?.date} {goldPrice?.time} {goldPrice?.updatetime}
              </Label>
            </Col>
          </Row>

          {/* Price Headers */}
          <Row className="header-gold-row">
            <Col xs={6} md={4}>
              <Label className="Gold-Text">ราคาทองคำ</Label>
            </Col>
            <Col xs={3} md={4}>
              <Label className="Gold-Text">ขายออก</Label>
            </Col>
            <Col xs={3} md={4}>
              <Label className="Gold-Text">รับซื้อ</Label>
            </Col>
          </Row>

          <Row className="gold-price-row">
            {/* Gold Bar 96.5% */}
            <Row className="row-size">
              <Col xs={6} md={4}>
                <Label className="Gold-Text">ทองคำแท่ง 96.5%</Label>
              </Col>
              <Col xs={3} md={4}>
                <Label className="price">{goldPrice?.sell_bar}</Label>
              </Col>
              <Col xs={3} md={4}>
                <Label className="price">{goldPrice?.buy_bar}</Label>
              </Col>
            </Row>

            {/* Gold Ornament 96.5% */}
            <Row className="row-size">
              <Col xs={6} md={4}>
                <Label className="Gold-Text">ทองรูปพรรณ 96.5%</Label>
              </Col>
              <Col xs={3} md={4}>
                <Label className="price">{goldPrice?.sell_ornament}</Label>
              </Col>
              <Col xs={3} md={4}>
                <Label className="price">{goldPrice?.buy_ornament}</Label>
              </Col>
            </Row>

          </Row>

          {/* Footer */}
          <div className="page-footer" style={{ marginBottom: '8.125rem' }}>
            <Label>ข้อมูลจาก สมาคมค้าทองคำ</Label>
          </div>
        </div>
      )}
    </>

  );
};

export default GoldPricePage;
