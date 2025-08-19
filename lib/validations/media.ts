import { z } from "zod"

export const mediaAssetSchema = z.object({
  eventId: z.string().min(1, "Event is required"),
  assetType: z.enum(["image", "video", "audio", "document"]),
  storageUrl: z.string().url("Must be a valid URL"),
  title: z.string().optional(),
  sourceText: z.string().optional(),
})

export type MediaAssetFormData = z.infer<typeof mediaAssetSchema>

export const quizSchema = z.object({
  eventId: z.string().min(1, "Event is required"),
  quizGraph: z.record(z.any()), // JSON object for quiz structure
})

export type QuizFormData = z.infer<typeof quizSchema>
