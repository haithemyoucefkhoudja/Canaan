"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  BookOpen,
  Globe,
  FileImage,
  Calendar,
  Link,
  X,
  Zap,
} from "lucide-react";

interface SourceUploadProps {
  source?: any;
  onClose: () => void;
}

const sourceTypes = [
  {
    value: "book",
    label: "Book",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "article",
    label: "Article",
    icon: FileText,
    color: "bg-green-100 text-green-800",
  },
  {
    value: "document",
    label: "Document",
    icon: FileImage,
    color: "bg-orange-100 text-orange-800",
  },
  {
    value: "website",
    label: "Website",
    icon: Globe,
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "manuscript",
    label: "Manuscript",
    icon: FileText,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "newspaper",
    label: "Newspaper",
    icon: FileText,
    color: "bg-red-100 text-red-800",
  },
  {
    value: "journal",
    label: "Journal",
    icon: BookOpen,
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    value: "archive",
    label: "Archive",
    icon: FileImage,
    color: "bg-gray-100 text-gray-800",
  },
];

// Mock events for linking
const mockEvents = [
  { id: "1", name: "The Industrial Revolution" },
  { id: "2", name: "French Revolution" },
  { id: "3", name: "American Civil War" },
];

export function SourceUpload({ source, onClose }: SourceUploadProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    title: source?.title || "",
    author: source?.author || "",
    type: source?.type || "",
    url: source?.url || "",
    publishDate: source?.publishDate
      ? source.publishDate.toISOString().split("T")[0]
      : "",
    description: source?.description || "",
    content: source?.content || "",
  });
  const [linkedEvents, setLinkedEvents] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Prisma create/update logic
    console.log("Source form submitted:", {
      formData,
      linkedEvents,
      uploadedFile,
    });
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      // Auto-fill title if empty
      if (!formData.title) {
        setFormData((prev) => ({
          ...prev,
          title: e.target.files![0].name.replace(/\.[^/.]+$/, ""),
        }));
      }
    }
  };

  const addEventLink = (eventId: string) => {
    if (!linkedEvents.includes(eventId)) {
      setLinkedEvents((prev) => [...prev, eventId]);
    }
  };

  const removeEventLink = (eventId: string) => {
    setLinkedEvents((prev) => prev.filter((id) => id !== eventId));
  };

  const extractTextFromFile = () => {
    // TODO: Implement text extraction logic
    console.log("Extracting text from file:", uploadedFile?.name);
    setFormData((prev) => ({
      ...prev,
      content: "Extracted text content would appear here...",
    }));
  };

  const generateEmbedding = () => {
    // TODO: Implement AI embedding generation
    console.log("Generating AI embedding for content");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Source Details</TabsTrigger>
          <TabsTrigger value="content">Content & Text</TabsTrigger>
          <TabsTrigger value="links">Event Links</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          {/* File Upload */}
          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle className="text-lg">
                Upload Document (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload PDF, Word document, or text file
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.rtf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>
                {uploadedFile && (
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={extractTextFromFile}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Extract Text
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter source title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="author">Author/Creator *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Source Type *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sourceTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="publishDate"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Publish Date
                </Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      publishDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="url" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  URL (Optional)
                </Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Brief description of the source"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label htmlFor="content">Full Text Content</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateEmbedding}
              >
                <Zap className="h-3 w-3 mr-1" />
                Generate AI Embedding
              </Button>
            </div>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Paste or type the full text content here..."
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Full text enables AI-powered search and analysis. Content will be
              used to generate embeddings for semantic search.
            </p>
          </div>

          {/* AI Features */}
          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle className="text-lg">AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Text Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Extract key themes, entities, and concepts
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Analyze Text
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Citation Generator</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Generate formatted citations automatically
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Generate Citation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          <div>
            <Label className="flex items-center gap-2 mb-4">
              <Link className="h-4 w-4" />
              Link to Events
            </Label>
            <div className="space-y-4">
              <Select onValueChange={addEventLink}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an event to link this source" />
                </SelectTrigger>
                <SelectContent>
                  {mockEvents
                    .filter((event) => !linkedEvents.includes(event.id))
                    .map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {linkedEvents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">
                    Linked Events ({linkedEvents.length})
                  </h4>
                  <div className="space-y-2">
                    {linkedEvents.map((eventId) => {
                      const event = mockEvents.find((e) => e.id === eventId);
                      if (!event) return null;
                      return (
                        <div
                          key={eventId}
                          className="flex items-center justify-between p-3 bg-muted rounded-lg"
                        >
                          <span className="font-medium">{event.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEventLink(eventId)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Link Relevance */}
          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle className="text-lg">Link Relevance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Specify how this source relates to the linked events for better
                organization.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Primary", "Secondary", "Reference", "Context"].map(
                  (relevance) => (
                    <Badge
                      key={relevance}
                      variant="outline"
                      className="justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    >
                      {relevance}
                    </Badge>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!formData.title || !formData.author || !formData.type}
        >
          {source ? "Update Source" : "Add Source"}
        </Button>
      </div>
    </form>
  );
}
