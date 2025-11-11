import { UpdateCompanyRequest } from "./request";
export interface UpdateCompanyDto {
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
  published: string;
}

export class UpdateCompanyDtoConverter {
  private output_object: UpdateCompanyDto;

  constructor(data: UpdateCompanyRequest) {
    this.output_object = {
      company_id: data.company_id,
      name: data.name,
      description: data.description,
      logo_url: data.logo_url,
      banner_url: data.banner_url,
      culture_video_url: data.culture_video_url,
      theme: data.theme,
      sections: data.sections,
      published: data.published
        ? new Date(data.published).toISOString()
        : new Date().toISOString(),
    };
  }

  public getDtoObject(): UpdateCompanyDto {
    return this.output_object;
  }
}
