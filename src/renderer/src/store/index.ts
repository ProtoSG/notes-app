import { NoteContent, NoteInfo } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

const loadNotes = async () => {
  const notes = await window.context.getNotes()

  // ordenar por el campo updated_at

  return notes.sort((a, b) => b.updated_at - a.updated_at)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIdAtom = atom<number | null>(null)

export const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  console.log("selectedNoteAtom notes", notes)
  const selectedNoteId = get(selectedNoteIdAtom)

  if (selectedNoteId == null || !notes) return null

  const selectedNote = notes.find(note => note.id === selectedNoteId)

  if (!selectedNote) return null

  const noteContent = await window.context.readNote(selectedNote.title)

  selectedNote.content = noteContent
  console.log("selectedNoteAtom selectedNote", selectedNote)
  console.log("selectedNoteAtom noteContent", noteContent)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? {
  id: 0,
  title: "",
  content: "",
  categories: [],
  shared_with: [],
  created_at: Date.now(),
  updated_at: Date.now(),
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return

  const title = await window.context.createNote()

  if (!title) return

  const newNote: NoteInfo = {
    id: notes.length + 1,
    title,
    content: "Hello from Notes",
    categories: [],
    shared_with: [],
    created_at: Date.now(),
    updated_at: Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter(note => note.id !== newNote.id)])
  set(selectedNoteIdAtom, newNote.id)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  const isDeleted = await window.context.deleteNote(selectedNote.title)

  if (!isDeleted) return

  set(notesAtom, notes.filter(note => note.id !== selectedNote.id))

  set(selectedNoteIdAtom, null)
})

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  //Guardar en disco

  await window.context.writeNote(selectedNote.title, newContent)

  // Actualizar el estado
  set(
    notesAtom,
    notes.map(note => note.id === selectedNote.id ? { ...note, updated_at: Date.now() } : note)
  )
})
