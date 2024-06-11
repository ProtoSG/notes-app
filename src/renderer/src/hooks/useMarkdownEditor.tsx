import { MDXEditorMethods } from "@mdxeditor/editor"
import { saveNoteAtom, selectedNoteAtom } from "@renderer/store"
import { NoteContent } from "@shared/models"
import { useAtomValue, useSetAtom } from "jotai"
import { useRef } from "react"
import { throttle } from "lodash"
import { autoSaveInterval } from "../../../shared/constants"

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSave = throttle(async (content: NoteContent) => {
    if (!selectedNote) return

    console.info("Guardando Automaticamente", selectedNote.title)

    await saveNote(content)
  }, autoSaveInterval, {
    leading: false,
    trailing: true
  })

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSave.cancel()

    const content = editorRef.current?.getMarkdown()

    if (content != null) {
      await saveNote(content)
    }

  }

  return {
    selectedNote,
    editorRef,
    handleAutoSave,
    handleBlur
  }
}
