import { GetServerSideProps } from 'next';

interface NewsDetailProps {
    news: {
        id: number;
        title: string;
        content: string;
        image_url: string;
        created_at: string;
    };
}

const NewsDetailPage = ({ news }: NewsDetailProps) => {
    return (
        <div>
            <h1>{news.title}</h1>
            <img src={news.image_url} alt={news.title} />
            <p>{news.content}</p>
            <p>Published on: {news.created_at}</p>
        </div>
    );
};

// ใช้ getServerSideProps เพื่อดึงข้อมูลข่าว
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const mockNewsData = {
        id: 1,
        title: "ข่าวตัวอย่าง",
        content: "เนื้อหาของข่าว...",
        image_url: "/images/news/sample.jpg",
        created_at: "2024-09-01",
    };

    return {
        props: {
            news: mockNewsData // ส่งข้อมูลข่าวไปยัง props
        }
    };
};

export default NewsDetailPage;
