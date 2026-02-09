'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Typography, Spin, Table, Tag, Alert, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../styles/gold-price-dashboard.css';

import GoldTrendSparkline from '@/components/charts/GoldTrendSparkline';
import { formatDateTimeLocalized, formatNumber } from '@/utils/goldFormat';

const { Title, Text } = Typography;

/* ================= TYPES ================= */

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

type HistoryItem = {
  goldPriceID: number;
  asTime: string;
  seq: number;
  priceSeq: number;
  bL_BuyPrice: number;
  bL_SellPrice: number;
  oM965_BuyPrice: number;
  oM965_SellPrice: number;
  bahtPerUSD: number;
  goldSpot: number;
  priceChangeFromPrevRow: number;
};

/* ================= HELPERS ================= */

const formatTime = (iso?: string) => {
  if (!iso) return '-';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
};

const toDateOnly = (iso?: string) => iso?.slice(0, 10) ?? '';

const changeTag = (change?: number) => {
  if (change == null || Number.isNaN(change)) return null;
  if (change === 0) return <Tag>0</Tag>;

  return (
    <Tag color={change > 0 ? 'green' : 'red'}>
      {change > 0 ? `+${formatNumber(change)}` : formatNumber(change)}
    </Tag>
  );
};

/* ================= COMPONENT ================= */

const GoldPriceDashboardPage: React.FC = () => {
  const { t, i18n, ready } = useTranslation();

  const [mounted, setMounted] = useState(false);

  const [latest, setLatest] = useState<LatestResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [latestError, setLatestError] = useState('');
  const [historyError, setHistoryError] = useState('');

  /* ---------- mount guard (กัน hydration mismatch) ---------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- FETCH ---------- */

  const fetchAll = async () => {
    setLoading(true);
    setLatestError('');
    setHistoryError('');

    let latestData: LatestResponse | null = null;

    try {
      // const res = await fetch('/.netlify/functions/getGoldLatest', { cache: 'no-store' });
      // if (!res.ok) throw new Error(`Latest HTTP ${res.status}`);

      // const data: LatestResponse = await res.json();
      const data: LatestResponse = {
        source: 'Mock Source',
        goldPriceID: 0,
        asTime: new Date().toISOString(),
        seq: 0,
        priceSeq: 0,
        bar_buy: 0,
        bar_sell: 0,
        orn_buy: 0,
        orn_sell: 0,
        usd_thb: 0,
        gold_spot: 0,
        change_prev: 0,
        change_day: 0,
      };
      latestData = data;
      setLatest(data);
    } catch (err: any) {
      setLatest(null);
      setLatestError(err?.message ?? 'Latest fetch failed');
    }

    try {
      const date = toDateOnly(latestData?.asTime);
      if (!date) throw new Error('No date');

      // const res = await fetch(
      //   `/.netlify/functions/getGoldHistory?startDate=${date}&endDate=${date}`,
      //   { cache: 'no-store' }
      // );

      // if (!res.ok) throw new Error(`History HTTP ${res.status}`);

      // const arr: HistoryItem[] = await res.json();
      const arr: HistoryItem[] = [];

      setHistory(
        [...arr].sort((a, b) => new Date(b.asTime).getTime() - new Date(a.asTime).getTime())
      );
    } catch (err: any) {
      setHistory([]);
      setHistoryError(err?.message ?? 'History fetch failed');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!mounted || !ready) return;

    fetchAll();
    const id = setInterval(fetchAll, 15000);
    return () => clearInterval(id);
  }, [mounted, ready, i18n.resolvedLanguage]);

  /* ---------- SPARK DATA ---------- */
  const sparkPricesBarSell = useMemo(() => {
    if (!history?.length) return [];
    const asc = [...history].sort((a, b) => new Date(a.asTime).getTime() - new Date(b.asTime).getTime());
    return asc.map((x) => x.bL_SellPrice).filter((v) => typeof v === 'number' && !Number.isNaN(v));
  }, [history]);

  /* ---------- TABLE ---------- */

  const columns = useMemo(
    () => [
      { title: t('gpNo'), dataIndex: 'seq', width: 70 },
      { title: t('gpTime'), dataIndex: 'asTime', render: (v: string) => formatTime(v) },
      { title: t('gpBarSell'), dataIndex: 'bL_SellPrice', render: formatNumber },
      { title: t('gpBarBuy'), dataIndex: 'bL_BuyPrice', render: formatNumber },
      { title: t('gpOrnSell'), dataIndex: 'oM965_SellPrice', render: formatNumber },
      { title: t('gpOrnBuy'), dataIndex: 'oM965_BuyPrice', render: formatNumber },
      { title: 'USD/THB', dataIndex: 'bahtPerUSD', render: formatNumber },
      { title: 'Gold Spot', dataIndex: 'goldSpot', render: formatNumber },
      { title: t('gpChange'), dataIndex: 'priceChangeFromPrevRow', render: changeTag },
    ],
    [t]
  );

  /* ---------- Guard render ---------- */

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

  /* ================= RENDER ================= */

  return (
    <div style={{ padding: 24 }}>
      {/* HEADER */}
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
          <Button onClick={fetchAll}>{t('refresh')}</Button>
        </Col>
      </Row>

      {latestError && (
        <div style={{ marginTop: 12 }}>
          <Alert type="error" showIcon message={t('latestUnavailable')} description={latestError} />
        </div>
      )}

      {historyError && (
        <div style={{ marginTop: 12 }}>
          <Alert type="warning" showIcon message={t('historyUnavailable')} description={historyError} />
        </div>
      )}

      <Row gutter={[16, 16]} style={{ marginTop: 16 }} className="ds-card-row">
        {/* BAR */}
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

              <div className="ds-trend-wrap">
                <Text type="secondary">{t('gpPriceTrend')}</Text>
                <div className="ds-trend-placeholder">
                  {sparkPricesBarSell.length > 1 ? (
                    <GoldTrendSparkline prices={sparkPricesBarSell} />
                  ) : (
                    <div style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                      <Text type="secondary">{t('gpNoTrendData')}</Text>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>

        {/* ORNAMENT */}
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

              {/* spacer ให้สูงเท่ากันกับฝั่งซ้าย */}
              <div style={{ flex: 1 }} />
            </div>
          </div>
        </Col>
      </Row>

      {/* History */}
      <div className="ds-card" style={{ marginTop: 20 }}>
        <Title level={4} style={{ marginTop: 0 }}>
          {t('gpRecentChanges')}
        </Title>

        <Table
          rowKey={(r) => `${r.goldPriceID}-${r.seq}`}
          columns={columns as any}
          dataSource={history}
          pagination={false}
        />

        <div style={{ marginTop: 10 }}>
          <Text type="secondary">{t('gpSource')}</Text>
        </div>
      </div>
    </div>
  );
};

export default GoldPriceDashboardPage;
