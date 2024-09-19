"use client"; // เพิ่มเพื่อระบุว่าเป็น Client Component

import { ReactNode, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function ClientLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // โหลด Bootstrap JS ในฝั่ง client
    typeof document !== 'undefined' ? require('bootstrap/dist/js/bootstrap') : null;
  }, []);

  return (
    <>
      <Navbar /> {/* เพิ่ม Navbar ที่นี่ */}
      <main className="flex-grow-1">{children}</main>
      <Footer /> {/* เพิ่ม Footer ที่นี่ */}
    </>
  );
}
