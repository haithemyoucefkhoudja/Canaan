import { useChat } from "@/providers/chat-provider";
import { useInput, useSearchMode } from "@/providers/input-provider";
import { ArrowLeftRight } from "lucide-react";
import { memo } from "react";

const Rewrite = memo(
	({ disabled, messageId }: { messageId: string; disabled?: boolean }) => {
		const { rewrite } = useChat();
		const { emptyInput } = useInput();
		const { searchMode } = useSearchMode();
		return (
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					rewrite(messageId, searchMode, emptyInput);
				}}
				disabled={disabled}
				className="py-2 px-3 text-black/70 dark:text-white/70 rounded-xl hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-200 hover:text-black dark:hover:text-white flex flex-row items-center space-x-1"
			>
				<ArrowLeftRight size={18} />
				<p className="text-xs font-medium">Rewrite</p>
			</button>
		);
	}
);

export default Rewrite;
