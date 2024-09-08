// src/app/layout.tsx
import '../styles/globals.css'; // นำเข้า global CSS
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'DevShift App',
  description: 'A description for the app.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar /> {/* เพิ่ม Navbar ที่นี่ */}
        <main className="flex-grow">{children}</main>
        <Footer /> {/* เพิ่ม Footer ที่นี่ */}
      </body>
    </html>
  );
}
