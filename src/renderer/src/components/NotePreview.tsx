
import { cn, formateDateFromMs } from '@renderer/utils'
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>

export const NotePreview = ({
  title,
  content,
  created_at,
  updated_at,
  isActive = false,
  className,
  ...props
}: NotePreviewProps) => {

  const date = formateDateFromMs(updated_at)

  const categories = ['personal', 'work', 'school', 'other']

  const categoriesLimit = categories.filter((_, index) => index < 3)

  return (
    <div
      className={cn('cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/25': isActive,
          'hover:bg-zinc-400/25': !isActive,
        },
        className
      )}
      {...props}
    >
      <h3 className='mb-1 font-bold truncate'>{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
      {/* <div className='flex gap-2'> */}
      {/*   {categoriesLimit.map((category) => ( */}
      {/*     <small */}
      {/*       key={category} */}
      {/*       className={cn('uppercase border-2 rounded-md px-2 py-1 text-[10px]', */}
      {/*         { */}
      {/*           'border-red-400 text-red-400': category === 'personal', */}
      {/*           'border-blue-400 text-blue-400': category === 'work', */}
      {/*         } */}
      {/*       )} */}
      {/*     > */}
      {/*       {category} */}
      {/*     </small> */}
      {/*   )) */}
      {/*   } */}
      {/* </div> */}
    </div>
  )
}
