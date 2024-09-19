
import { ReactNode } from 'react';
import ClientLayout from './ClientLayout'; // Import Client Layout

export const metadata = {
  title: 'DevShift App',
  description: 'A description for the app.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100 bg-body">
        <ClientLayout> {/* นำ ClientLayout มาห่อ children */}
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
