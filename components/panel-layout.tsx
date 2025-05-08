import type { ReactNode } from "react"

interface PanelLayoutProps {
  sidebar: ReactNode
  mainContent: ReactNode
  detailPanel: ReactNode | null
  isThirdPaneOpen: boolean
}

export function PanelLayout({ sidebar, mainContent, detailPanel, isThirdPaneOpen }: PanelLayoutProps) {
  return (
    <div className="flex h-full w-full">
      {/* First pane - Sidebar */}
      <div className="h-full w-64 flex-shrink-0 border-r bg-muted/30 md:block">{sidebar}</div>

      {/* Second pane - Main content */}
      <div className={`h-full flex-grow transition-all duration-300 ${isThirdPaneOpen ? "md:w-1/2" : "md:w-full"}`}>
        {mainContent}
      </div>

      {/* Third pane - Detail panel */}
      {detailPanel && (
        <div
          className={`h-full w-full border-l transition-all duration-300 md:w-1/3 ${isThirdPaneOpen ? "block" : "hidden"}`}
        >
          {detailPanel}
        </div>
      )}
    </div>
  )
}
