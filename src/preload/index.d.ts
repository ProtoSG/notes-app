import { ElectronAPI } from '@electron-toolkit/preload'
import { CreateNote, CreateNoteDB, DeleteNote, GetNotes, ReadNote, SaveNote, WriteNote } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      createNote: CreateNote
      deleteNote: DeleteNote
      saveNote: SaveNote
      createNoteDB: CreateNoteDB
    }
  }
}
