/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UpdateCompanyRequest {
  company_id: string;
  name?: string;
  description?: string;
  logo_url?: string;
  banner_url?: string;
  culture_video_url?: string;
  theme?: {
    primary_color?: string;
    secondary_color?: string;
    text_color?: string;
    background_color?: string;
  };
  sections?: Array<{
    _id: string;
    type: string;
    title?: string;
    content?: string;
    image_url?: string;
    order?: number;
  }>;
  published?: string;
}
