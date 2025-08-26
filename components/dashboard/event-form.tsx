"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Tag, X, BookOpen, Users } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { getSources, getActors, createEvent, updateEvent } from "@/lib/supabase"
import { eventSchema, type EventFormData } from "@/lib/validations/event"
import { toast } from "sonner"

interface EventFormProps {
  event?: any
  onClose: () => void
  onSuccess?: () => void
}

export function EventForm({ event, onClose, onSuccess }: EventFormProps) {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event?.name || "",
      description: event?.description || "",
      startDate: event?.startDate ? new Date(event.startDate).toISOString().split("T")[0] : "",
      endDate: event?.endDate ? new Date(event.endDate).toISOString().split("T")[0] : "",
      location: event?.location || "",
      coordinates: event?.coordinates || "",
      tags: event?.tags || [],
    },
  })

  const [newTag, setNewTag] = useState("")
  const [sources, setSources] = useState<any[]>([])
  const [actors, setActors] = useState<any[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>(
    event?.sourceLinks?.map((link: any) => link.source.id) || [],
  )
  const [selectedActors, setSelectedActors] = useState<{ actorId: string; role: string }[]>(
    event?.actorLinks?.map((link: any) => ({ actorId: link.actor.id, role: link.role || "participant" })) || [],
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSources()
    loadActors()
  }, [])

  const loadSources = async () => {
    try {
      const sourcesData = await getSources()
      setSources(sourcesData)
    } catch (error) {
      console.error("Error loading sources:", error)
    }
  }

  const loadActors = async () => {
    try {
      const actorsData = await getActors()
      setActors(actorsData)
    } catch (error) {
      console.error("Error loading actors:", error)
    }
  }

  const onSubmit = async (data: EventFormData) => {
    setLoading(true)

    try {
      const eventData = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      }

      if (event) {
        await updateEvent(event.id, eventData, selectedSources, selectedActors)
        toast.success("Event updated successfully")

      } else {
        await createEvent(eventData, selectedSources, selectedActors)
        toast.success("Event created successfully")
        
      }
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error("Error saving event:", error)
      toast.error("Failed to save event. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !form.getValues("tags").includes(newTag.trim())) {
      const currentTags = form.getValues("tags")
      form.setValue("tags", [...currentTags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags")
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    )
  }

  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources((prev) => (prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]))
  }

  const handleActorToggle = (actorId: string) => {
    setSelectedActors((prev) => {
      const exists = prev.find((a) => a.actorId === actorId)
      if (exists) {
        return prev.filter((a) => a.actorId !== actorId)
      } else {
        return [...prev, { actorId, role: "participant" }]
      }
    })
  }

  const handleActorRoleChange = (actorId: string, role: string) => {
    setSelectedActors((prev) => prev.map((a) => (a.actorId === actorId ? { ...a, role } : a)))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the historical event" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  End Date
                </FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter location name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coordinates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coordinates (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="latitude,longitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Actors */}
        <div>
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Actors ({selectedActors.length} selected)
          </Label>
          <div className="max-h-48 overflow-y-auto border rounded-md p-3 mt-2 space-y-3">
            {actors.map((actor) => {
              const isSelected = selectedActors.find((a) => a.actorId === actor.id)
              return (
                <div key={actor.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`actor-${actor.id}`}
                      checked={!!isSelected}
                      onCheckedChange={() => handleActorToggle(actor.id)}
                    />
                    <Label htmlFor={`actor-${actor.id}`} className="text-sm font-normal cursor-pointer flex-1">
                      <div className="font-medium">{actor.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {actor.actorType} {actor.nationality && `• ${actor.nationality}`}
                      </div>
                    </Label>
                  </div>
                  {isSelected && (
                    <div className="ml-6">
                      <Label className="text-xs">Role:</Label>
                      <Select value={isSelected.role} onValueChange={(role) => handleActorRoleChange(actor.id, role)}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="participant">Participant</SelectItem>
                          <SelectItem value="leader">Leader</SelectItem>
                          <SelectItem value="organizer">Organizer</SelectItem>
                          <SelectItem value="victim">Victim</SelectItem>
                          <SelectItem value="opponent">Opponent</SelectItem>
                          <SelectItem value="supporter">Supporter</SelectItem>
                          <SelectItem value="witness">Witness</SelectItem>
                          <SelectItem value="commander">Commander</SelectItem>
                          <SelectItem value="diplomat">Diplomat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )
            })}
            {actors.length === 0 && (
              <div className="text-muted-foreground text-sm text-center py-4">
                No actors available. Create actors first to link them to events.
              </div>
            )}
          </div>
        </div>

        {/* Sources */}
        <div>
          <Label className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Sources ({selectedSources.length} selected)
          </Label>
          <div className="max-h-48 overflow-y-auto border rounded-md p-3 mt-2 space-y-2">
            {sources.map((source) => (
              <div key={source.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`source-${source.id}`}
                  checked={selectedSources.includes(source.id)}
                  onCheckedChange={() => handleSourceToggle(source.id)}
                />
                <Label htmlFor={`source-${source.id}`} className="text-sm font-normal cursor-pointer flex-1">
                  <div className="font-medium">{source.title}</div>
                  {source.author && <div className="text-muted-foreground text-xs">by {source.author}</div>}
                </Label>
              </div>
            ))}
            {sources.length === 0 && (
              <div className="text-muted-foreground text-sm text-center py-4">
                No sources available. Create sources first to link them to events.
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <Label className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Tags
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            />
            <Button type="button" onClick={addTag} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {form.watch("tags").map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
