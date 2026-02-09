'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { formatNumber } from '@/utils/goldFormat';

type Props = {
  prices: number[];       // old -> new
  labels?: string[];      // optional old -> new
  height?: number;        // default 180
};

type Point = { i: number; value: number; label?: string };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const GoldTrendSparkline: React.FC<Props> = ({ prices, labels, height = 180 }) => {
  const data: Point[] = useMemo(() => {
    return (prices ?? [])
      .filter((v) => typeof v === 'number' && !Number.isNaN(v))
      .map((v, i) => ({ i, value: v, label: labels?.[i] }));
  }, [prices, labels]);

  const domain = useMemo<[number, number]>(() => {
    if (data.length < 2) return [0, 1];

    let min = Infinity;
    let max = -Infinity;
    for (const p of data) {
      if (p.value < min) min = p.value;
      if (p.value > max) max = p.value;
    }

    const range = Math.max(max - min, 1);
    const pad = clamp(range * 0.18, 20, 500); // เพิ่ม pad ให้ “เห็น wave” ชัดขึ้น
    const extra = range < 60 ? 60 : 0;        // ถ้าราบมาก ให้ zoom เพิ่มอีก

    return [min - pad - extra, max + pad + extra];
  }, [data]);

  const trend = useMemo(() => {
    if (data.length < 2) return 0;
    return data[data.length - 1].value - data[0].value;
  }, [data]);

  // สีตามเทรนด์
  const stroke = trend >= 0 ? '#16a34a' : '#dc2626'; // green / red
  const fillId = trend >= 0 ? 'trendFillUp' : 'trendFillDown';
  const glowId = trend >= 0 ? 'glowUp' : 'glowDown';

  const tooltipFormatter = (value: unknown) => {
    const n = typeof value === 'number' ? value : Number(value);
    return [formatNumber(Number.isNaN(n) ? undefined : n), ''];
  };

  const labelFormatter = (label: unknown) => {
    const idx = typeof label === 'number' ? label : Number(label);
    const l = data[idx]?.label;
    return l ? l : '';
  };

  const lastDot = (props: any) => {
    const { cx, cy, index } = props;
    if (index !== data.length - 1) return null;
    return (
      <g>
        {/* outer ring */}
        <circle cx={cx} cy={cy} r={7} fill="#fff" opacity={0.95} />
        <circle cx={cx} cy={cy} r={6} fill={stroke} opacity={0.18} />
        {/* inner dot */}
        <circle cx={cx} cy={cy} r={3.5} fill={stroke} />
      </g>
    );
  };

  if (data.length < 2) {
    return <div style={{ height, display: 'flex', alignItems: 'center', opacity: 0.6 }}>No trend data</div>;
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 14, bottom: 6, left: 14 }}>
          <defs>
            <linearGradient id="trendFillUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="trendFillDown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>

            {/* glow filter */}
            <filter id="glowUp" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.086  0 0 0 0 0.639  0 0 0 0 0.29  0 0 0 0.55 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="glowDown" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.863  0 0 0 0 0.149  0 0 0 0 0.149  0 0 0 0.55 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid strokeOpacity={0.12} vertical={false} />

          <XAxis dataKey="i" hide />
          <YAxis domain={domain} hide />

          <Tooltip
            isAnimationActive={false}
            cursor={{ strokeOpacity: 0.18, strokeWidth: 1 }}
            formatter={tooltipFormatter}
            labelFormatter={labelFormatter}
            contentStyle={{
              borderRadius: 12,
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.10)',
              padding: '10px 12px',
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={3.2}
            fill={`url(#${fillId})`}
            dot={lastDot}
            activeDot={{ r: 5 }}
            style={{ filter: `url(#${glowId})` }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoldTrendSparkline;
