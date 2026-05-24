import axios from "axios";
import type { News, Announcement, NewsForm } from "../types";

const API = axios.create({
  baseURL: "/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {

    const status = error.response?.status;

    // ❌ TOKEN EXPIRE / INVALID
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // ❌ NO PERMISSION (ADMIN DEĞİL)
    if (status === 403) {
      alert("You do not have permission to access this resource.");
    }

    return Promise.reject(error);
  }
);

export const newsApi = {

  getAll: () =>
    API.get<News[]>("/user/news").then(r => r.data),

  getById: (id: number) =>
    API.get<News>(`/user/news/${id}`).then(r => r.data),

  create: (data: NewsForm) =>
    API.post<News>("/admin/news/add", data).then(r => r.data),

  update: (id: number, data: NewsForm) =>
    API.put<News>(`/admin/news/${id}`, data).then(r => r.data),

  remove: (id: number) =>
    API.delete(`/admin/news/${id}`).then(r => r.data),
};

export const announcementApi = {

  getAll: () =>
    API.get<Announcement[]>("/user/announcements").then(r => r.data),

  getById: (id: number) =>
    API.get<Announcement>(`/user/announcements/${id}`).then(r => r.data),

  create: (title: string, description: string, validUntil: string, image?: File) => {

    const fd = new FormData();

    fd.append("title", title);
    fd.append("description", description);
    fd.append("validUntil", validUntil);

    if (image) fd.append("image", image);

    return API.post("/admin/announcements/add", fd)
      .then(r => r.data);
  },

  update: (id: number, title: string, description: string, validUntil: string, image?: File) => {

    const fd = new FormData();

    fd.append("title", title);
    fd.append("description", description);
    fd.append("validUntil", validUntil);

    if (image) fd.append("image", image);

    return API.put(`/admin/announcements/${id}`, fd)
      .then(r => r.data);
  },

  remove: (id: number) =>
    API.delete(`/admin/announcements/${id}`).then(r => r.data),
};

export const IMAGE_BASE = "http://localhost:8080";