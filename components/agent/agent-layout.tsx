"use client";
import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import {
	Search,
	Plus,
	BookOpen,
	Settings,
	X,
	Volume2,
	ChevronDown,
	ChevronRight,
	MessageSquare,
	Clock,
} from "lucide-react";
import AgentHeader from "./header";
import { ConversationList } from "./conversation-list";

interface ChatSession {
	id: string;
	title: string;
	lastMessage: string;
	timestamp: Date;
}
function AgentWrapper({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		// ... (This section is unchanged) ...
		<div className="h-screen flex">
			{/* Mobile Sidebar Overlay */}
			{sidebarOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					<div
						className="absolute inset-0 bg-black/50"
						onClick={() => setSidebarOpen(false)}
					/>
					<div
						className={`absolute top-0 left-0  h-full w-80 bg-background/95 backdrop-blur-md border-l border-border/50`}
					>
						<div className="flex items-center justify-between p-4 border-b border-border/50">
							<h2 className="font-semibold">Conversations</h2>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setSidebarOpen(false)}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
						<SidebarContent></SidebarContent>
					</div>
				</div>
			)}

			{/* Desktop Sidebar */}
			<div className="hidden lg:block w-80 border-r border-border/50 bg-background/80 backdrop-blur-md">
				<SidebarContent />
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				<AgentHeader />
				{children}
			</div>
		</div>
	);
}
function SidebarContent() {
	const [recentChatsExpanded, setRecentChatsExpanded] = useState(true);
	const [libraryExpanded, setLibraryExpanded] = useState(false);
	const [settingsExpanded, setSettingsExpanded] = useState(false);

	return (
		// ... (This section is unchanged) ...
		<div className="h-full flex flex-col bg-background/95 backdrop-blur-sm">
			{/* Search Bar */}
			<div className="p-4">
				<div className="relative">
					<Search
						className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`}
					/>
					<Input
						placeholder="Search conversations..."
						className="bg-background/50 border-border/50 backdrop-blur-sm"
					/>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="px-4 space-y-2">
				<Button
					variant="outline"
					className="w-full justify-start gap-2 shadow-lg"
					onClick={() => {}}
				>
					<Plus className="h-4 w-4" />
					New Chat
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
							<MessageSquare className="h-4 w-4 " />
							Recent Chats
						</div>
						{recentChatsExpanded ? (
							<ChevronDown className="h-4 w-4 transition-transform duration-200" />
						) : (
							<ChevronRight className="h-4 w-4 transition-transform duration-200" />
						)}
					</Button>

					{recentChatsExpanded && (
						<div className="mt-2 space-y-2 pl-6 animate-in slide-in-from-top-2 duration-200">
							<ConversationList />
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
							<BookOpen className="h-4 w-4 " />
							Library
						</div>
						{libraryExpanded ? (
							<ChevronDown className="h-4 w-4 transition-transform duration-200" />
						) : (
							<ChevronRight className="h-4 w-4 transition-transform duration-200" />
						)}
					</Button>

					{libraryExpanded && (
						<div className="mt-2 space-y-1 pl-6 animate-in slide-in-from-top-2 duration-200">
							{/* <Button
								variant="ghost"
								size="sm"
								className="w-full justify-start text-xs hover:bg-accent/30"
							>
								<FileText className="h-3 w-3 mr-2" />
								{language === "ar" ? "الكتب المحفوظة" : "Saved Books"}
							</Button> */}
							{/* <Button
								variant="ghost"
								size="sm"
								className="w-full justify-start text-xs hover:bg-accent/30"
							>
								<History className="h-3 w-3 mr-2" />
								{language === "ar" ? "المقالات المفضلة" : "Favorite Articles"}
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="w-full justify-start text-xs hover:bg-accent/30"
							>
								<Sparkles className="h-3 w-3 mr-2" />
								{language === "ar" ? "الملاحظات" : "Notes"}
							</Button> */}
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
							<Settings className="h-4 w-4 " />
							Settings
						</div>
						{settingsExpanded ? (
							<ChevronDown className="h-4 w-4 transition-transform duration-200" />
						) : (
							<ChevronRight className="h-4 w-4 transition-transform duration-200" />
						)}
					</Button>

					{settingsExpanded && (
						<div className="mt-2 space-y-1 pl-6 animate-in slide-in-from-top-2 duration-200">
							<Button
								variant="ghost"
								size="sm"
								className="w-full justify-start text-xs hover:bg-accent/30"
							>
								<Volume2 className="h-3 w-3 mr-2" />
								Voice Preferences
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="w-full justify-start text-xs hover:bg-accent/30"
							>
								<Settings className="h-3 w-3 mr-2" />
								Privacy Settings
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default AgentWrapper;
