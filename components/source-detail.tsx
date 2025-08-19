"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  BookOpen,
  Globe,
  FileImage,
  Calendar,
  User,
  Link,
  Download,
  Edit,
  ExternalLink,
  Quote,
  Search,
  Zap,
  Copy,
} from "lucide-react";
import { formatDate } from "@/lib/tools/format-date";
interface SourceDetailProps {
  source: any;
  onEdit: () => void;
  onClose: () => void;
}

const sourceTypeIcons = {
  book: BookOpen,
  article: FileText,
  document: FileImage,
  website: Globe,
};

export function SourceDetail({ source, onEdit, onClose }: SourceDetailProps) {
  const Icon =
    sourceTypeIcons[source.type as keyof typeof sourceTypeIcons] || FileText;

  const generateCitation = (format: string) => {
    // TODO: Implement citation generation
    const citations = {
      apa: `${source.author} (${source.publishDate?.getFullYear()}). ${
        source.title
      }. ${source.url || "Print."}`,
      mla: `${source.author}. "${
        source.title
      }." ${source.publishDate?.getFullYear()}. ${source.url || "Print."}`,
      chicago: `${source.author}. "${
        source.title
      }." Accessed ${new Date().toLocaleDateString()}. ${
        source.url || "Print."
      }.`,
    };
    return citations[format as keyof typeof citations] || citations.apa;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Icon className="h-6 w-6 text-muted-foreground" />
            <Badge variant="secondary" className="capitalize">
              {source.type}
            </Badge>
            {source.embedding && (
              <Badge variant="outline" className="gap-1">
                <Search className="h-3 w-3" />
                AI Searchable
              </Badge>
            )}
          </div>
          <h2
            className="text-2xl font-bold text-foreground mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {source.title}
          </h2>
          <p className="text-muted-foreground">{source.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Source
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Full Text</TabsTrigger>
          <TabsTrigger value="citations">Citations</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metadata */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Source Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Author</p>
                    <p className="text-sm text-muted-foreground">
                      {source.author}
                    </p>
                  </div>
                </div>
                {source.publishDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Published</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(source.publishDate)}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Type</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {source.type}
                    </p>
                  </div>
                </div>
                {source.url && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">URL</p>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm"
                        asChild
                      >
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Open External Link
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Usage & Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Link className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  {/* <p className="text-2xl font-bold">{source._count.sourceLinks}</p> */}
                  <p className="text-sm text-muted-foreground">Event Links</p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Added to Database</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(source.createdAt)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(source.updatedAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Quote className="h-4 w-4" />
              Generate Citation
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Link className="h-4 w-4" />
              View Event Links
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Search className="h-4 w-4" />
              Find Similar Sources
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Zap className="h-4 w-4" />
              AI Analysis
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Full Text Content</CardTitle>
            </CardHeader>
            <CardContent>
              {source.content ? (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto p-4 bg-muted/50 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {source.content}
                    </pre>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(source.content)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Text
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-3 w-3 mr-1" />
                      Search in Text
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No full text content available
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={onEdit}
                  >
                    Add Content
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="citations" className="space-y-6">
          <div className="space-y-4">
            {["APA", "MLA", "Chicago"].map((format) => (
              <Card key={format} className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">{format} Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/50 rounded-lg mb-4">
                    <p className="text-sm font-mono">
                      {generateCitation(format.toLowerCase())}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(generateCitation(format.toLowerCase()))
                    }
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy Citation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Text Embedding</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {source.embedding
                      ? "Vector embedding generated for semantic search"
                      : "No embedding generated yet"}
                  </p>
                  <Button variant="outline" size="sm">
                    <Zap className="h-3 w-3 mr-1" />
                    {source.embedding ? "Regenerate" : "Generate"} Embedding
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Content Analysis</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Extract key themes, entities, and concepts
                  </p>
                  <Button variant="outline" size="sm">
                    <Search className="h-3 w-3 mr-1" />
                    Analyze Content
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Related Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Find sources with similar content or themes
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <Search className="h-4 w-4 mr-2" />
                  Find Similar Sources
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
