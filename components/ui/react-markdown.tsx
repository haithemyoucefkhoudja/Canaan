import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useMemo } from "react";
interface MarkdownMessageProps {
	content: string;
	reasoning?: string;
}
export function MarkdownMessage({ content, reasoning }: MarkdownMessageProps) {
	const remarkPlugins = useMemo(() => [remarkGfm], []);
	const rehypePlugins = useMemo(() => [rehypeRaw], []);
	// const materialDarkStyle = useMemo(() => materialDark, []);
	// const MemoizedSyntaxHighlighter = useMemo(() => SyntaxHighlighter, []);
	const components = useMemo(() => {
		return {
			p: ({ children }: any) => (
				<p className="mb-2 text-wrap break-words">{children}</p>
			),
		};
	}, [remarkPlugins, rehypePlugins]);
	return (
		<div data-tauri-drag-region className="w-full px-2">
			{reasoning && (
				<div className="border-l-2 px-2 border-primary/60 w-full">
					<p className="text-foreground/55 mb-2 text-wrap">{reasoning}</p>
				</div>
			)}
			<ReactMarkdown
				remarkPlugins={remarkPlugins}
				rehypePlugins={rehypePlugins}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
