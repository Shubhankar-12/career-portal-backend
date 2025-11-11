import { CreateCompanyRequest } from "./request";
export interface CreateCompanyDto {
  name: string;
  description?: string;
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

export class CreateCompanyDtoConverter {
  private output_object: CreateCompanyDto;

  constructor(data: CreateCompanyRequest) {
    this.output_object = {
      name: data.name,
      description: data.description,
      logo_url: data.logo_url,
      banner_url: data.banner_url,
      culture_video_url: data.culture_video_url,
      theme: data.theme,
      sections: data.sections,
      published: data.published,
    };
  }

  public getDtoObject(): CreateCompanyDto {
    return this.output_object;
  }
}
