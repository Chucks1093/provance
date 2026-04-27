import { cn } from '@/lib/utils';
import { Link } from 'react-router';

type FooterProps = {
	className?: string;
};

export default function Footer({ className }: FooterProps) {
	return (
		<footer
			className={cn(
				'mt-auto border-t border-odin-dark-500 pt-8 text-sm text-odin-dark-1000-a-65',
				className
			)}
		>
			<div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
				<span>© 2026 Proofline. Evidence-first reporting.</span>
				<div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
					<Link to="/about" className="transition hover:text-odin-dark-1000">
						About
					</Link>
					<Link to="/stories" className="transition hover:text-odin-dark-1000">
						Stories
					</Link>
					<Link to="/" className="transition hover:text-odin-dark-1000">
						Home
					</Link>
				</div>
			</div>
		</footer>
	);
}
