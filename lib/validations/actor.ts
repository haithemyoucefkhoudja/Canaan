import { z } from "zod"

export const actorSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    actorType: z.enum(["person", "government", "organization", "institution", "military", "political_party"]),
    description: z.string().optional(),
    birthDate: z.string().optional(),
    deathDate: z.string().optional(),
    foundedDate: z.string().optional(),
    dissolvedDate: z.string().optional(),
    nationality: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only allow nationality for non-government types
      if (data.actorType === "government" && data.nationality) {
        return false
      }
      return true
    },
    {
      message: "Nationality is not applicable for government actors",
      path: ["nationality"],
    },
  )

export type ActorFormData = z.infer<typeof actorSchema>
