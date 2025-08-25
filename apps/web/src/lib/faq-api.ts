const API_URL = process.env.NEXT_PUBLIC_ADMIN_APP_API_URL

// FAQ Types
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export interface FAQSectionData {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
  items: FAQItem[];
}

export interface FAQCollection {
  id: number;
  name: string;
  slug: string;
  description?: string;
  sections: FAQSectionData[];
}

export interface FAQResponse {
  data: FAQCollection;
}

// Fetch FAQs by slug from the admin API
export async function getFAQCollection(slug: string): Promise<FAQResponse | null> {
  try {
    const url = `${API_URL}/v1/faqs/pages/slug/${slug}/complete`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      console.error(`FAQ API error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching FAQ collection:', error);
    return null;
  }
}

// Helper function to transform API response to a more usable format
export interface TransformedFAQData {
  title: string;
  description?: string;
  sections: {
    name: string;
    items: {
      question: string;
      answer: string;
    }[];
  }[];
}

export function transformFAQData(faqResponse: FAQResponse | null): TransformedFAQData | null {
  if (!faqResponse?.data) {
    return null;
  }

  const { name, description, sections } = faqResponse.data;
  
  return {
    title: name || 'FAQs',
    description,
    sections: (sections || []).map(section => ({
      name: section.name,
      items: (section.items || []).map(item => ({
        question: item.question,
        answer: item.answer
      }))
    }))
  };
}