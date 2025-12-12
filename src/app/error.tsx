'use client';

import { useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6">
      <div className="flex flex-col items-center max-w-xl w-full text-center space-y-6">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />

        <h1 className="text-3xl sm:text-4xl font-bold">😵 มีบางอย่างผิดพลาด</h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          ขออภัย ดูเหมือนว่าเกิดข้อผิดพลาดขึ้น กรุณาลองใหม่อีกครั้ง
        </p>

        {/* <pre className="bg-gray-200 dark:bg-gray-800 text-red-600 dark:text-red-400 p-4 rounded-lg shadow-inner text-sm max-h-60 overflow-auto w-full text-left whitespace-pre-wrap">
          {error.message}
        </pre> */}

        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 rounded-lg transition duration-200"
        >
          🔄 ลองอีกครั้ง
        </button>
      </div>
    </div>
  );
}
