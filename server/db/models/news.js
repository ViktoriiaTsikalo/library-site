import { model, Schema } from 'mongoose';

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrls: {
      type: [String], 
      default: []
    },
    videoUrl: {
      type: String,
    },
    videoThumbnailUrl:{
         type: String,        
    },
    eventDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const newsCollection = model('news', newsSchema);