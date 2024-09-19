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
                {
                    id: "b3d1f7e8-7e5b-44f3-a0e4-3e6a3f7c19a4",
                    title: "นักวิทยาศาสตร์ค้นพบดาวเคราะห์ใหม่ที่อาจมีสิ่งมีชีวิต",
                    content: "ทีมนักดาราศาสตร์จากมหาวิทยาลัยชื่อดังได้ประกาศการค้นพบดาวเคราะห์ใหม่ที่มีลักษณะคล้ายโลกและอยู่ในระยะห่างจากดาวฤกษ์ที่เหมาะสมสำหรับการเกิดสิ่งมีชีวิต การค้นพบนี้อาจเปลี่ยนแปลงแนวทางการศึกษาด้านดาราศาสตร์ในอนาคต",
                    image_url: "/images/news/news6.jpg",
                    created_at: "2024-09-06"
                },
                {
                    id: "4f7d0c8b-9c25-4b1f-9f9b-0873f3b9a7a3",
                    title: "กีฬาโอลิมปิกครั้งถัดไปเตรียมพร้อมจัดในเมืองที่หนาวที่สุด",
                    content: "คณะกรรมการโอลิมปิกได้เลือกเมืองเจ้าภาพครั้งถัดไป ซึ่งเป็นเมืองที่ขึ้นชื่อว่าเป็นหนึ่งในเมืองที่หนาวที่สุดในโลก การเตรียมการครั้งนี้ได้มุ่งเน้นไปที่การจัดเตรียมสนามกีฬาและที่พักที่เหมาะสมกับสภาพอากาศหนาวเย็น",
                    image_url: "/images/news/news7.jpg",
                    created_at: "2024-09-07"
                },
                {
                    id: "f8b0ac82-44d7-4f57-929c-94b9fa709b80",
                    title: "เปิดตัวรถยนต์ไฟฟ้ารุ่นใหม่แห่งปี 2024",
                    content: "บริษัทผู้ผลิตรถยนต์ชั้นนำได้เปิดตัวรถยนต์ไฟฟ้ารุ่นใหม่ล่าสุดที่มาพร้อมกับเทคโนโลยีสุดล้ำ ระบบการขับขี่อัตโนมัติ และระยะการขับขี่ที่ยาวนานขึ้นกว่าเดิม ทำให้รถยนต์รุ่นนี้เป็นที่จับตามองของผู้คนทั่วโลก",
                    image_url: "/images/news/news2.jpg",
                    created_at: "2024-09-02"
                },
                {
                    id: "a15e2c59-3f3a-4719-9c36-21bfa3d8b3b5",
                    title: "งานเทศกาลดนตรีครั้งใหญ่เตรียมจัดขึ้นในกรุงเทพฯ",
                    content: "งานเทศกาลดนตรีระดับนานาชาติจะถูกจัดขึ้นในกรุงเทพฯ ในเดือนตุลาคมที่จะถึงนี้ ซึ่งมีศิลปินชื่อดังจากทั่วโลกมาร่วมแสดง พร้อมกับเวทีที่ออกแบบอย่างยิ่งใหญ่เพื่อสร้างประสบการณ์ดนตรีที่ไม่เหมือนใครให้กับผู้เข้าร่วม",
                    image_url: "/images/news/news3.jpg",
                    created_at: "2024-09-03"
                },
                {
                    id: "d18eab72-9b18-4fb5-a469-82e1f4bdb27a",
                    title: "เทคโนโลยี AI ก้าวล้ำ! ช่วยวิเคราะห์โรคได้รวดเร็วแม่นยำ",
                    content: "การพัฒนาเทคโนโลยี AI ในด้านการแพทย์มีความก้าวหน้าอย่างมาก โดยเฉพาะการวิเคราะห์โรคที่สามารถให้ผลลัพธ์ได้อย่างรวดเร็วและมีความแม่นยำมากขึ้น ช่วยให้แพทย์สามารถวินิจฉัยโรคและรักษาผู้ป่วยได้ดีขึ้น",
                    image_url: "/images/news/news4.jpg",
                    created_at: "2024-09-04"
                },
                {
                    id: "c582a92d-f9e8-4d1b-89c5-6dfd8b50ad87",
                    title: "สถานการณ์อากาศที่ร้อนจัดส่งผลกระทบต่อการเกษตร",
                    content: "สภาพอากาศที่ร้อนจัดในหลายพื้นที่ทั่วโลกทำให้เกิดความเสียหายต่อผลผลิตทางการเกษตรอย่างมาก ส่งผลให้ราคาสินค้าเกษตรหลายประเภทปรับตัวสูงขึ้น นักวิจัยเตือนถึงผลกระทบระยะยาวต่อภาคการเกษตรถ้าไม่มีการปรับตัว",
                    image_url: "/images/news/news5.jpg",
                    created_at: "2024-09-05"
                }
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
