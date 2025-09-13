import type React from "react";
import { Fragment, memo, useMemo, useRef } from "react";
import { AutosizeTextarea } from "../ui/auto-size-textarea";
import { Button } from "../ui/button";

import { v4 as uuid } from "uuid";
import {
	ArrowUpIcon,
	Brain,
	FileIcon,
	GlobeIcon,
	ImageIcon,
	XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	useAttachments,
	useSearchMode,
	useInput,
} from "@/providers/input-provider";
import { Square as StopIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { useAsyncRoutePush } from "@/hooks/use-async-push";
import { useChat } from "@/providers/chat-provider";

const Attachements = memo(() => {
	const { attachments, removeAttachment } = useAttachments();
	const { isLoading } = useChat();
	return (
		<div className="mb-3 pb-1">
			{/* <div className="flex space-x-3 overflow-x-auto scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-accent pb-2">
			 */}
			<ScrollArea className={cn(attachments.length > 0 && "py-2")}>
				<ScrollBar orientation="horizontal" />
				<div className={cn("flex space-x-3", attachments.length > 0 && "p-2")}>
					{attachments.length > 0 &&
						attachments.map((item) => (
							<div
								key={item.id}
								className={cn(
									"relative group w-20 h-fit flex-shrink-0 p-2 rounded-lg border",
									"flex flex-col items-center justify-between",
									"bg-card border-border text-card-foreground"
								)}
							>
								<div className="w-10 h-10 flex items-center justify-center mb-1 overflow-hidden rounded-md ">
									{item.previewUrl ? (
										<img
											src={item.previewUrl}
											alt={item.file.name}
											className="w-full h-full object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105"
										/>
									) : (
										<FileIcon className="w-10 h-10 text-muted-foreground" />
									)}
								</div>
								<div className="w-full text-center">
									<p className="text-xs truncate w-full" title={item.file.name}>
										{item.file.name}
									</p>
								</div>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className={cn(
										"absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity",
										"hover:bg-destructive/90"
									)}
									onClick={() => removeAttachment(item.id)}
									disabled={isLoading.state}
									aria-label={`Remove ${item.file.name}`}
								>
									<XIcon className="h-3 w-3" />
								</Button>
							</div>
						))}
				</div>
			</ScrollArea>
		</div>
	);
});
const Textarea = memo(() => {
	const { input, setInput, emptyInput } = useInput();
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const { isLoading, handleFormSubmit } = useChat();
	const { attachments, addAttachment } = useAttachments();
	const { searchMode } = useSearchMode();
	const push = useAsyncRoutePush();

	const handleKeyDown = async (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && e.ctrlKey) {
			e.preventDefault();

			handleFormSubmit(input, attachments, searchMode, emptyInput);
		}
		if (e.ctrlKey && e.key === "v") {
			e.preventDefault();
			const clipboardItems = await navigator.clipboard.read();
			for (const item of clipboardItems) {
				if (item.types.some((type) => type.includes("image"))) {
					const blob = await item.getType(
						item.types.find((type) => type.includes("image"))!
					);
					const file = new File(
						[blob],
						`clipboard-image.${
							item.types.find((type) => type.includes("image"))!.split("/")[1]
						}`,
						{
							type: `image/${
								item.types.find((type) => type.includes("image"))!.split("/")[1]
							}`,
						}
					);
					addAttachment({
						id: uuid(),
						file,
						previewUrl: URL.createObjectURL(file),
					});
					break;
				}
				if (item.types.some((type) => type.includes("text/plain"))) {
					const type = item.types.find((type) => type.includes("text/plain"));
					const text = await (await item.getType(type as string)).text();
					console.log("🚀 ~ handleKeyDown ~ text:", text);

					if (text) {
						setInput((prev) => prev + ` ${text}`);
					}

					break;
				}
			}
		}
	};
	return (
		<AutosizeTextarea
			ref={(ref) => {
				if (ref) {
					(textareaRef as any).current = ref.textArea;
				}
			}}
			disabled={isLoading.state}
			value={input}
			onChange={(e) => setInput(e.target.value)}
			maxHeight={150}
			placeholder="Message Chat Bot"
			className={cn(
				"w-full text-foreground placeholder:text-muted-foreground  ",
				"bg-transparent", // Textarea itself is transparent, wrapper has bg
				"px-3 py-3  resize-none", // Standard padding
				"focus:outline-none", // Focus ring handled by wrapper
				"border-none focus-visible:ring-0 focus-visible:ring-offset-0" // Remove default textarea border/ring
			)}
			onKeyDown={handleKeyDown}
			rows={1}
		/>
	);
});
const HiddenFileInput = memo(function HiddenFileInput() {
	const { handleFileChange, fileInputRef } = useAttachments();
	const { isLoading } = useChat();
	return (
		<input
			ref={fileInputRef}
			type="file"
			multiple
			onChange={handleFileChange}
			className="hidden"
			accept="image/*"
			disabled={isLoading.state}
		/>
	);
});
export const ChatInput = memo(function ChatInput({
	disableWrapper,
}: {
	disableWrapper?: boolean;
}) {
	return (
		<div
			className={cn(
				!disableWrapper &&
					" relative h-48    bg-background text-foreground  mx-auto  w-full"
			)}
		>
			<div
				className={cn(
					!disableWrapper && " px-4 pt-3 pb-4 absolute bottom-0  w-full  "
				)}
			>
				<div className="border max-w-3xl  rounded-xl p-4 bg-background text-foreground mx-auto ">
					<div className="relative ">
						<Attachements />
						<div className="">
							<div className="flex justify-between flex-col space-y-3 ">
								<div className="relative flex items-center space-x-2 px-3 py  ">
									<div className="flex flex-col space-y-2 flex-1 relative">
										{/* <AutosizeTextarea
                  ref={(ref) => {
                    if (ref) {
                      (textareaRef as any).current = ref.textArea;
                    }
                  }}
                  disabled={isLoading.state}
                  value={input}
                  maxHeight={150}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Chat Bot"
                  className="border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0  min-w-[200px] max-w-[400px] focus:outline-none scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent hover:scrollbar-thumb-neutral-500"
                  onKeyDown={handleKeyDown}
                  rows={1}
                /> */}
										<Textarea />
										<HiddenFileInput />
										<div className="flex gap-2 justify-between">
											<Buttons />

											<SendButton />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
// const ModeSelect = memo(() => {
// 	const { searchMode, setSearchMode } = useSearchMode();
// 	const searchModes = [
// 		"webSearch",
// 		"academicSearch",
// 		"writingAssistant",
// 		"wolframAlphaSearch",
// 		"youtubeSearch",
// 		"redditSearch",
// 	];
// 	return (
// 		<SearchModeSelect
// 			searchModes={searchModes}
// 			selectedSearchMode={searchMode}
// 			onSearchModeChange={setSearchMode}
// 		/>
// 	);
// });
const Buttons = memo(() => {
	// const {
	// 	config,
	// 	isDeepThinking,
	// 	setIsDeepThinking,
	// 	isSearch,
	// 	setIsSearch,
	// 	port,
	// } = useConfig();
	const { isLoading } = useChat();
	const { fileInputRef } = useAttachments();
	// const isImage = useMemo(() => {
	// 	console.log("config.selectedModel:", config.selectedModel);

	// 	if (isDeepThinking) {
	// 		return config.selectedDeepThinkingModel.isImage;
	// 	}
	// 	return config.selectedModel.isImage;
	// }, [isDeepThinking, config.selectedDeepThinkingModel, config.selectedModel]);
	return (
		<div className="flex gap-2">
			{/* <ModeSelect />
			<Button
				onClick={setIsDeepThinking}
				type="button"
				disabled={isLoading.state}
				variant={isDeepThinking ? "default" : "outline"}
				className={cn(
					"relative rounded-full h-8 p-2",
					isDeepThinking &&
						"bg-primary text-primary-foreground hover:bg-primary/90"
				)}
			>
				<Brain
					className={cn(
						"h-4 w-4 transition-all",
						isDeepThinking ? "text-primary-foreground" : "text-primary"
					)}
				/>
			</Button> */}
			{/* <Button
				onClick={setIsSearch}
				type="button"
				disabled={isLoading.state || !port}
				variant={isSearch ? "default" : "outline"}
				className={cn(
					"relative rounded-full h-8 p-2",
					isSearch && "bg-primary text-primary-foreground hover:bg-primary/90"
				)}
			>
				<GlobeIcon
					className={cn(
						"h-4 w-4 transition-all",
						isSearch ? "text-primary-foreground" : "text-primary"
					)}
				/>
			</Button> */}
			<Button
				type="button"
				disabled={isLoading.state}
				variant="outline"
				className={cn("relative rounded-full h-8 p-2")}
				onClick={() => fileInputRef.current?.click()}
			>
				<ImageIcon className={cn("h-4 w-4 transition-all text-primary")} />

				<span className="sr-only">Attach file</span>
			</Button>
		</div>
	);
});
Buttons.displayName = "Buttons";
function SendButton() {
	const { stop, setStop, isLoading, handleFormSubmit } = useChat();
	const { input } = useInput();
	const { attachments } = useAttachments();
	const { emptyInput } = useInput();
	const { searchMode } = useSearchMode();
	async function handleSubmitMessage() {
		handleFormSubmit(input, attachments, searchMode, emptyInput);
	}

	return (
		<Fragment>
			{!stop ? (
				<Button
					size="icon"
					type="button"
					onClick={() => {
						setStop(true);
					}}
					className="h-8 w-8 rounded-full"
				>
					<StopIcon className="h-4 w-4" />
					<span className="sr-only">Stop message</span>
				</Button>
			) : (
				<Button
					disabled={isLoading.state}
					type="button"
					size="icon"
					onClick={handleSubmitMessage}
					className="h-8 w-8 rounded-full"
				>
					<ArrowUpIcon className="h-4 w-4" />
					<span className="sr-only">Send message</span>
				</Button>
			)}
		</Fragment>
	);
}
