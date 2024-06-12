import { CreateNote, CreateNoteDB, DeleteNote, GetNotes, ReadNote, SaveNote, WriteNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
    saveNote: (...args: Parameters<SaveNote>) => ipcRenderer.invoke('saveNote', ...args),
    createNoteDB: (...args: Parameters<CreateNoteDB>) => ipcRenderer.invoke('createNoteDB', ...args),
  })
} catch (error) {
  console.error(error)
}
