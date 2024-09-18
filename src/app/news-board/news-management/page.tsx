"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const ManageNewsPage = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Prepare the form data for submission
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        // Perform API call to save the news content
        try {
            const response = await fetch("/api/news", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("เพิ่มข่าวสำเร็จ");
                router.push("/news-board");
            } else {
                alert("เกิดข้อผิดพลาดในการเพิ่มข่าว");
            }
        } catch (error) {
            console.error("Error uploading news:", error);
            alert("ไม่สามารถบันทึกข่าวได้");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <Container className="my-5">
            <h2>เพิ่มคอนเทนต์ข่าวใหม่</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="title">หัวข้อข่าว</Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="content">เนื้อหาข่าว</Label>
                    <Input
                        type="textarea"
                        name="content"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="image">อัปโหลดรูปภาพข่าว</Label>
                    <Input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </FormGroup>
                <Button type="submit" color="primary" disabled={loading}>
                    {loading ? "กำลังบันทึก..." : "เพิ่มข่าว"}
                </Button>
            </Form>
        </Container>
    );
};

export default ManageNewsPage;
