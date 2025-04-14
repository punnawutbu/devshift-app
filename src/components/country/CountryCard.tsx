'use client';

import React from 'react';
import { Card } from 'antd';

interface Currency {
  name: string;
  symbol: string;
}

interface Country {
  flags?: { png: string; alt?: string };
  name?: { official: string; common: string };
  capital?: string[];
  region?: string;
  continents?: string[];
  timezones?: string[];
  currencies?: { [key: string]: Currency };
  population?: number;
  area?: number;
  maps?: { googleMaps: string; openStreetMaps: string };
  gini?: { [key: string]: number };
  latlng?: [number, number];
}

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const {
    flags,
    name,
    capital,
    region,
    continents,
    timezones,
    currencies,
    population,
    area,
    maps,
    gini,
    latlng,
  } = country;

  const currencyList = Object.values(currencies || {})
    .map((c: Currency) => `${c.name} (${c.symbol})`)
    .join(', ');

  const embedUrl = latlng
    ? `https://maps.google.com/maps?q=${latlng[0]},${latlng[1]}&z=6&output=embed`
    : null;

  return (
    <Card
  title={name?.official}
  className="mb-6 shadow-md rounded-xl dark:bg-gray-800 dark:text-white"
  cover={
    <div className="flex justify-center items-center py-4">
      <img
        alt={`Flag of ${name?.official}`}
        src={flags?.png}
        className="h-24 w-auto object-contain"
      />
    </div>
  }
>
      <div className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div><strong>เมืองหลวง:</strong> {capital?.[0] || '-'}</div>
        <div><strong>ภูมิภาค:</strong> {region || '-'}</div>
        <div><strong>ทวีป:</strong> {continents?.join(', ') || '-'}</div>
        <div><strong>โซนเวลา:</strong> {timezones?.join(', ') || '-'}</div>
        <div><strong>สกุลเงิน:</strong> {currencyList || '-'}</div>
        <div><strong>ประชากร:</strong> {population?.toLocaleString() || '-'}</div>
        <div><strong>พื้นที่:</strong> {area ? `${area.toLocaleString()} km²` : '-'}</div>
        <div><strong>Gini (2019):</strong> {gini?.['2019'] || '-'}</div>
      </div>

      {embedUrl && (
        <iframe
          src={embedUrl}
          className="mt-4 w-full h-48 rounded border"
          loading="lazy"
        ></iframe>
      )}
    </Card>
  );
}
