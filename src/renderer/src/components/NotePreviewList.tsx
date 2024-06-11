import { ComponentProps } from 'react'
import { NotePreview } from '@/components'
import { twMerge } from 'tailwind-merge'
import { useNotesList } from '@/hooks/useNotesList'
import { isEmpty } from 'lodash'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {

  const { notes, selectedNoteId, handleNoteSelect } = useNotesList({ onSelect })

  if (!notes) return null

  if (isEmpty(notes)) {
    return <ul className={twMerge('text-center pt-4', className)} {...props} >No hay notas!</ul>
  }

  return (
    <ul className={className}{...props}>
      {notes.map((note) => (
        <NotePreview
          key={note.id}
          isActive={selectedNoteId === note.id}
          onClick={handleNoteSelect(note.id)}
          {...note}
        />

      ))}
    </ul>
  )
}
