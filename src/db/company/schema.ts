import { Schema, Types } from "mongoose";

const Media = new Schema({
  url: String,
  name: String,
  mime_type: String,
});

export const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    user_id: { type: Types.ObjectId, required: true },
    website: { type: String, required: true },
    description: { type: String },
    logo_url: { type: Media },
    banner_url: { type: Media },
    culture_video_url: { type: Media },

    theme: {
      primary_color: String,
      secondary_color: String,
      text_color: String,
      background_color: String,
    },

    sections: [
      {
        type: { type: String, required: true },
        title: String,
        content: String,
        image_url: Media,
        order: Number,
      },
    ],

    published: { type: String, default: "DRAFT", enum: ["DRAFT", "PUBLISHED"] },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
