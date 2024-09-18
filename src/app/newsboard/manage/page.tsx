"use client";

import { useState, useEffect } from 'react';
import { Container, Col, Row, Card, CardBody, CardTitle, Button } from 'reactstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';
import NewsModal from '@/components/NewsModal';
import { NewsData } from '@/types/NewsData';

const ManageNewsPage = () => {
    const [newsList, setNewsList] = useState<NewsData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newNews, setNewNews] = useState<Partial<NewsData>>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State สำหรับไฟล์ที่เลือก

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

    const handleModalToggle = () => setModalOpen(!modalOpen);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewNews((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file); // เก็บไฟล์ที่เลือกใน state
    };

    const handleSubmit = () => {
        // Here, you would send newNews and selectedFile to the API
        console.log("Adding news:", newNews, selectedFile);
        handleModalToggle(); // Close the modal
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <Container>
            <h2>จัดการข่าวสาร</h2>
            <Button color="primary" onClick={handleModalToggle} className="mb-4">เพิ่มข่าว</Button> {/* <-- ปุ่มเพิ่มข่าว */}
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
                                <Button color="danger" onClick={() => console.log(`Delete news ${news.id}`)}>ลบ</Button> {/* ปุ่มลบ */}
                                <Button color="warning" onClick={() => console.log(`Edit news ${news.id}`)}>แก้ไข</Button> {/* ปุ่มแก้ไข */}
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
            
            <NewsModal 
                isOpen={modalOpen} 
                toggle={handleModalToggle} 
                onSubmit={handleSubmit} 
                onChange={handleInputChange} 
                newNews={newNews} 
                onFileChange={handleFileChange}  // ส่ง handleFileChange เป็น onFileChange
            />
        </Container>
    );
};

export default ManageNewsPage;
