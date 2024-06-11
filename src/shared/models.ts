export type NoteInfo = {
  id: number
  title: string
  content: string
  categories: string[]
  shared_with: string[]
  created_at: number
  updated_at: number
}

export type NoteFileInfo = {
  title: string
  created_at: number
  updated_at: number
}

export type NoteContent = string
