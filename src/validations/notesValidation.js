import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) =>
  isValidObjectId(value) ? value : helpers.message('noteId.invalid');

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().required().custom(objectIdValidator).messages({
      'noteId.invalid': 'this "{#value}" is not a valid mongo id.',
    }),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...Object.values(TAGS))
      .optional(),
  }),
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...Object.values(TAGS)),
  }).min(1),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...Object.values(TAGS)),
    search: Joi.string().trim().allow(''),
  }),
};
