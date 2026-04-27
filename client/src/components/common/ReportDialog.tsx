import { useEffect, useMemo, useState } from 'react';
import { Flag } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { reportService } from '@/services/report.service';
import type { ReportReason, ReportTargetType } from '@/services/report.service';
import showToast from '@/utils/toast.util';

const REPORT_REASON_OPTIONS: Array<{ value: ReportReason; label: string }> = [
	{ value: 'MISINFORMATION', label: 'Misinformation' },
	{ value: 'HARASSMENT', label: 'Harassment' },
	{ value: 'SPAM', label: 'Spam' },
	{ value: 'HATE', label: 'Hate' },
	{ value: 'OTHER', label: 'Other' },
];

type ReportDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	targetType: ReportTargetType;
	targetId: string;
	title?: string;
	description?: string;
	onSubmitted?: () => void;
};

export default function ReportDialog({
	open,
	onOpenChange,
	targetType,
	targetId,
	title,
	description,
	onSubmitted,
}: ReportDialogProps) {
	const [reason, setReason] = useState<ReportReason>('MISINFORMATION');
	const [details, setDetails] = useState('');
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!open) {
			setReason('MISINFORMATION');
			setDetails('');
			setSubmitting(false);
		}
	}, [open]);

	const hasDetails = useMemo(() => details.trim().length > 0, [details]);

	const handleSubmit = async () => {
		if (!targetId || submitting) return;
		try {
			setSubmitting(true);
			await reportService.createReport({
				targetType,
				targetId,
				reason,
				details: hasDetails ? details.trim() : undefined,
			});
			showToast.success('Report submitted');
			onOpenChange(false);
			onSubmitted?.();
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Failed to submit report';
			showToast.error(message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="border-odin-dark-500 bg-odin-dark-300 text-odin-dark-1000 sm:max-w-[520px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-odin-dark-1000">
						<Flag className="size-4" />
						{title ??
							(targetType === 'STORY' ? 'Report article' : 'Report comment')}
					</DialogTitle>
					<DialogDescription className="text-odin-dark-1000-a-65">
						{description ??
							'Select a reason and submit this report. Our team will review it.'}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div className="space-y-2">
						<p className="text-sm font-medium text-odin-dark-1000">Reason</p>
						<div className="flex flex-wrap gap-2">
							{REPORT_REASON_OPTIONS.map(option => {
								const active = reason === option.value;
								return (
									<button
										key={option.value}
										type="button"
										onClick={() => setReason(option.value)}
										className={
											active
												? 'rounded-full border border-odin-dark-1000-a-35 bg-odin-dark-500 px-3 py-1.5 text-xs font-semibold text-odin-dark-1000'
												: 'rounded-full border border-odin-dark-500 bg-odin-dark-400 px-3 py-1.5 text-xs font-medium text-odin-dark-1000-a-65 transition hover:bg-odin-dark-500'
										}
									>
										{option.label}
									</button>
								);
							})}
						</div>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="report-details"
							className="text-sm font-medium text-odin-dark-1000"
						>
							Details (optional)
						</label>
						<textarea
							id="report-details"
							value={details}
							onChange={event => setDetails(event.target.value)}
							maxLength={1000}
							rows={4}
							placeholder="Add context for moderation review"
							className="w-full resize-none rounded-xl border border-odin-dark-500 bg-odin-dark-400 px-3 py-2 text-sm text-odin-dark-1000 outline-none transition placeholder:text-odin-dark-1000-a-50 focus:border-odin-dark-1000-a-35"
						/>
						<p className="text-xs text-odin-dark-1000-a-50">
							{details.length}/1000
						</p>
					</div>
				</div>

				<DialogFooter>
					<button
						type="button"
						onClick={() => onOpenChange(false)}
						className="rounded-full border border-odin-dark-500 bg-odin-dark-400 px-4 py-2 text-sm font-semibold text-odin-dark-1000 transition hover:bg-odin-dark-500"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!targetId || submitting}
						className="rounded-full border border-odin-dark-500 bg-odin-dark-1000 px-4 py-2 text-sm font-semibold text-odin-dark-200 transition hover:bg-odin-dark-1000-a-85 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{submitting ? 'Submitting...' : 'Submit report'}
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
