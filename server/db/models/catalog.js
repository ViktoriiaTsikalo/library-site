import { model, Schema } from 'mongoose';

const catalogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
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

export const catalogCollection = model('catalog', catalogSchema);
