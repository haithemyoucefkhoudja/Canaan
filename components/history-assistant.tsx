// file: components/history-assistant.tsx
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

// --- CHANGE [1]: IMPORT the tools we need for API calls ---
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Send,
  Mic,
  Search,
  Plus,
  BookOpen,
  Settings,
  Moon,
  Sun,
  Languages,
  Menu,
  X,
  Copy,
  Edit3,
  Trash2,
  Share,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Check,
  Volume2,
  Upload,
  MicOff,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Clock,
  Gauge,
  Sparkles,
  History,
  FileText,
  ImageIcon,
  Pause,
} from "lucide-react"
import type { SpeechRecognition } from "web-speech-api"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  liked?: boolean
  disliked?: boolean
  type?: "text" | "audio" | "image"
  audioBlob?: Blob
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

// --- CHANGE [2]: DEFINE the shape of our API response and the function to call it ---
type ApiResponse = {
  reply: string;
};

const sendMessageToApi = async (messageText: string): Promise<ApiResponse> => {
  const response = await fetch('/api/agent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: messageText }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};


const voiceOptions = {
    // ... (This section is unchanged, so it is omitted for brevity) ...
    ar: [
      {
        id: "ar-male-1",
        name: "أحمد - صوت ذكوري عميق",
        gender: "male",
        quality: "premium",
        voice: "Microsoft Naayf Online (Natural) - Arabic (Saudi Arabia)",
      },
      {
        id: "ar-female-1",
        name: "فاطمة - صوت أنثوي واضح",
        gender: "female",
        quality: "premium",
        voice: "Microsoft Zariyah Online (Natural) - Arabic (Saudi Arabia)",
      },
      {
        id: "ar-male-2",
        name: "محمد - صوت ذكوري هادئ",
        gender: "male",
        quality: "standard",
        voice: "Microsoft Hamed Online (Natural) - Arabic (Saudi Arabia)",
      },
      {
        id: "ar-female-2",
        name: "عائشة - صوت أنثوي دافئ",
        gender: "female",
        quality: "standard",
        voice: "Microsoft Salma Online (Natural) - Arabic (Saudi Arabia)",
      },
    ],
    en: [
      {
        id: "en-male-1",
        name: "David - Deep Male Voice",
        gender: "male",
        quality: "premium",
        voice: "Microsoft Guy Online (Natural) - English (United States)",
      },
      {
        id: "en-female-1",
        name: "Sarah - Clear Female Voice",
        gender: "female",
        quality: "premium",
        voice: "Microsoft Aria Online (Natural) - English (United States)",
      },
      {
        id: "en-male-2",
        name: "James - Calm Male Voice",
        gender: "male",
        quality: "standard",
        voice: "Microsoft Davis Online (Natural) - English (United States)",
      },
      {
        id: "en-female-2",
        name: "Emma - Warm Female Voice",
        gender: "female",
        quality: "standard",
        voice: "Microsoft Jenny Online (Natural) - English (United States)",
      },
    ],
}

export function HistoryAssistant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState("")
  const [selectedVoice, setSelectedVoice] = useState(voiceOptions.ar[0].id)
  const [speechRate, setSpeechRate] = useState(1.0)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [recentChatsExpanded, setRecentChatsExpanded] = useState(true)
  const [libraryExpanded, setLibraryExpanded] = useState(false)
  const [settingsExpanded, setSettingsExpanded] = useState(false)
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "الحضارة المصرية القديمة",
      lastMessage: "أخبرني عن الأهرامات",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      title: "الحرب العالمية الثانية",
      lastMessage: "متى انتهت الحرب؟",
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: "3",
      title: "الخلافة العباسية",
      lastMessage: "من هو هارون الرشيد؟",
      timestamp: new Date(Date.now() - 259200000),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const isRTL = language === "ar"
  const isFirstTime = messages.length === 0

  // --- CHANGE [3]: INTEGRATE React Query's useMutation hook for our API logic ---
  const mutation = useMutation<ApiResponse, Error, string>({
    mutationFn: sendMessageToApi,
    onSuccess: (data) => {
      // When the API call succeeds, create an AI message and add it to the chat
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply, // Use the real reply from the API
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    },
    onError: (error) => {
      // If the API call fails, create an error message and add it to the chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, something went wrong: ${error.message}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  // Initialize speech recognition
  useEffect(() => {
    // ... (This section is unchanged) ...
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = language === "ar" ? "ar-SA" : "en-US"

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = () => {
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [language])

  useEffect(() => {
    // ... (This section is unchanged) ...
    const savedTheme = localStorage.getItem("history-assistant-theme") as "light" | "dark" | "system" | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme("system")
    }
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    // ... (This section is unchanged) ...
    const root = document.documentElement

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", newTheme === "dark")
    }
  }

  useEffect(() => {
    // ... (This section is unchanged) ...
    const savedLanguage = localStorage.getItem("history-assistant-language")
    if (savedLanguage && ["ar", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage as "ar" | "en")
    }
  }, [])

  useEffect(() => {
    // ... (This section is unchanged) ...
    setSelectedVoice(voiceOptions[language][0].id)
  }, [language])

  useEffect(() => {
    // ... (This section is unchanged) ...
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleStartChat = () => {
    // ... (This section is unchanged) ...
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      content:
        language === "ar"
          ? "مرحباً! أنا مساعد التاريخ الذكي. يمكنني مساعدتك في استكشاف التاريخ والحضارات القديمة والأحداث التاريخية المهمة. ما الذي تود معرفته؟"
          : "Hello! I'm your intelligent History Assistant. I can help you explore history, ancient civilizations, and important historical events. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }

  const handleNewChat = () => {
    // ... (This section is unchanged) ...
    setMessages([])
    setInputValue("")
    setSidebarOpen(false)
  }

  // --- CHANGE [4]: MODIFY the handleSendMessage function to use our new API logic ---
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // 1. Create the user's message and add it to the UI immediately
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])

    // 2. Call the API using the mutation hook
    mutation.mutate(inputValue)

    // 3. Clear the input field
    setInputValue("")
  }

  const handleVoiceRecord = async () => {
    // ... (This section is unchanged for now) ...
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)

        audioChunksRef.current = []

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data)
          }
        }

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })

          const audioMessage: Message = {
            id: Date.now().toString(),
            content: language === "ar" ? "رسالة صوتية" : "Voice message",
            isUser: true,
            timestamp: new Date(),
            type: "audio",
            audioBlob: audioBlob,
          }

          setMessages((prev) => [...prev, audioMessage])
          stream.getTracks().forEach((track) => track.stop())

          setTimeout(() => {
            const aiResponse: Message = {
              id: (Date.now() + 1).toString(),
              content:
                language === "ar"
                  ? "شكراً لرسالتك الصوتية! سأقوم بالرد عليها..."
                  : "Thank you for your voice message! I'll respond to it...",
              isUser: false,
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, aiResponse])
          }, 1500)
        }

        recorder.start()
        setMediaRecorder(recorder)
        setIsRecording(true)
      } catch (error) {
        console.error("Error accessing microphone:", error)
      }
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop()
        setMediaRecorder(null)
      }
      setIsRecording(false)
    }
  }

  const handleSpeechToText = () => {
    // ... (This section is unchanged for now) ...
    if (recognition && !isListening) {
      recognition.lang = language === "ar" ? "ar-SA" : "en-US"
      recognition.start()
      setIsListening(true)
    } else if (recognition && isListening) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const handleFileUpload = () => {
    // ... (This section is unchanged for now) ...
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // ... (This section is unchanged for now) ...
    const file = event.target.files?.[0]
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        content: `${language === "ar" ? "تم رفع ملف:" : "File uploaded:"} ${file.name}`,
        isUser: true,
        timestamp: new Date(),
        type: file.type.startsWith("image/") ? "image" : "text",
      }

      setMessages((prev) => [...prev, fileMessage])
      event.target.value = ""
    }
  }

  const toggleLanguage = (newLanguage: "ar" | "en") => {
    // ... (This section is unchanged) ...
    setLanguage(newLanguage)
    localStorage.setItem("history-assistant-language", newLanguage)
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    // ... (This section is unchanged) ...
    setTheme(newTheme)
    localStorage.setItem("history-assistant-theme", newTheme)
    applyTheme(newTheme)
  }

  const handleCopyMessage = (content: string) => {
    // ... (This section is unchanged) ...
    navigator.clipboard.writeText(content)
  }

  const handleEditMessage = (messageId: string, content: string) => {
    // ... (This section is unchanged) ...
    setEditingMessageId(messageId)
    setEditingContent(content)
  }

  const handleSaveEdit = () => {
    // ... (This section is unchanged) ...
    if (editingMessageId && editingContent.trim()) {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === editingMessageId ? { ...msg, content: editingContent } : msg)),
      )
      setEditingMessageId(null)
      setEditingContent("")
    }
  }

  const handleCancelEdit = () => {
    // ... (This section is unchanged) ...
    setEditingMessageId(null)
    setEditingContent("")
  }

  const handleDeleteMessage = (messageId: string) => {
    // ... (This section is unchanged) ...
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
  }

  const handleShareMessage = (content: string) => {
    // ... (This section is unchanged) ...
    if (navigator.share) {
      navigator.share({
        title: language === "ar" ? "رسالة من مساعد التاريخ" : "Message from History Assistant",
        text: content,
      })
    } else {
      handleCopyMessage(content)
    }
  }

  const handleLikeMessage = (messageId: string) => {
    // ... (This section is unchanged) ...
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, liked: !msg.liked, disliked: false } : msg)),
    )
  }

  const handleDislikeMessage = (messageId: string) => {
    // ... (This section is unchanged) ...
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, disliked: !msg.disliked, liked: false } : msg)),
    )
  }

  const handlePlayMessage = (content: string) => {
    // ... (This section is unchanged) ...
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(content)
      utterance.lang = language === "ar" ? "ar-SA" : "en-US"
      utterance.rate = speechRate

      const voices = speechSynthesis.getVoices()
      const selectedVoiceOption = voiceOptions[language].find((v) => v.id === selectedVoice)

      if (selectedVoiceOption) {
        const matchingVoice = voices.find(
          (voice) =>
            voice.name.includes(selectedVoiceOption.voice.split(" - ")[0].replace("Microsoft ", "")) ||
            (language === "ar" && voice.lang.startsWith("ar")) ||
            (language === "en" && voice.lang.startsWith("en")),
        )

        if (matchingVoice) {
          utterance.voice = matchingVoice
        }
      }

      speechSynthesis.speak(utterance)
    }
  }
  
  // The rest of the file (all the JSX) is completely unchanged.
  // We just need to add the 'disabled' prop to the input and send button.
  const sidebarContent = (
    // ... (This section is unchanged) ...
    <div className="h-full flex flex-col bg-background/95 backdrop-blur-sm">
      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search
            className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
          />
          <Input
            placeholder={language === "ar" ? "البحث في المحادثات..." : "Search conversations..."}
            className={`${isRTL ? "pr-10" : "pl-10"} bg-background/50 border-border/50 backdrop-blur-sm`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 hover:from-blue-600 hover:to-violet-600 shadow-lg"
          onClick={handleNewChat}
        >
          <Plus className="h-4 w-4" />
          {language === "ar" ? "محادثة جديدة" : "New Chat"}
        </Button>
      </div>

      <Separator className="my-4 bg-border/50" />

      {/* Expandable Menu Items */}
      <div className="flex-1 px-4 space-y-2 custom-scrollbar overflow-y-auto">
        {/* Recent Chats */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-accent/50 transition-all duration-200"
            onClick={() => setRecentChatsExpanded(!recentChatsExpanded)}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              {language === "ar" ? "المحادثات السابقة" : "Recent Chats"}
            </div>
            {recentChatsExpanded ? (
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            )}
          </Button>

          {recentChatsExpanded && (
            <div className="mt-2 space-y-2 pl-6 animate-in slide-in-from-top-2 duration-200">
              {chatSessions.map((session) => (
                <Card
                  key={session.id}
                  className="p-3 cursor-pointer hover:bg-accent/30 transition-all duration-200 bg-background/30 border-border/30 backdrop-blur-sm hover:shadow-md"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium line-clamp-1 text-foreground">{session.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{session.lastMessage}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {session.timestamp.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US")}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Library */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-accent/50 transition-all duration-200"
            onClick={() => setLibraryExpanded(!libraryExpanded)}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-violet-500" />
              {language === "ar" ? "المكتبة" : "Library"}
            </div>
            {libraryExpanded ? (
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            )}
          </Button>

          {libraryExpanded && (
            <div className="mt-2 space-y-1 pl-6 animate-in slide-in-from-top-2 duration-200">
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs hover:bg-accent/30">
                <FileText className="h-3 w-3 mr-2" />
                {language === "ar" ? "الكتب المحفوظة" : "Saved Books"}
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs hover:bg-accent/30">
                <History className="h-3 w-3 mr-2" />
                {language === "ar" ? "المقالات المفضلة" : "Favorite Articles"}
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs hover:bg-accent/30">
                <Sparkles className="h-3 w-3 mr-2" />
                {language === "ar" ? "الملاحظات" : "Notes"}
              </Button>
            </div>
          )}
        </div>

        {/* Settings */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-accent/50 transition-all duration-200"
            onClick={() => setSettingsExpanded(!settingsExpanded)}
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-blue-600" />
              {language === "ar" ? "الإعدادات" : "Settings"}
            </div>
            {settingsExpanded ? (
              <ChevronDown className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            )}
          </Button>

          {settingsExpanded && (
            <div className="mt-2 space-y-1 pl-6 animate-in slide-in-from-top-2 duration-200">
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs hover:bg-accent/30">
                <Volume2 className="h-3 w-3 mr-2" />
                {language === "ar" ? "تفضيلات الصوت" : "Voice Preferences"}
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs hover:bg-accent/30">
                <Settings className="h-3 w-3 mr-2" />
                {language === "ar" ? "إعدادات الخصوصية" : "Privacy Settings"}
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs hover:bg-accent/30">
                <Upload className="h-3 w-3 mr-2" />
                {language === "ar" ? "النسخ الاحتياطي" : "Backup & Sync"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (isFirstTime) {
    return (
        // ... (This section is unchanged) ...
      <div
        className={`h-screen flex bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-blue-950/20 dark:via-background dark:to-violet-950/20 historical-bg ${isRTL ? "rtl" : "ltr"}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div
              className={`absolute top-0 ${isRTL ? "right-0" : "left-0"} h-full w-80 bg-background/95 backdrop-blur-md border-${isRTL ? "l" : "r"} border-border/50`}
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h2 className="font-semibold">{language === "ar" ? "المحادثات" : "Conversations"}</h2>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 border-r border-border/50 bg-background/80 backdrop-blur-md">
          {sidebarContent}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center shadow-lg">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-serif font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  {language === "ar" ? "مساعد التاريخ" : "History Assistant"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/50">
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline">{language === "ar" ? "العربية" : "English"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-border/50">
                  <DropdownMenuItem onClick={() => toggleLanguage("ar")}>
                    <div className="flex items-center justify-between w-full">
                      العربية
                      {language === "ar" && <Check className="h-4 w-4 text-blue-500" />}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleLanguage("en")}>
                    <div className="flex items-center justify-between w-full">
                      English
                      {language === "en" && <Check className="h-4 w-4 text-blue-500" />}
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-accent/50">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-border/50">
                  <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    <div className="flex items-center justify-between w-full">
                      {language === "ar" ? "فاتح" : "Light"}
                      {theme === "light" && <Check className="h-4 w-4 text-blue-500" />}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                    <div className="flex items-center justify-between w-full">
                      {language === "ar" ? "داكن" : "Dark"}
                      {theme === "dark" && <Check className="h-4 w-4 text-blue-500" />}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                    <div className="flex items-center justify-between w-full">
                      {language === "ar" ? "النظام" : "System"}
                      {theme === "system" && <Check className="h-4 w-4 text-blue-500" />}
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Welcome Screen */}
          <div className="flex-1 flex items-center justify-center p-8 parchment-texture">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              {/* Historical Illustration */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center shadow-2xl">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-violet-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Welcome Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-blue-800 bg-clip-text text-transparent">
                  {language === "ar" ? "مرحباً بك في مساعد التاريخ" : "Welcome to History Assistant"}
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  {language === "ar"
                    ? "اكتشف عجائب التاريخ معي! يمكنني مساعدتك في استكشاف الحضارات القديمة، الأحداث التاريخية المهمة، والشخصيات التي غيرت مجرى التاريخ."
                    : "Discover the wonders of history with me! I can help you explore ancient civilizations, important historical events, and the personalities who changed the course of history."}
                </p>
              </div>

              {/* Capabilities */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <History className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {language === "ar" ? "استكشاف التاريخ" : "Explore History"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar"
                        ? "اكتشف الحضارات والأحداث التاريخية"
                        : "Discover civilizations and historical events"}
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
                      <Volume2 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {language === "ar" ? "تفاعل صوتي" : "Voice Interaction"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar"
                        ? "تحدث واستمع بالعربية والإنجليزية"
                        : "Speak and listen in Arabic and English"}
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-background/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-violet-500 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {language === "ar" ? "محتوى متعدد الوسائط" : "Rich Media"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "ar" ? "شارك الصور والملفات التاريخية" : "Share images and historical documents"}
                    </p>
                  </div>
                </Card>
              </div>

              {/* Start Chat Button */}
              <div className="pt-8">
                <Button
                  onClick={handleStartChat}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg font-semibold"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  {language === "ar" ? "ابدأ المحادثة" : "Start Chat"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
        // ... (This section is unchanged) ...
      className={`h-screen flex bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-blue-950/20 dark:via-background dark:to-violet-950/20 historical-bg ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div
            className={`absolute top-0 ${isRTL ? "right-0" : "left-0"} h-full w-80 bg-background/95 backdrop-blur-md border-${isRTL ? "l" : "r"} border-border/50`}
          >
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h2 className="font-semibold">{language === "ar" ? "المحادثات" : "Conversations"}</h2>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 border-r border-border/50 bg-background/80 backdrop-blur-md">
        {sidebarContent}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-md">
            {/* ... (This section is unchanged) ... */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center shadow-lg">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-serif font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                {language === "ar" ? "مساعد التاريخ" : "History Assistant"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/50">
                  <Volume2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === "ar" ? "الصوت" : "Voice"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-background/95 backdrop-blur-md border-border/50">
                <div className="p-2">
                  <h4 className="text-sm font-medium mb-2">{language === "ar" ? "اختيار الصوت" : "Voice Selection"}</h4>
                  {voiceOptions[language].map((voice) => (
                    <DropdownMenuItem
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className="flex items-center justify-between p-2 hover:bg-accent/30"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">{voice.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {voice.quality === "premium"
                            ? language === "ar"
                              ? "جودة عالية"
                              : "Premium Quality"
                            : language === "ar"
                              ? "جودة عادية"
                              : "Standard Quality"}
                        </span>
                      </div>
                      {selectedVoice === voice.id && <Check className="h-4 w-4 text-blue-500" />}
                    </DropdownMenuItem>
                  ))}
                </div>

                <DropdownMenuSeparator />

                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-4 w-4" />
                    <span className="text-sm font-medium">{language === "ar" ? "سرعة القراءة" : "Reading Speed"}</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={speechRate}
                      onChange={(e) => setSpeechRate(Number.parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{language === "ar" ? "بطيء" : "Slow"}</span>
                      <span>{speechRate.toFixed(1)}x</span>
                      <span>{language === "ar" ? "سريع" : "Fast"}</span>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent/50">
                  <Languages className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === "ar" ? "العربية" : "English"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-border/50">
                <DropdownMenuItem onClick={() => toggleLanguage("ar")}>
                  <div className="flex items-center justify-between w-full">
                    العربية
                    {language === "ar" && <Check className="h-4 w-4 text-blue-500" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleLanguage("en")}>
                  <div className="flex items-center justify-between w-full">
                    English
                    {language === "en" && <Check className="h-4 w-4 text-blue-500" />}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-accent/50">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-border/50">
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                  <div className="flex items-center justify-between w-full">
                    {language === "ar" ? "فاتح" : "Light"}
                    {theme === "light" && <Check className="h-4 w-4 text-blue-500" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                  <div className="flex items-center justify-between w-full">
                    {language === "ar" ? "داكن" : "Dark"}
                    {theme === "dark" && <Check className="h-4 w-4 text-blue-500" />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                  <div className="flex items-center justify-between w-full">
                    {language === "ar" ? "النظام" : "System"}
                    {theme === "system" && <Check className="h-4 w-4 text-blue-500" />}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
                // ... (This section is unchanged) ...
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? (isRTL ? "flex-row" : "flex-row-reverse") : isRTL ? "flex-row-reverse" : "flex-row"}`}
                onMouseEnter={() => setHoveredMessageId(message.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback
                    className={
                      message.isUser
                        ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg"
                        : "bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-lg"
                    }
                  >
                    {message.isUser ? (language === "ar" ? "أ" : "U") : language === "ar" ? "م" : "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[80%] space-y-2">
                  <Card
                    className={`p-4 transition-all duration-200 ${
                      message.isUser
                        ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 shadow-lg"
                        : "bg-background/80 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {editingMessageId === message.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="bg-background/20 border-white/20 text-inherit"
                          onKeyPress={(e) => e.key === "Enter" && handleSaveEdit()}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" onClick={handleSaveEdit}>
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="secondary" onClick={handleCancelEdit}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {message.type === "audio" && message.audioBlob ? (
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4" />
                            <audio controls className="flex-1">
                              <source src={URL.createObjectURL(message.audioBlob)} type="audio/wav" />
                            </audio>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                        <p className={`text-xs mt-2 ${message.isUser ? "text-blue-100" : "text-muted-foreground"}`}>
                          {message.timestamp.toLocaleTimeString(language === "ar" ? "ar-SA" : "en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </>
                    )}
                  </Card>

                  {editingMessageId !== message.id && (
                    <div
                      className={`flex items-center gap-1 message-actions ${
                        hoveredMessageId === message.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-1 pointer-events-none"
                      } ${message.isUser ? (isRTL ? "justify-start" : "justify-end") : isRTL ? "justify-end" : "justify-start"}`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyMessage(message.content)}
                        className="h-6 w-6 p-0 hover:bg-accent/50 transition-colors duration-200"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>

                      {message.isUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMessage(message.id, message.content)}
                          className="h-6 w-6 p-0 hover:bg-accent/50 transition-colors duration-200"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMessage(message.id)}
                        className="h-6 w-6 p-0 hover:bg-accent/50 transition-colors duration-200"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShareMessage(message.content)}
                        className="h-6 w-6 p-0 hover:bg-accent/50 transition-colors duration-200"
                      >
                        <Share className="h-3 w-3" />
                      </Button>

                      {!message.isUser && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePlayMessage(message.content)}
                            className="h-6 w-6 p-0 hover:bg-accent/50 transition-colors duration-200"
                          >
                            <Volume2 className="h-3 w-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikeMessage(message.id)}
                            className={`h-6 w-6 p-0 hover:bg-accent/50 transition-colors duration-200 ${message.liked ? "text-blue-500" : ""}`}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDislikeMessage(message.id)}
                            className={`h-6 w-6 p-0 hover:bg-accent/50 transition-colors duration-200 ${message.disliked ? "text-violet-500" : ""}`}
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-accent/50 transition-colors duration-200"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-border/50">
                          <DropdownMenuItem onClick={() => handleCopyMessage(message.content)}>
                            <Copy className="h-4 w-4 mr-2" />
                            {language === "ar" ? "نسخ" : "Copy"}
                          </DropdownMenuItem>
                          {message.isUser && (
                            <DropdownMenuItem onClick={() => handleEditMessage(message.id, message.content)}>
                              <Edit3 className="h-4 w-4 mr-2" />
                              {language === "ar" ? "تعديل" : "Edit"}
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {language === "ar" ? "حذف" : "Delete"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border/50 bg-gradient-to-r from-blue-50/50 to-violet-50/50 dark:from-blue-950/10 dark:to-violet-950/10 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={language === "ar" ? "اسأل عن التاريخ..." : "Ask about history..."}
                  className={`${isRTL ? "pr-12" : "pl-12"} bg-background/80 backdrop-blur-sm border-border/50 focus:border-violet-400 dark:focus:border-violet-600 shadow-sm`}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  // --- CHANGE [5]: Disable input while AI is thinking ---
                  disabled={mutation.isPending}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute ${isRTL ? "right-1" : "left-1"} top-1/2 transform -translate-y-1/2 hover:bg-accent/50`}
                  onClick={handleFileUpload}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSpeechToText}
                className={`transition-all duration-200 ${
                  isListening
                    ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 shadow-lg"
                    : "border-border/50 hover:bg-accent/50 bg-background/80 backdrop-blur-sm"
                }`}
              >
                {isListening ? <Pause className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleVoiceRecord}
                className={`transition-all duration-200 ${
                  isRecording
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600 shadow-lg"
                    : "border-border/50 hover:bg-accent/50 bg-background/80 backdrop-blur-sm"
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <Button
                onClick={handleSendMessage}
                // --- CHANGE [6]: Disable button while AI is thinking ---
                disabled={!inputValue.trim() || mutation.isPending}
                className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                {mutation.isPending ? (
                  // Show a loading indicator
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,audio/*,.pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}