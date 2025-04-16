import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';
import { Providers } from './Providers';

export const metadata = {
  title: 'DevShift App',
  description: 'A description for the app.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100 bg-body">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}