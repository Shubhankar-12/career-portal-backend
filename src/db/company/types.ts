import { Document } from "mongoose";

export interface ICompany {
  name: string;
  slug: string;
  user_id: string;
  website: string;
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
    type: string;
    title?: string;
    content?: string;
    image_url?: string;
    order?: number;
  }>;
  published: "DRAFT" | "PUBLISHED";
  created_at: Date;
  updated_at: Date;
}

export interface ICompanyDocument extends ICompany, Document {}
