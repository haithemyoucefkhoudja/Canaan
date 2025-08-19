"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, Video, Music, FileText, Download, Edit, Link, Calendar, Clock, ExternalLink } from "lucide-react"

interface MediaDetailProps {
  media: any
  onClose: () => void
}

const assetTypeIcons = {
  image: ImageIcon,
  video: Video,
  audio: Music,
  document: FileText,
}

const assetTypeColors = {
  image: "bg-blue-100 text-blue-800",
  video: "bg-purple-100 text-purple-800",
  audio: "bg-green-100 text-green-800",
  document: "bg-orange-100 text-orange-800",
}

export function MediaDetail({ media, onClose }: MediaDetailProps) {
  const Icon = assetTypeIcons[media.assetType as keyof typeof assetTypeIcons]

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {media.title}
            </h2>
            <Badge className={`${assetTypeColors[media.assetType as keyof typeof assetTypeColors]}`}>
              {media.assetType}
            </Badge>
          </div>
          <p className="text-muted-foreground">{media.sourceText}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Separator />

      {/* Media Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Preview
          </h3>
          <Card className="bg-muted">
            <CardContent className="p-0">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                {media.assetType === "image" ? (
                  <img
                    src={media.storageUrl || "/placeholder.svg"}
                    alt={media.title}
                    className="w-full h-full object-contain"
                  />
                ) : media.assetType === "video" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Video className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Video Preview</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open Video
                    </Button>
                  </div>
                ) : media.assetType === "audio" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Music className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Audio File</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Play Audio
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Document</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open Document
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Metadata */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Link className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Linked Event</p>
                  <p className="text-sm text-muted-foreground">{media.event.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Event Date</p>
                  <p className="text-sm text-muted-foreground">{formatDate(media.event.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Added</p>
                  <p className="text-sm text-muted-foreground">{formatDate(media.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Type</p>
                  <p className="text-sm text-muted-foreground capitalize">{media.assetType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              AI Features
            </h3>
            <div className="space-y-3">
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Text Embedding</h4>
                  <p className="text-sm text-muted-foreground">
                    {media.embedding ? "Vector embedding generated for search" : "No embedding generated yet"}
                  </p>
                  {!media.embedding && (
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Generate Embedding
                    </Button>
                  )}
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Content Analysis</h4>
                  <p className="text-sm text-muted-foreground">AI-powered content analysis and tagging</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Analyze Content
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Link className="h-4 w-4" />
          View Event
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <ImageIcon className="h-4 w-4" />
          Related Media
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <ExternalLink className="h-4 w-4" />
          Open Original
        </Button>
      </div>
    </div>
  )
}
