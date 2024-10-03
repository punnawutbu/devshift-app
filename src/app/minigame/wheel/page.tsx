"use client";

import React, { useState } from 'react';
import styles from '../../../styles/wheel.module.css';

const WheelGame: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const prizes = ['รางวัลที่ 1', 'รางวัลที่ 2', 'รางวัลที่ 3', 'รางวัลที่ 4', 'รางวัลที่ 5', 'รางวัลที่ 6'];
  
  const handleSpinClick = () => {
    if (isSpinning) return; // ป้องกันการหมุนซ้ำในขณะที่กำลังหมุน
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const duration = 3000; // ระยะเวลาการหมุน 3 วินาที
    const wheel = document.getElementById('wheel');
    
    // คำนวณการหมุนของวงล้อ
    const degrees = randomIndex * (360 / prizes.length) + 360 * 5; // หมุนวงล้อ 5 รอบเต็มและหยุดที่รางวัล
    
    if (wheel) {
      wheel.style.transition = `transform ${duration}ms ease-out`;
      wheel.style.transform = `rotate(${degrees}deg)`;
    }
    
    setTimeout(() => {
      setIsSpinning(false);
      setResult(prizes[randomIndex]); // แสดงผลลัพธ์หลังหมุนเสร็จ
    }, duration);
  };

  return (
    <div className={styles.wheelContainer}>
      <h1 className={styles.title}>เกมส์วงล้อสุ่ม</h1>
      <div className={styles.wheel} id="wheel">
        {prizes.map((prize, index) => (
          <div
            key={index}
            className={styles.segment}
            style={{ transform: `rotate(${index * (360 / prizes.length)}deg)` }}
          >
            <span>{prize}</span>
          </div>
        ))}
      </div>
      <button className={styles.spinButton} onClick={handleSpinClick} disabled={isSpinning}>
        หมุนวงล้อ
      </button>
      {result && <p className={styles.result}>คุณได้รับ: {result}</p>}
    </div>
  );
};

export default WheelGame;
