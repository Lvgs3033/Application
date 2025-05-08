"use client"

import { useState } from "react"
import { PanelLayout } from "@/components/panel-layout"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { DetailPanel } from "@/components/detail-panel"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isThirdPaneOpen, setIsThirdPaneOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId)
    // Auto-open third pane when an item is selected
    setIsThirdPaneOpen(true)
  }

  const handleToggleThirdPane = () => {
    setIsThirdPaneOpen(!isThirdPaneOpen)
  }

  const handleCloseThirdPane = () => {
    setIsThirdPaneOpen(false)
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-background">
      <PanelLayout
        sidebar={<Sidebar onItemSelect={handleItemSelect} selectedItem={selectedItem} />}
        mainContent={
          <MainContent
            selectedItem={selectedItem}
            onToggleThirdPane={handleToggleThirdPane}
            isThirdPaneOpen={isThirdPaneOpen}
          />
        }
        detailPanel={
          isThirdPaneOpen && selectedItem ? (
            <DetailPanel itemId={selectedItem} onClose={handleCloseThirdPane} isMobile={isMobile} />
          ) : null
        }
        isThirdPaneOpen={isThirdPaneOpen}
      />
    </main>
  )
}
