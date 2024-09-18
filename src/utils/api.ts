// src/utils/api.ts

const API_BASE_URL = 'https://api.yourdomain.com'; // เปลี่ยนให้ตรงกับ URL ของ API
import { NewsData } from '../types/NewsData';

export async function fetchNewsList(): Promise<NewsData[]> {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) {
        throw new Error('Failed to fetch news');
    }
    return response.json();
}

export async function fetchNewsById(id: string): Promise<NewsData> {
    const response = await fetch(`${API_BASE_URL}/news/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch news');
    }
    return response.json();
}

export async function createNews(news: Partial<NewsData>): Promise<NewsData> {
    const response = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(news),
    });

    if (!response.ok) {
        throw new Error('Failed to create news');
    }

    return response.json();
}

export async function updateNews(id: string, news: Partial<NewsData>): Promise<NewsData> {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(news),
    });

    if (!response.ok) {
        throw new Error('Failed to update news');
    }

    return response.json();
}

export async function deleteNews(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete news');
    }
}
