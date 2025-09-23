import type { StrapiImage, Category, Tag } from '../lib/strapi';

export interface Event {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  start_date: string;
  end_date: string;
  location?: string;
  featured_image?: StrapiImage;
  hero_image?: StrapiImage;
  registration_url?: string;
  featured: boolean;
  categories?: Category[];
  tags?: Tag[];
  meta_title?: string;
  meta_description?: string;
  social_share?: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface EventsResponse {
  data: Event[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface EventResponse {
  data: Event;
}

export interface EventFilters {
  page?: number;
  pageSize?: number;
  featured?: boolean;
  category?: string;
  tag?: string;
  search?: string;
  start_date_after?: string;
  start_date_before?: string;
}