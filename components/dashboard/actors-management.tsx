"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { actorSchema, type ActorFormData } from "@/lib/validations/actor"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Users, Building, Crown, Shield, Loader2 } from "lucide-react"
import { getActors, createActor, updateActor } from "@/lib/supabase"

interface Actor {
  id: string
  name: string
  actorType: string
  description?: string
  birthDate?: string
  deathDate?: string
  foundedDate?: string
  dissolvedDate?: string
  nationality?: string
  createdAt: string
  updatedAt: string
  actorLinks?: { eventId: string; role?: string; event: { name: string } }[]
}

const actorTypes = [
  { value: "person", label: "Person", icon: Users },
  { value: "government", label: "Government", icon: Crown },
  { value: "organization", label: "Organization", icon: Building },
  { value: "institution", label: "Institution", icon: Building },
  { value: "military", label: "Military", icon: Shield },
  { value: "political_party", label: "Political Party", icon: Crown },
]

export function ActorsManagement() {
  const {
    data: actors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["actors"],
    queryFn: getActors,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingActor, setEditingActor] = useState<Actor | null>(null)

  const filteredActors = actors.filter((actor: Actor) => {
    const matchesSearch =
      actor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      actor.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || actor.actorType === selectedType
    return matchesSearch && matchesType
  })

  const getActorTypeIcon = (type: string) => {
    const actorType = actorTypes.find((t) => t.value === type)
    return actorType ? actorType.icon : Users
  }

  const getActorTypeLabel = (type: string) => {
    const actorType = actorTypes.find((t) => t.value === type)
    return actorType ? actorType.label : type
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <span className="ml-2 text-lg">Loading actors...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-2">Error loading actors</div>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historical Actors</h1>
          <p className="text-gray-600 mt-2">Manage people, governments, organizations, and institutions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Actor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Actor</DialogTitle>
            </DialogHeader>
            <ActorForm
              onSuccess={() => {
                setIsCreateDialogOpen(false)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search actors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {actorTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredActors.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No actors found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedType !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Start by adding your first historical actor."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActors.map((actor: Actor) => {
            const IconComponent = getActorTypeIcon(actor.actorType)
            return (
              <Card key={actor.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-lg">{actor.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{getActorTypeLabel(actor.actorType)}</Badge>
                  </div>
                  {actor.description && <CardDescription className="line-clamp-2">{actor.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    {actor.actorType === "person" && actor.birthDate && (
                      <div>
                        <span className="font-medium">Born:</span> {new Date(actor.birthDate).getFullYear()}
                        {actor.deathDate && ` - ${new Date(actor.deathDate).getFullYear()}`}
                      </div>
                    )}
                    {actor.actorType !== "person" && actor.foundedDate && (
                      <div>
                        <span className="font-medium">Founded:</span> {new Date(actor.foundedDate).getFullYear()}
                        {actor.dissolvedDate && ` - ${new Date(actor.dissolvedDate).getFullYear()}`}
                      </div>
                    )}
                    {actor.nationality && actor.actorType !== "government" && (
                      <div>
                        <span className="font-medium">Nationality:</span> {actor.nationality}
                      </div>
                    )}
                    {actor.actorLinks && actor.actorLinks.length > 0 && (
                      <div>
                        <span className="font-medium">Events:</span> {actor.actorLinks.length}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ActorForm({ actor, onSuccess }: { actor?: Actor; onSuccess: () => void }) {
  const queryClient = useQueryClient()

  const form = useForm<ActorFormData>({
    resolver: zodResolver(actorSchema),
    defaultValues: {
      name: actor?.name || "",
      actorType: (actor?.actorType as any) || "person",
      description: actor?.description || "",
      birthDate: actor?.birthDate || "",
      deathDate: actor?.deathDate || "",
      foundedDate: actor?.foundedDate || "",
      dissolvedDate: actor?.dissolvedDate || "",
      nationality: actor?.nationality || "",
    },
  })

  const createMutation = useMutation({
    mutationFn: createActor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actors"] })
      onSuccess()
    },
    onError: (error) => {
      console.error("Error creating actor:", error)
      form.setError("root", { message: "Failed to create actor. Please try again." })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ActorFormData }) => updateActor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actors"] })
      onSuccess()
    },
  })

  const onSubmit = (data: ActorFormData) => {
    if (actor) {
      updateMutation.mutate({ id: actor.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const actorType = form.watch("actorType")
  const isPerson = actorType === "person"
  const isGovernment = actorType === "government"

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register("name")} className={form.formState.errors.name ? "border-red-500" : ""} />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="actorType">Type</Label>
          <Select value={actorType} onValueChange={(value) => form.setValue("actorType", value as any)}>
            <SelectTrigger className={form.formState.errors.actorType ? "border-red-500" : ""}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {actorTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.actorType && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.actorType.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...form.register("description")} rows={3} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {isPerson ? (
          <>
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input id="birthDate" type="date" {...form.register("birthDate")} />
            </div>
            <div>
              <Label htmlFor="deathDate">Death Date</Label>
              <Input id="deathDate" type="date" {...form.register("deathDate")} />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="foundedDate">Founded Date</Label>
              <Input id="foundedDate" type="date" {...form.register("foundedDate")} />
            </div>
            <div>
              <Label htmlFor="dissolvedDate">Dissolved Date</Label>
              <Input id="dissolvedDate" type="date" {...form.register("dissolvedDate")} />
            </div>
          </>
        )}
      </div>

      {!isGovernment && (
        <div>
          <Label htmlFor="nationality">Nationality/Origin</Label>
          <Input
            id="nationality"
            {...form.register("nationality")}
            className={form.formState.errors.nationality ? "border-red-500" : ""}
          />
          {form.formState.errors.nationality && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.nationality.message}</p>
          )}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="min-w-[120px]">
          {createMutation.isPending || updateMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {actor ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{actor ? "Update Actor" : "Create Actor"}</>
          )}
        </Button>
      </div>
      {form.formState.errors.root && (
        <p className="text-sm text-red-500 mt-1">{form.formState.errors.root.message}</p>
      )}
    </form>
  )
}
