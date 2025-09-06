"use client";
import MessageBox from "./message-box";
import { memo, useEffect } from "react";
import { ListScrollArea } from "../ui/list-scroll-area";
import { useChat } from "@/providers/chat-provider";
import { ChatInput } from "./input";
import { useAuth } from "../firebase-auth/AuthContext";
import { Error, NotFound } from "../error-handlers";
import { MessageExtra } from "@/types/Message";
import { Loader } from "../ui/loader";
import { useGetMessages } from "@/hooks/use-messages-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type MessageListWrapperProps = {
	conversationId: string;
	newChatParam: boolean;
};
type MessageListProps = {
	queryMessages: MessageExtra[];
};
const MessageList = memo(function MessageList({
	queryMessages,
}: MessageListProps) {
	const { messages, setMessages, rewrite } = useChat();
	useEffect(() => {
		if (messages.length !== 0) return;

		setMessages(queryMessages);
	}, [queryMessages]);
	return (
		<main className="flex-1 flex flex-col">
			<div className="w-full h-[calc(100dvh-16.5rem)] overflow-hidden px-2">
				<ListScrollArea className="h-full">
					<div className="mx-auto p-2 block">
						{messages.map((message, index) => (
							<div key={message.id + index} className="w-full py-4 px-2">
								<MessageBox
									rewrite={rewrite}
									message={message}
									messageIndex={index}
									type="list"
								/>
							</div>
						))}
					</div>
				</ListScrollArea>
			</div>
			<ChatInput />
		</main>
	);
});
const MessageListWrapper = memo(function MessageListWrapper({
	conversationId,
	newChatParam,
}: MessageListWrapperProps) {
	const { user } = useAuth();
	const { messages, setConversation, isNewChat, setIsNewChat } = useChat();
	const router = useRouter();
	// 2. Use the 'enabled' option to conditionally fire the query.
	//    The query will not run until 'user' exists.
	const {
		data: fetchedMessages = [], // Use a better name and provide a default
		isLoading,
		isError,
		error,
		isSuccess,
	} = useGetMessages(conversationId);
	useEffect(() => {
		if (!isSuccess) return;

		const title = fetchedMessages.length > 0 ? "notSet" : "New Conversation";
		setConversation((prev) =>
			!prev
				? { id: conversationId, title }
				: { ...prev, id: conversationId, title }
		);

		// Set new chat state based on parameter and message count
		setIsNewChat(newChatParam && fetchedMessages.length === 0);
	}, [
		isSuccess,
		fetchedMessages.length,
		conversationId,
		newChatParam,
		setConversation,
		setIsNewChat,
	]);

	useEffect(() => {
		if (isSuccess && fetchedMessages.length === 0 && !newChatParam) {
			toast.error(`There's no Conversation with ID: ${conversationId}`);
			router.push("/agent");
		}
	}, [isSuccess, fetchedMessages.length, newChatParam, conversationId]);

	if (isLoading) {
		return <Loader size="lg" />;
	}

	if (isError) {
		return <Error message={error.message} />;
	}
	// 5. If we reach this point, the query was successful and fetchedMessages are available.
	// However, the component might still render for a frame before the redirect happens.
	// To prevent a flicker, we can add a final check.
	if (
		(!fetchedMessages || fetchedMessages.length === 0) &&
		messages.length == 0
	) {
		// Render a loader or null while the redirect is happening.
		return <Loader size="lg" />;
	}
	return <MessageList queryMessages={fetchedMessages} />;
});

export default MessageListWrapper;
