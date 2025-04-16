'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const { Header } = Layout;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('th');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.language) {
      setCurrentLang(i18n.language);
      setIsReady(true);
    }
  }, [i18n.language]);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      setCurrentLang(lang);
      router.refresh();
    });
  };

  const languageMenu = (
    <Menu
      onClick={({ key }) => handleLanguageChange(key)}
      items={[
        { key: 'th', label: 'TH' },
        { key: 'en', label: 'EN' },
      ]}
    />
  );

  const menuItems = [
    {
      key: '/',
      label: (
        <Link href="/" style={{ textDecoration: 'none' }}>
          {t('home')}
        </Link>
      ),
    },
    {
      key: '/gold-price',
      label: (
        <Link href="/gold-price" style={{ textDecoration: 'none' }}>
          {t('goldPrice')}
        </Link>
      ),
    },
    {
      key: '/countries-info',
      label: (
        <Link href="/countries-info" style={{ textDecoration: 'none' }}>
          {t('countries')}
        </Link>
      ),
    },
  ];

  if (!isReady) return null;

  return (
    <Header
      className="px-4"
      style={{
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div className="logo">
        <Link
          href="/"
          style={{
            color: '#F5994B',
            fontWeight: 'bold',
            fontSize: '20px',
            textDecoration: 'none',
          }}
        >
          DevShift.Dev
        </Link>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={[]}
        items={menuItems}
        style={{ borderBottom: 'none' }}
      />

      <Dropdown overlay={languageMenu} placement="bottomRight">
        <Button icon={<GlobalOutlined />} type="text">
          {currentLang.toUpperCase()}
        </Button>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
