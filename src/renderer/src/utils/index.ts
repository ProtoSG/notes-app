import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const dateFormatted = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  hour12: true,
  timeZone: 'America/Lima',
})

export const formateDateFromMs = (ms: number) => dateFormatted.format(ms)
export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
