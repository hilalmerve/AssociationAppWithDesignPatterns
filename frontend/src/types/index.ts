
export interface Event {
  id: number;
  title: string;
  description: string;
  validUntil: string; // "YYYY-MM-DD"
}

export interface News extends Event {
  newsLink?: string;
}

export interface Announcement extends Event {
  imagePath?: string;
}

export type NewsForm = Omit<News, "id">;
export type AnnouncementForm = Omit<Announcement, "id">;