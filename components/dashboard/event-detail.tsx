"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Clock, Network, ImageIcon, Users, FileText, Edit, ExternalLink } from "lucide-react"

interface EventDetailProps {
  event: any
  onEdit: () => void
  onClose: () => void
}

export function EventDetail({ event, onEdit, onClose }: EventDetailProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDuration = () => {
    const years = event.endDate.getFullYear() - event.startDate.getFullYear()
    if (years === 0) {
      const months = event.endDate.getMonth() - event.startDate.getMonth()
      return months === 0 ? "Same day" : `${months} month${months > 1 ? "s" : ""}`
    }
    return `${years} year${years > 1 ? "s" : ""}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {event.name}
          </h2>
          <p className="text-muted-foreground">{event.description}</p>
        </div>
        <Button onClick={onEdit} className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Event
        </Button>
      </div>

      <Separator />

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            Timeline
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{formatDate(event.startDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">{formatDate(event.endDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">{getDuration()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            Location
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{event.location}</p>
                {event.coordinates && <p className="text-sm text-muted-foreground">{event.coordinates}</p>}
              </div>
            </div>
            {event.coordinates && (
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <ExternalLink className="h-3 w-3" />
                View on Map
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Tags */}
      <div>
        <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Statistics */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Connected Data
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <ImageIcon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{event._count.mediaAssets}</p>
            <p className="text-sm text-muted-foreground">Media Assets</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{event._count.characterLinks}</p>
            <p className="text-sm text-muted-foreground">Characters</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <Network className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{event._count.sourceEvents + event._count.targetEvents}</p>
            <p className="text-sm text-muted-foreground">Relationships</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <FileText className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{event._count.sourceLinks}</p>
            <p className="text-sm text-muted-foreground">Sources</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Network className="h-4 w-4" />
          View Relationships
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <ImageIcon className="h-4 w-4" />
          Manage Media
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Users className="h-4 w-4" />
          View Characters
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <FileText className="h-4 w-4" />
          View Sources
        </Button>
      </div>
    </div>
  )
}
