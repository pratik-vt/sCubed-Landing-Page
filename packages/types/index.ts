// Shared types for Strapi CMS content
export interface BlogPost {
  id: string;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    publishedAt: string;
    author?: {
      data: {
        id: string;
        attributes: {
          name: string;
          email?: string;
          avatar?: string;
        };
      };
    };
    categories?: {
      data: Array<{
        id: string;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    featuredImage?: {
      data: {
        id: string;
        attributes: {
          url: string;
          alternativeText?: string;
          width: number;
          height: number;
        };
      };
    };
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string;
    };
  };
}

export interface Page {
  id: string;
  attributes: {
    title: string;
    slug: string;
    content: string;
    publishedAt: string;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string;
    };
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}