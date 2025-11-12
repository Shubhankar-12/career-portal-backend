/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CreateCompanyRequest {
  name: string;
  description?: string;
  website: string;
  logo_url?: {
    url: string;
    name: string;
    mime_type: string;
  };
  banner_url?: {
    url: string;
    name: string;
    mime_type: string;
  };
  culture_video_url?: {
    url: string;
    name: string;
    mime_type: string;
  };
  theme?: {
    primary_color?: string;
    secondary_color?: string;
    text_color?: string;
    background_color?: string;
  };
  sections?: Array<{
    type: string;
    title?: string;
    content?: string;
    image_url?: {
      url: string;
      name: string;
      mime_type: string;
    };
    order?: number;
  }>;
  published: string;
}
