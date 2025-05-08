"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Filter, Plus, Search, SortAsc, SortDesc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MainContentProps {
  selectedItem: string | null
  onToggleThirdPane: () => void
  isThirdPaneOpen: boolean
}

// Mock data for content items
const contentItems = [
  {
    id: "item1",
    title: "Project Alpha",
    description: "Frontend development project",
    date: "Today",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "item2",
    title: "Client Meeting",
    description: "Discuss requirements with client",
    date: "Yesterday",
    priority: "Medium",
    status: "Scheduled",
  },
  {
    id: "item3",
    title: "Design Review",
    description: "Review UI/UX designs for mobile app",
    date: "2 days ago",
    priority: "High",
    status: "Pending",
  },
  {
    id: "item4",
    title: "Sprint Planning",
    description: "Plan tasks for upcoming sprint",
    date: "3 days ago",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: "item5",
    title: "Bug Fixes",
    description: "Address critical bugs in production",
    date: "1 week ago",
    priority: "High",
    status: "In Progress",
  },
]

export function MainContent({ selectedItem, onToggleThirdPane, isThirdPaneOpen }: MainContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState("all")

  // Get content based on selected sidebar item
  const getContent = () => {
    switch (selectedItem) {
      case "inbox":
        return "Inbox"
      case "contacts":
        return "Contacts"
      case "documents":
        return "Documents"
      case "settings":
        return "Settings"
      case "help":
        return "Help & Support"
      default:
        return "Dashboard"
    }
  }

  // Filter and sort items
  let filteredItems = [...contentItems]

  // Filter by search query
  if (searchQuery) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Filter by tab
  if (activeTab !== "all") {
    filteredItems = filteredItems.filter((item) => item.status.toLowerCase() === activeTab.toLowerCase())
  }

  // Sort items
  filteredItems.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title)
    } else {
      return b.title.localeCompare(a.title)
    }
  })

  // Get priority badge variant
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{getContent()}</h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                  <SortAsc className="mr-2 h-4 w-4" />
                  Sort A-Z
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("desc")}>
                  <SortDesc className="mr-2 h-4 w-4" />
                  Sort Z-A
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>High Priority</DropdownMenuItem>
                <DropdownMenuItem>Medium Priority</DropdownMenuItem>
                <DropdownMenuItem>Low Priority</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4">
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

        <Tabs defaultValue="all" className="mt-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in progress">In Progress</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="grid gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card key={item.id} className="cursor-pointer transition-all hover:bg-accent/50">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <Badge variant={getPriorityBadge(item.priority)}>{item.priority}</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onToggleThirdPane()}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground">{item.date}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm">{item.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Assigned to you</span>
                    </div>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No results found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We couldn't find any items matching your search. Try adjusting your filters or search terms.
              </p>
              <Button className="mt-4" onClick={() => setSearchQuery("")}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
