"use client";

import { useState, useEffect } from 'react';
import { Container, Col, Row, Card, CardBody, CardTitle, Button } from 'reactstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import { NewsData } from '@/types/NewsData';

const NewsBoardPage = () => {
    const [newsList, setNewsList] = useState<NewsData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Mock news data from API
        setTimeout(() => {
            const mockNewsData: NewsData[] = [
                { id: "e7d6a226-4f9f-4d67-b9f0-219bf2d00665", title: "ฮาย อาภาพร – ธัช กิตติธัช สุดอึ้ง!!!  เพลงไทยร้องยากแต่ชาวต่างชาติร้องได้", content: "รายละเอียดข่าวที่ 1...", image_url: "/images/news/news1.jpg", created_at: "2024-09-01" },
                { id: "f8b0ac82-44d7-4f57-929c-94b9fa709b80", title: "ข่าวที่สอง", content: "รายละเอียดข่าวที่ 2...", image_url: "/images/news/news2.jpg", created_at: "2024-09-02" },
                // เพิ่มข้อมูลจำลองอื่นๆ...
            ];

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
            <Button color="secondary" className="mb-4" tag={Link} href="/newsboard/manage">จัดการข่าวสาร</Button> {/* <-- ปุ่มนี้เพื่อไปหน้า /newsboard/manage */}
            <Row>
                {newsList.map((news) => (
                    <Col sm="12" md="6" lg="3" key={news.id} className="mb-4">
                        <Card>
                            <img src={news.image_url} alt={news.title} className="card-img-top" style={{ height: '150px', objectFit: 'cover' }} />
                            <CardBody>
                                <CardTitle>
                                    <Link href={`/newsboard/${news.id}`}>
                                        {news.title}
                                    </Link>
                                </CardTitle>
                                {/* ลบปุ่มเพิ่ม ลบ และแก้ไขในหน้านี้ */}
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NewsBoardPage;
