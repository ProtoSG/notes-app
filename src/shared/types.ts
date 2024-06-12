import { NoteContent, NoteInfo } from "./models";

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = () => Promise<[NoteInfo['title'], NoteInfo['id']] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>
export type SaveNote = (note: NoteInfo) => Promise<boolean>
export type CreateNoteDB = (note: NoteInfo) => Promise<boolean>
