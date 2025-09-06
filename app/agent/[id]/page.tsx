import React from "react";
import MessageListWrapper from "@/components/agent/message-list";

async function AgentConvPage({ params }: { params: { id: string } }) {
	return <MessageListWrapper conversationId={params.id} />;
}

export default AgentConvPage;
