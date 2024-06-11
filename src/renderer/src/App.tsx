import { Content, RootLayout, Sidebar, ActionButtonsRow, NotePreviewList, MarkdownEditor, FloatingNopteTitle } from "@/components"
import { useRef } from "react"

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0)
  }

  return (
    <>
      {/* NOTE:Solo funciona para SO que se basen en ventanas flotantes */}
      {/* <DraggalbeTopBar> */}

      <RootLayout>
        <Sidebar className="p-2 bg-zinc-900/40">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={resetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-800/80 border-l-white/20">
          <FloatingNopteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout >
    </>
  )
}

export default App
