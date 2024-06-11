import { appDirectoryName, fileEncoding, welcomeFileName } from "../../shared/constants"
import { NoteInfo } from "@shared/models"
import { DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types"
import { dialog } from "electron"
import { writeFile, ensureDir, readdir, stat, readFile, remove } from "fs-extra"
import { homedir } from "os"
import { isEmpty } from "lodash"
import welcomeFile from '../../../resources/Bienvenido.md?asset'
import path from "path"

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFileNames.filter(fileName => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No hay notas, creando la nota de bienvenida')

    const content = await readFile(welcomeFile, { encoding: fileEncoding })

    await writeFile(`${rootDir}/${welcomeFileName}`, content, { encoding: fileEncoding })

    notes.push(welcomeFileName)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    id: fileStats.ino,
    title: filename.replace(/\.md$/, ''),
    content: '',
    categories: [],
    shared_with: [],
    created_at: fileStats.birthtimeMs,
    updated_at: fileStats.mtimeMs,
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()
  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  console.info(`Writing note ${filename}`)

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'Nueva Nota',
    defaultPath: `${rootDir}/Untitle.md`,
    buttonLabel: 'Guardar',
    properties: ['showOverwriteConfirmation'],
    filters: [
      { name: 'Markdown', extensions: ['md'] }
    ]
  })

  if (canceled || !filePath) {
    console.info('No se creó la nota')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Error al crear la nota',
      message: `La nota debe estar en la carpeta de notas: ${rootDir}`,

    })
    return false
  }

  console.info(`Creando nota ${filePath}`)
  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Eliminar Nota',
    message: `¿Estás seguro de eliminar la nota ${filename}?`,
    buttons: ['Cancelar', 'Eliminar'],
    defaultId: 0,
    cancelId: 0
  })

  if (response === 0) {
    console.info('No se eliminó la nota')
    return false
  }

  console.info(`Eliminando nota ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
