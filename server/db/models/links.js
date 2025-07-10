import { model, Schema } from 'mongoose';

const linkSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['teachers', 'students', 'parents'],
    },
    grade: {
      type: String,
      default: '',
      trim: true,
    },
    author: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const linksCollection = model('links', linkSchema);
