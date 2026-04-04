'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Row, Col, Typography, Spin, Tag, Alert, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../styles/gold-price-dashboard.css';

import { formatDateTimeLocalized, formatNumber } from '@/utils/goldFormat';

const { Title, Text } = Typography;

type LatestResponse = {
  source: string;
  goldPriceID: number;
  asTime: string;
  seq: number;
  priceSeq: number;
  bar_buy: number;
  bar_sell: number;
  orn_buy: number;
  orn_sell: number;
  usd_thb: number;
  gold_spot: number;
  change_prev: number;
  change_day: number;
};

const formatTime = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

const changeTag = (change?: number) => {
  if (change == null || Number.isNaN(change)) return null;
  if (change === 0) return <Tag>0</Tag>;

  return (
    <Tag color={change > 0 ? 'green' : 'red'}>
      {change > 0 ? `+${formatNumber(change)}` : formatNumber(change)}
    </Tag>
  );
};

const getGoldApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    return 'https://gold-api.nimitx.studio';
  }

  const host = window.location.hostname;

  if (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === 'app-01.lab.nimitx' ||
    host.endsWith('.lab.nimitx')
  ) {
    return 'http://app-01.lab.nimitx:31001';
  }

  return 'https://gold-api.nimitx.studio';
};

const mapLatestResponse = (payload: any): LatestResponse => {
  const p = payload?.data ?? {};

  return {
    source: payload?.source ?? 'goldtraders',
    goldPriceID: p.goldPriceID ?? 0,
    asTime: p.asTime ?? '',
    seq: p.seq ?? 0,
    priceSeq: p.priceSeq ?? 0,
    bar_buy: p.bL_BuyPrice ?? 0,
    bar_sell: p.bL_SellPrice ?? 0,
    orn_buy: p.oM965_BuyPrice ?? 0,
    orn_sell: p.oM965_SellPrice ?? 0,
    usd_thb: p.bahtPerUSD ?? 0,
    gold_spot: p.goldSpot ?? 0,
    change_prev: p.priceChangeFromPrevRow ?? 0,
    change_day: p.priceChangeFromPrevDayLast ?? 0,
  };
};

const GoldPriceDashboardPage: React.FC = () => {
  const { t, i18n, ready } = useTranslation();

  const [mounted, setMounted] = useState(false);
  const [latest, setLatest] = useState<LatestResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [latestError, setLatestError] = useState('');
  const hasFetchedOnce = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchLatest = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }

    setLatestError('');

    try {
      const baseUrl = getGoldApiBaseUrl();

      const res = await fetch(`${baseUrl}/api/gold/latest`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`Latest HTTP ${res.status}`);
      }

      const payload = await res.json();
      const mapped = mapLatestResponse(payload);

      setLatest(mapped);
    } catch (err: any) {
      setLatest(null);
      setLatestError(err?.message ?? 'Latest fetch failed');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  // initial fetch
  useEffect(() => {
    if (!mounted || hasFetchedOnce.current) return;

    hasFetchedOnce.current = true;
    void fetchLatest(true);
  }, [mounted, fetchLatest]);

  // polling
  useEffect(() => {
    if (!mounted) return;

    const id = setInterval(() => {
      void fetchLatest(false);
    }, 15000);

    return () => clearInterval(id);
  }, [mounted, fetchLatest]);

  if (!mounted || !ready) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (loading && !latest) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Text>{t('loading')}</Text>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ marginBottom: 0 }}>
            {t('gpTitle')}
          </Title>

          <Text type="secondary">
            {latest ? formatDateTimeLocalized(latest.asTime, i18n.resolvedLanguage) : '-'}
          </Text>
        </Col>

        <Col>
          <Button onClick={() => void fetchLatest(true)}>{t('refresh')}</Button>
        </Col>
      </Row>

      {latestError && (
        <div style={{ marginTop: 12 }}>
          <Alert type="error" showIcon message={t('latestUnavailable')} description={latestError} />
        </div>
      )}

      <Row gutter={[16, 16]} style={{ marginTop: 16 }} className="ds-card-row">
        <Col xs={24} md={12}>
          <div className="ds-card">
            <div className="ds-card-body">
              <Row justify="space-between" align="middle">
                <Col>
                  <Text strong>
                    {t('gpGoldBar')} 96.5%
                  </Text>{' '}
                  {changeTag(latest?.change_prev)}
                </Col>
                <Col>
                  <Text type="secondary">
                    {t('gpUpdate')} {formatTime(latest?.asTime)}
                  </Text>
                </Col>
              </Row>

              <Row gutter={12} style={{ marginTop: 12 }}>
                <Col span={12}>
                  <Text type="secondary">{t('buy')}</Text>
                  <div className="ds-price">{formatNumber(latest?.bar_buy)}</div>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t('sell')}</Text>
                  <div className="ds-price">{formatNumber(latest?.bar_sell)}</div>
                </Col>
              </Row>

              <div className="ds-divider" />
              <Text type="secondary">{t('gpSource')}</Text>
            </div>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="ds-card">
            <div className="ds-card-body">
              <Row justify="space-between" align="middle">
                <Col>
                  <Text strong>
                    {t('gpGoldOrnament')} 96.5%
                  </Text>{' '}
                  {changeTag(latest?.change_prev)}
                </Col>
                <Col />
              </Row>

              <Row gutter={12} style={{ marginTop: 12 }}>
                <Col span={12}>
                  <Text type="secondary">{t('buy')}</Text>
                  <div className="ds-price">{formatNumber(latest?.orn_buy)}</div>
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t('sell')}</Text>
                  <div className="ds-price">{formatNumber(latest?.orn_sell)}</div>
                </Col>
              </Row>

              <div className="ds-divider" />

              <Row gutter={12}>
                <Col span={12}>
                  <Text type="secondary">{t('gpUsdThb')}</Text>
                  <div className="ds-metric">{formatNumber(latest?.usd_thb)}</div>
                </Col>

                <Col span={12}>
                  <Text type="secondary">{t('gpSpot')}</Text>
                  <div className="ds-metric">{formatNumber(latest?.gold_spot)}</div>
                </Col>
              </Row>

              <div style={{ marginTop: 10 }}>
                <Tag>
                  {t('gpTime')} {formatTime(latest?.asTime)}
                </Tag>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GoldPriceDashboardPage;