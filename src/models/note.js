import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      required: false,
      enum: Object.values(TAGS),
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

notesSchema.index(
  { title: 'text', content: 'text' },
  {
    name: 'NoteTextIndex',
    weights: { title: 5, content: 1 },
    default_language: 'english',
  },
);

export const Note = model('Note', notesSchema);
