'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../styles/gold-price.css';

const { Text } = Typography;

interface GoldPrice {
  buy_bar: string;
  sell_bar: string;
  buy_ornament: string;
  sell_ornament: string;
  date: string;
  time: string;
  updatetime: string;
}

const formatThaiDate = (dateStr: string, lang: string) => {
  console.log("Formatting date:", dateStr, "for language:", lang);

  const parts = dateStr.split(" ");
  if (parts.length !== 3) {
    console.warn("Invalid dateStr format:", dateStr);
    return dateStr;
  }

  const [day, month, year] = parts;

  const monthNames: Record<string, string[]> = {
    th: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  const normalizedLang =
    lang.startsWith("th") ? "th" :
    lang.startsWith("en") ? "en" :
    "th"; // default

  const monthIndex = parseInt(month, 10) - 1;

  if (
    !monthNames[normalizedLang] ||
    Number.isNaN(monthIndex) ||
    monthIndex < 0 ||
    monthIndex > 11
  ) {
    console.warn("Invalid month/lang:", { lang, normalizedLang, month, monthIndex });
    return dateStr; // หรือ return "" / รูปแบบอื่นตามต้องการ
  }

  const monthName = monthNames[normalizedLang][monthIndex];
  const finalYear =
    normalizedLang === "th" ? year : (parseInt(year, 10) - 543).toString();

  return `${day} ${monthName} ${finalYear}`;
};

const formatRoundLabel = (text: string, lang: string) => {
  const match = text.match(/\d+/);
  const roundNumber = match ? match[0] : '';
  return lang === 'th' ? text : `Change ${roundNumber}`;
};

const formatUpdateTimeLabel = (text: string, lang: string) => {
  if (lang === 'th') return text;
  const match = text.match(/(\d{1,2}):(\d{2})/);
  if (!match) return text;

  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const period = hour >= 12 ? 'PM' : 'AM';
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  return `At ${hour}:${minute} ${period}`;
};

const GoldPricePage: React.FC = () => {
  const [goldPrice, setGoldPrice] = useState<GoldPrice>();
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch('/api/gold-price');
        // const response = await fetch('/.netlify/functions/getGoldPrice');
        const data: GoldPrice = await response.json();
        setGoldPrice(data);
      } catch (error) {
        console.error('Error fetching gold price:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldPrice();
    const intervalId = setInterval(fetchGoldPrice, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Text className="loading-text">{t('loading')}</Text>
      </div>
    );
  }

  return (
    <div className="body">
      {/* Header */}
      <Row className="header-style" justify="center">
        <Col span={24}>
          <Text className="Gold-Text title">{t('gpTitle')}</Text>
        </Col>
        <Col span={24}>
          <Text className="Gold-Text subtitle">
            {t('gpUpdate')} {formatThaiDate(goldPrice?.date || '', i18n.language)}{' '}
            {formatRoundLabel(goldPrice?.time || '', i18n.language)}{' '}
            {formatUpdateTimeLabel(goldPrice?.updatetime || '', i18n.language)}
          </Text>
        </Col>
      </Row>

      {/* Price Header */}
      <Row className="header-gold-row">
        <Col xs={8} md={6}>
          <Text className="Gold-Text">{t('gpGoldPrice')}</Text>
        </Col>
        <Col xs={8} md={6}>
          <Text className="Gold-Text">{t('gpSellPrice')}</Text>
        </Col>
        <Col xs={8} md={6}>
          <Text className="Gold-Text">{t('gpBuyPrice')}</Text>
        </Col>
      </Row>

      {/* Gold Bar */}
      <Row className="row-size">
        <Col xs={8} md={6}>
          <Text className="Gold-Text">{t('gpGoldBar')} 96.5%</Text>
        </Col>
        <Col xs={8} md={6}>
          <Text className="gold-price">{goldPrice?.sell_bar}</Text>
        </Col>
        <Col xs={8} md={6}>
          <Text className="gold-price">{goldPrice?.buy_bar}</Text>
        </Col>
      </Row>

      {/* Gold Ornament */}
      <Row className="row-size">
        <Col xs={8} md={6}>
          <Text className="Gold-Text">{t('gpGoldOrnament')} 96.5%</Text>
        </Col>
        <Col xs={8} md={6}>
          <Text className="gold-price">{goldPrice?.sell_ornament}</Text>
        </Col>
        <Col xs={8} md={6}>
          <Text className="gold-price">{goldPrice?.buy_ornament}</Text>
        </Col>
      </Row>

      {/* Footer */}
      <div className="page-footer">
        <Text>{t('source')}</Text>
      </div>
    </div>
  );
};

export default GoldPricePage;
