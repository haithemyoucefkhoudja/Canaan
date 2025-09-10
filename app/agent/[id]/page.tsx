import React from "react";
import MessageListWrapper from "@/components/agent/message-list";

async function AgentConvPage({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const newChat = typeof searchParams.newChat == "string" ? true : false;
	console.log("🚀 ~ AgentConvPage ~ newChat:", newChat);
	return (
		<MessageListWrapper newChatParam={newChat} conversationId={params.id} />
	);
}

export default AgentConvPage;
