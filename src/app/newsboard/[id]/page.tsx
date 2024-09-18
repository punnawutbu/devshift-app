// src/app/newsboard/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Container, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { useParams, useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.css';
import { NewsData } from '@/types/NewsData';

const NewsDetailPage = () => {
    const [news, setNews] = useState<NewsData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams(); // ใช้ useParams แทนการใช้ query
    const router = useRouter();

    useEffect(() => {
        // Mock news data from API
        setTimeout(() => {
            const mockNewsData: NewsData[] = [
                { id: "e7d6a226-4f9f-4d67-b9f0-219bf2d00665", title: "ฮาย อาภาพร – ธัช กิตติธัช สุดอึ้ง!!!  เพลงไทยร้องยากแต่ชาวต่างชาติร้องได้", content: "รายละเอียดข่าวที่ 1...", image_url: "/images/news/news1.jpg", created_at: "2024-09-01" },
                { id: "f8b0ac82-44d7-4f57-929c-94b9fa709b80", title: "ข่าวที่สอง", content: "รายละเอียดข่าวที่ 2...", image_url: "/images/news/news2.jpg", created_at: "2024-09-02" },
                // เพิ่มข้อมูลจำลองอื่นๆ...
            ];

            const newsItem = mockNewsData.find(news => news.id === id);
            setNews(newsItem || null);
            setLoading(false);
        }, 1000);
    }, [id]);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (!news) {
        return <div className="text-center py-8">News not found</div>;
    }

    return (
        <Container>
            <h2>{news.title}</h2>
            <img src={news.image_url} alt={news.title} className="img-fluid" style={{ maxHeight: '400px', objectFit: 'cover' }} />
            <CardBody>
                <CardTitle>{news.title}</CardTitle>
                <CardText>{news.content}</CardText>
                <Button color="secondary" onClick={() => router.push('/newsboard')}>Back to News Board</Button>
            </CardBody>
        </Container>
    );
};

export default NewsDetailPage;
