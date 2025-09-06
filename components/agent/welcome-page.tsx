"use client";
import { BookOpen, Sparkles } from "lucide-react";
import React, { useEffect } from "react";
import { ChatInput } from "./input";
import { useChat, useInput } from "@/providers/chat-provider";

function WelcomePage() {
	const { setMessages, setConversation, newChatStarter } = useChat();
	const { emptyInput } = useInput();
	useEffect(() => {
		newChatStarter(emptyInput);
	}, []);
	return (
		<main className="h-full w-full">
			<div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-md">
				{/* Welcome Screen */}
				<div className="flex-1 flex items-center justify-center p-8 ">
					<div className="max-w-2xl mx-auto text-center space-y-8">
						{/* Historical Illustration */}
						<div className="relative">
							<div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl  ">
								<BookOpen className="h-16 w-16 " />
							</div>
							<div className="absolute -top-2 -right-2 w-8 h-8  rounded-full flex items-center justify-center">
								<Sparkles className="h-4 w-4 " />
							</div>
						</div>

						{/* Welcome Title */}
						<div className="space-y-4">
							<h1 className="text-4xl md:text-5xl font-serif font-bold  text-primary">
								Welcome to History Assistant
							</h1>
							<p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
								Discover the wonders of Palastenian history with me! I can help
								you explore important historical events, and the personalities
								who changed the course of this place history.
							</p>
						</div>

						{/* Capabilities */}

						{/* Start Chat Button */}
						<div className="pt-8">
							<ChatInput disableWrapper />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default WelcomePage;
