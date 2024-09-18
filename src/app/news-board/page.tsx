"use client";

import { useState, useEffect } from 'react';
import { Container, Col, Row, Card, CardBody, CardTitle } from 'reactstrap';
import Link from 'next/link'; // Import Link for Next.js navigation
import 'bootstrap/dist/css/bootstrap.css'; // Import Bootstrap CSS

interface NewsData {
    id: number;
    title: string;
    content: string;
    image_url: string;
    created_at: string;
}

const NewsBoardPage = () => {
    const [newsList, setNewsList] = useState<NewsData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Mock news data from API
        setTimeout(() => {
            const mockNewsData: NewsData[] = [
                { id: 1, title: "ฮาย อาภาพร – ธัช กิตติธัช สุดอึ้ง!!!  เพลงไทยร้องยากแต่ชาวต่างชาติร้องได้", content: "รายละเอียดข่าวที่ 1...", image_url: "/images/news/news1.jpg", created_at: "2024-09-01" },
                { id: 2, title: "ข่าวที่สอง", content: "รายละเอียดข่าวที่ 2...", image_url: "/images/news/news2.jpg", created_at: "2024-09-02" },
                { id: 3, title: "ข่าวที่สาม", content: "รายละเอียดข่าวที่ 3...", image_url: "/images/news/news3.jpg", created_at: "2024-09-03" },
                { id: 4, title: "ข่าวที่สี่", content: "รายละเอียดข่าวที่ 4...", image_url: "/images/news/news4.jpg", created_at: "2024-09-04" },
                { id: 5, title: "ข่าวที่ห้า", content: "รายละเอียดข่าวที่ 5...", image_url: "/images/news/news5.jpg", created_at: "2024-09-05" },
                { id: 6, title: "ข่าวที่หก", content: "รายละเอียดข่าวที่ 6...", image_url: "/images/news/news6.jpg", created_at: "2024-09-06" },
                { id: 7, title: "ข่าวที่เจ็ด", content: "รายละเอียดข่าวที่ 7...", image_url: "/images/news/news7.jpg", created_at: "2024-09-07" },
                { id: 8, title: "ข่าวที่แปด", content: "รายละเอียดข่าวที่ 8...", image_url: "/images/news/news8.jpg", created_at: "2024-09-08" },
                { id: 9, title: "ข่าวที่เก้า", content: "รายละเอียดข่าวที่ 9...", image_url: "/images/news/news9.jpg", created_at: "2024-09-09" },
                { id: 10, title: "ข่าวที่สิบ", content: "รายละเอียดข่าวที่ 10...", image_url: "/images/news/news10.jpg", created_at: "2024-09-10" },
                { id: 11, title: "ข่าวที่สิบเอ็ด", content: "รายละเอียดข่าวที่ 11...", image_url: "/images/news/news11.jpg", created_at: "2024-09-11" },
                { id: 12, title: "ข่าวที่สิบสอง", content: "รายละเอียดข่าวที่ 12...", image_url: "/images/news/news12.jpg", created_at: "2024-09-12" }
            ];

            // Limit news to the first 12 items
            setNewsList(mockNewsData.slice(0, 12));
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <Container>
            <h2>ข้อมูลข่าวสาร ทั้งหมด</h2>
            <Row>
                {newsList.map((news) => (
                    <Col sm="12" md="6" lg="3" key={news.id} className="mb-4">
                        <Card>
                            <img src={news.image_url} alt={news.title} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                            <CardBody>
                                <CardTitle>
                                    <Link href={`/news/${news.id}`}>
                                        {news.title}
                                    </Link>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NewsBoardPage;
