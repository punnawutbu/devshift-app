'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, Dropdown, Button, Drawer, Grid } from 'antd';
import { GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState('th');
  const [isReady, setIsReady] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

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

  const isMobile = !screens.md;

  return (
    <>
      <Header
        className="px-4"
        style={{
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
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

        {/* Desktop Menu */}
        {!isMobile && (
          <Menu
            mode="horizontal"
            selectedKeys={[]}
            items={menuItems}
            style={{ borderBottom: 'none', flexGrow: 1, justifyContent: 'center' }}
          />
        )}

        <div>
          <Dropdown overlay={languageMenu} placement="bottomRight">
            <Button icon={<GlobalOutlined />} type="text">
              {currentLang.toUpperCase()}
            </Button>
          </Dropdown>

          {/* Hamburger Icon for Mobile */}
          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              type="text"
              onClick={() => setDrawerVisible(true)}
              style={{ marginLeft: 8 }}
            />
          )}
        </div>
      </Header>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[]}
          items={menuItems}
          onClick={() => setDrawerVisible(false)}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
