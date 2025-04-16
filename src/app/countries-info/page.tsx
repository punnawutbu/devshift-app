'use client';

import { useEffect, useState } from 'react';
import CountryCard from '@/components/country/CountryCard';
import { Typography, Spin, Pagination } from 'antd';
import SearchForm, { Option } from '@/components/SearchForm';
import { useTranslation } from 'react-i18next';

type CountryKey = 'name' | 'capital' | 'currency';
const { Text } = Typography;

export default function Home() {
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const [searchKey, setSearchKey] = useState<CountryKey>('name');
  const [searchText, setSearchText] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCountries = filteredCountries.slice(startIndex, endIndex);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const countryOptions: Option<CountryKey>[] = [
    { label: t('countryName'), value: 'name' },
    { label: t('countryCapital'), value: 'capital' },
    { label: t('countryCurrency'), value: 'currency' },
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const lower = searchText.toLowerCase();
    const result = countries.filter((country) => {
      if (searchKey === 'name') {
        return country.name?.common?.toLowerCase().includes(lower);
      }
      if (searchKey === 'capital') {
        return country.capital?.[0]?.toLowerCase().includes(lower);
      }
      if (searchKey === 'currency') {
        const keys = Object.keys(country.currencies || {});
        return keys.some((code) =>
          code.toLowerCase().includes(lower) ||
          country.currencies?.[code]?.name?.toLowerCase().includes(lower)
        );
      }
      return false;
    });
    setFilteredCountries(result);
    setCurrentPage(1);
  }, [searchKey, searchText, countries]);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <Text className="loading-text">{t('loading')}</Text>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {hasMounted ? t('countryInfoHeader') : ''}
        </h1>

        <SearchForm<CountryKey>
          options={countryOptions}
          selectValue={searchKey}
          onSelectChange={setSearchKey}
          inputValue={searchText}
          onInputChange={setSearchText}
          placeholder={t('setSearchText')}
          selectWidth={180}
        />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedCountries.length > 0 ? (
            paginatedCountries.map((country) => (
              <CountryCard key={country.name.common} country={country} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              {t('countryMessage')}
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <Pagination
              current={currentPage}
              total={filteredCountries.length}
              pageSize={itemsPerPage}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger
              pageSizeOptions={[9, 18, 27]}
              onShowSizeChange={(_, size) => setItemsPerPage(size)}
              showQuickJumper
            />
          </div>
        )}
      </div>
    </main>
  );
}
