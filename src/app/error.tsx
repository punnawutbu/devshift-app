'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">😵 มีบางอย่างผิดพลาด</h1>
      <p className="mb-2 text-lg">ขออภัย ดูเหมือนว่าเกิดข้อผิดพลาดขึ้น:</p>
      <pre className="bg-gray-200 dark:bg-gray-800 p-4 rounded max-w-xl text-sm overflow-auto">
        {error.message}
      </pre>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
      >
        🔄 ลองอีกครั้ง
      </button>
    </div>
  );
}
