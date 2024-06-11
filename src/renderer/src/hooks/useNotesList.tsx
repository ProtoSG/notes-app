import { notesAtom, selectedNoteIdAtom } from "@renderer/store"
import { useAtom } from "jotai"

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const [notes] = useAtom(notesAtom)
  const [selectedNoteId, setSelectedNoteId] = useAtom(selectedNoteIdAtom)
  console.log('notes', notes)
  const handleNoteSelect = (index: number) => async () => {
    setSelectedNoteId(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    notes,
    selectedNoteId,
    handleNoteSelect
  }
}
