import { Document } from "langchain/document";
import { TAttachment } from "./attachment";
export type Message = {
  suggestions?: any;
  id: string;
  reasoning?: string;
  content: string;
  role: "user" | "assistant";
  sources?: Document[];
  timestamp: string;
  conversation_id?: number;
  attachments?: TAttachment[];
  isLoading?: boolean;
  action?: string;
};
export type HiddenMessage = Message & {
  hidden: boolean;
};
export type StoreMessageResponse = {
  message_id: number;
  conversation_id: number;
};
