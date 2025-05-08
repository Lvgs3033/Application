"use client"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Calendar, FileText, Edit, Trash, Share, Star, Clock, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DetailPanelProps {
  itemId: string
  onClose: () => void
  isMobile: boolean
}

export function DetailPanel({ itemId, onClose, isMobile }: DetailPanelProps) {
  const [comment, setComment] = useState("")
  const [progress, setProgress] = useState(65)
  const [isStarred, setIsStarred] = useState(false)

  const handleAddComment = () => {
    if (comment.trim()) {
      // In a real app, you would add the comment to a database
      // For now, just clear the input
      setComment("")
      // Simulate adding a comment by increasing progress
      setProgress(Math.min(100, progress + 5))
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Project Details</h2>
          <Badge variant="outline">PRJ-{itemId}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsStarred(!isStarred)}>
            <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
            <span className="sr-only">{isStarred ? "Unstar" : "Star"} project</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Share className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close panel</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="flex-1">
        <div className="border-b px-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="details" className="p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium">Project Alpha</h3>
                <div className="mt-1 flex items-center gap-2">
                  <Badge>In Progress</Badge>
                  <span className="text-sm text-muted-foreground">Started 2 weeks ago</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Timeline</h4>
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm">Start: October 15, 2023</span>
                    <Separator className="my-1" />
                    <span className="text-sm">Due: December 15, 2023</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Assigned Team</h4>
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-background">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                    +3
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Description</h4>
                <p className="mt-1 text-sm">
                  This project involves developing a responsive user interface for the client's new web application. The
                  design should follow the provided Figma mockups and implement all interactive elements.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Requirements</h4>
                <ul className="mt-1 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Implement responsive design for all screen sizes
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Ensure accessibility compliance
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    Optimize performance for mobile devices
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    Implement state management using React hooks
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    Create reusable component library
                  </li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" className="w-full">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="p-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">John Doe</p>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm">Added new design requirements to the project.</p>
                  <div className="rounded-md border bg-muted/40 p-2 text-sm">
                    We need to add support for dark mode in the application.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Jane Smith</p>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm">Updated the project timeline.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Mike Johnson</p>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                  <p className="text-sm">Created the project and assigned team members.</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Add Comment</h4>
                <Textarea
                  placeholder="Type your comment here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleAddComment} disabled={!comment.trim()}>
                  Add Comment
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files" className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">design-specs.pdf</p>
                    <p className="text-xs text-muted-foreground">2.4 MB • Added 2 days ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">project-timeline.xlsx</p>
                    <p className="text-xs text-muted-foreground">1.8 MB • Added 3 days ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">requirements.docx</p>
                    <p className="text-xs text-muted-foreground">1.2 MB • Added 5 days ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>

              <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="rounded-full bg-muted p-3">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Upload a file</h3>
                <p className="mt-2 text-sm text-muted-foreground">Drag and drop files here or click to browse</p>
                <Button className="mt-4">Upload File</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="people" className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Project Manager</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Message
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-muted-foreground">UI/UX Designer</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Message
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Mike Johnson</p>
                    <p className="text-xs text-muted-foreground">Frontend Developer</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Message
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Sarah Williams</p>
                    <p className="text-xs text-muted-foreground">Backend Developer</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Message
                </Button>
              </div>

              <Separator />

              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Add Team Member</h4>
                <div className="flex gap-2">
                  <Input placeholder="Email address" className="flex-1" />
                  <Button>Add</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
