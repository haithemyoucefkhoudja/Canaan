"use server";

import { StoreMessageResponse } from "@/types/Message";
import { supabase } from "./supabase";
import { Message, Conversation } from "@prisma/client";

export async function createConversationDB(params: {
	userId: string;
	title: string;
}): Promise<Conversation> {
	const { userId, title } = params;
	const { data, error } = await supabase
		.from("conversation")
		.insert({ user_id: userId, title: title, is_public: false })
		.select("*")
		.single();
	if (error) throw new Error(`Could not create conversation: ${error.message}`);
	return data;
}

/**
 * Stores a message in the database.
 * If conversationId is not provided, it creates a new conversation.
 *
 * @param userId - The ID of the user creating the message.
 * @param messageData - The message object to store.
 * @param conversationId - Optional ID of an existing conversation.
 * @returns The newly created message object from the database.
 */
export async function storeMessage(
	userId: string,
	messageData: Omit<Message, "id" | "created_at" | "updated_at">
): Promise<StoreMessageResponse> {
	const conversationId = messageData.conversation_id;
	const { error: checkError } = await supabase
		.from("conversation")
		.select("id", { count: "exact" }) // More efficient check
		.eq("id", conversationId)
		.eq("user_id", userId);
	if (checkError) throw new Error("Conversation not found or access denied.");

	const messageToInsert = { ...messageData, conversation_id: conversationId };
	const { data: newMessage, error: messageError } = await supabase
		.from("message")
		.insert(messageToInsert)
		.select("*")
		.single();
	if (messageError)
		throw new Error(`Could not save your message: ${messageError.message}`);
	return { message_id: newMessage.id, conversation_id: conversationId };
}

/**
 * Fetches all conversations for a specific user, with pagination.
 *
 * @param userId - The ID of the user whose conversations to fetch.
 * @param page - The page number to retrieve (0-indexed).
 * @param pageSize - The number of conversations per page.
 * @returns A list of the user's conversations.
 */
export async function getConversations(
	userId: string,
	page = 0,
	pageSize = 15
): Promise<Conversation[]> {
	const { data, error } = await supabase
		.from("conversation")
		.select("*") // Select all fields to match the Prisma 'Conversation' type
		.eq("user_id", userId)
		.order("updated_at", { ascending: false })
		.range(page * pageSize, (page + 1) * pageSize - 1);

	if (error) throw new Error(`Could not load conversations: ${error.message}`);
	return data;
}

/**
 * Fetches all messages for a specific conversation belonging to a user.
 *
 * @param userId - The ID of the user requesting the messages.
 * @param conversationId - The ID of the conversation to fetch.
 * @returns A list of messages in the conversation.
 */
export async function getMessages(
	userId: string,
	conversationId: string
): Promise<Message[]> {
	const { error: checkError } = await supabase
		.from("conversation")
		.select("id", { count: "exact" })
		.eq("id", conversationId)
		.eq("user_id", userId);
	if (checkError) throw new Error("Conversation not found or access denied.");

	const { data, error } = await supabase
		.from("message")
		.select("*")
		.eq("conversation_id", conversationId)
		.order("created_at", { ascending: true });
	if (error) throw new Error(`Could not load messages: ${error.message}`);
	return data;
}

/**
 * Updates an existing message's content.
 *
 * @param userId - The ID of the user making the edit.
 * @param messageId - The ID of the message to edit.
 * @param messageData - The message object to store.
 * @returns The updated message object.
 */
export async function editMessage(
	userId: string,
	messageId: string,
	messageData: Omit<Message, "id" | "created_at" | "updated_at">
): Promise<Message> {
	// 1. Verify the user owns the message via its conversation.
	const { data: message, error: fetchError } = await supabase
		.from("message")
		.select("id, conversation:conversation_id(user_id)")
		.eq("id", messageId)
		.single();
	if (
		fetchError ||
		!message ||
		(message.conversation as any)?.user_id !== userId
	) {
		throw new Error("You do not have permission to edit this message.");
	}

	// 2. If verification passes, update the message content.
	const { data: updatedMessage, error: updateError } = await supabase
		.from("message")
		.update({ ...messageData })
		.eq("id", messageId)
		.select("*") // Return the full message object
		.single();
	if (updateError)
		throw new Error(`Could not update the message: ${updateError.message}`);
	return updatedMessage;
}

/**
 * Deletes a conversation and all its associated messages.
 *
 * @param userId - The ID of the user deleting the conversation.
 * @param conversationId - The ID of the conversation to delete.
 */
export async function deleteConversation(
	userId: string,
	conversationId: string
): Promise<void> {
	const { error } = await supabase
		.from("conversation")
		.delete()
		.eq("user_id", userId)
		.eq("id", conversationId);
	if (error)
		throw new Error(`Could not delete the conversation: ${error.message}`);
}
