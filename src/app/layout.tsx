// src/app/layout.tsx
import '../styles/globals.css'; // Import global CSS
import '../styles/gold-price.css'; // Import CSS for the Gold Price page
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS
import { ReactNode } from 'react';

export const metadata = {
  title: 'DevShift App',
  description: 'A description for the app.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100 bg-body">
        <Navbar /> {/* Add Navbar here */}
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer /> {/* Add Footer here */}
      </body>
    </html>
  );
}
