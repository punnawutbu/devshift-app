// src/components/LoadingSpinner.tsx
import React from 'react';
import '../styles/LoadingSpinner.css'; // คุณอาจจะต้องสร้างไฟล์ CSS นี้ด้วย

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner"></div>
            <p>กำลังโหลดข้อมูล...</p>
        </div>
    );
};

export default LoadingSpinner;
