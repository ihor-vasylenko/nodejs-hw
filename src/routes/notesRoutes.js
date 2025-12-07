import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.get(
  '/notes',
  celebrate(getAllNotesSchema, { abortEarly: false }),
  getAllNotes,
);

router.get(
  '/notes/:noteId',
  celebrate(noteIdSchema, { abortEarly: false }),
  getNoteById,
);

router.post(
  '/notes',
  celebrate(createNoteSchema, { abortEarly: false }),
  createNote,
);

router.delete(
  '/notes/:noteId',
  celebrate(noteIdSchema, { abortEarly: false }),
  deleteNote,
);

router.patch(
  '/notes/:noteId',
  celebrate(updateNoteSchema, { abortEarly: false }),
  updateNote,
);

export default router;
