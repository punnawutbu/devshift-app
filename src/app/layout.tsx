import { ReactNode } from 'react';
import ClientLayout from './ClientLayout';
import { Providers } from './Providers';

export const metadata = {
  title: 'DevShift App',
  description: 'A description for the app.',
};

// layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="min-h-screen bg-body overflow-x-hidden">
        <Providers>
          <ClientLayout>
            <div className="max-w-screen-xl mx-auto px-4">{children}</div>
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
