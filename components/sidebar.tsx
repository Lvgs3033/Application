"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
import { Inbox, Users, Settings, HelpCircle, FileText, PlusCircle, Bell, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface SidebarProps {
  onItemSelect: (itemId: string) => void
  selectedItem: string | null
}

// Mock data for sidebar items
const sidebarItems = [
  { id: "inbox", label: "Inbox", icon: Inbox, notifications: 5 },
  { id: "contacts", label: "Contacts", icon: Users, notifications: 0 },
  { id: "documents", label: "Documents", icon: FileText, notifications: 2 },
  { id: "settings", label: "Settings", icon: Settings, notifications: 0 },
  { id: "help", label: "Help & Support", icon: HelpCircle, notifications: 0 },
]

export function Sidebar({ onItemSelect, selectedItem }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = sidebarItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Application</h2>
        <ThemeToggle />
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredItems.map((item) => (
            <Button
              key={item.id}
              variant={selectedItem === item.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 px-2 py-6"
              onClick={() => onItemSelect(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.notifications > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {item.notifications}
                </Badge>
              )}
            </Button>
          ))}

          <Button variant="ghost" className="mt-2 w-full justify-start gap-2 px-2 py-6">
            <PlusCircle className="h-5 w-5" />
            <span>Add New</span>
          </Button>
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <div>
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
