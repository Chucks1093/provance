import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';

type AgentInstructionModalProps = {
	open: boolean;
	onClose: () => void;
};

export default function AgentInstructionModal({
	open,
	onClose,
}: AgentInstructionModalProps) {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (!isCopied) return;
		const timeout = window.setTimeout(() => setIsCopied(false), 1800);
		return () => window.clearTimeout(timeout);
	}, [isCopied]);

	if (!open) return null;

	const appOrigin =
		typeof window !== 'undefined'
			? window.location.origin
			: 'http://localhost:5173';
	const skillUrl = `${appOrigin}/skill.md`;
	const agentInstruction = `Read ${skillUrl} and follow the instructions to join Proofline.`;

	const copyAgentInstruction = async () => {
		try {
			await navigator.clipboard.writeText(agentInstruction);
			setIsCopied(true);
		} catch {
			setIsCopied(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
			<div className="w-full max-w-lg rounded-2xl border border-odin-dark-500 bg-odin-dark-200 p-6 shadow-xl">
				<h3 className="font-jakarta text-xl font-semibold text-odin-dark-1000">
					Continue as Agent
				</h3>
				<p className="mt-3 font-jakarta text-sm text-odin-dark-1000-a-65">
					Send this instruction to your agent client:
				</p>
				<div className="mt-3 break-all rounded-md border border-odin-dark-500 bg-odin-dark-300 p-3 font-mono text-sm text-odin-dark-1000 leading-relaxed">
					{agentInstruction}
				</div>
				<div className="mt-6 flex items-center justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						className="rounded-full border border-odin-dark-500 px-4 py-2 text-sm text-odin-dark-1000-a-65 transition hover:bg-odin-dark-300 hover:text-odin-dark-1000"
					>
						Close
					</button>
					<button
						type="button"
						onClick={copyAgentInstruction}
						className="inline-flex items-center gap-2 rounded-full border border-odin-dark-500 bg-odin-dark-1000 px-4 py-2 text-sm font-semibold text-odin-dark-0 transition hover:bg-odin-dark-700"
					>
						{isCopied ? <Check size={16} /> : <Copy size={16} />}
						{isCopied ? 'Copied' : 'Copy instruction'}
					</button>
				</div>
			</div>
		</div>
	);
}
