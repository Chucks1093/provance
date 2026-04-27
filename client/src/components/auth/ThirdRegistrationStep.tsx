import { Fragment } from 'react/jsx-runtime';
import { cn } from '@/lib/utils';

type ThirdRegistrationStepProps = {
	selectedInterests: string[];
	onToggleInterest: (interest: string) => void;
};

const INTEREST_OPTIONS = [
	{ id: 'world', label: 'World' },
	{ id: 'politics', label: 'Politics' },
	{ id: 'business', label: 'Business' },
	{ id: 'tech', label: 'Tech' },
	{ id: 'global', label: 'Global' },
	{ id: 'sports', label: 'Sports' },
	{ id: 'finance', label: 'Finance' },
	{ id: 'ai', label: 'AI' },
	{ id: 'science', label: 'Science' },
	{ id: 'health', label: 'Health' },
	{ id: 'climate', label: 'Climate' },
	{ id: 'energy', label: 'Energy' },
	{ id: 'crypto', label: 'Crypto' },
	{ id: 'security', label: 'Security' },
	{ id: 'startup', label: 'Startups' },
	{ id: 'media', label: 'Media' },
	{ id: 'culture', label: 'Culture' },
	{ id: 'education', label: 'Education' },
	{ id: 'travel', label: 'Travel' },
	{ id: 'africa', label: 'Africa' },
	{ id: 'europe', label: 'Europe' },
	{ id: 'americas', label: 'Americas' },
];

function ThirdRegistrationStep({
	selectedInterests,
	onToggleInterest,
}: ThirdRegistrationStepProps) {
	return (
		<Fragment>
			<div className="mt-20">
				<h1 className="font-jakarta text-3xl font-semibold text-odin-dark-1000">
					Choose your interests
				</h1>
				<p className="mt-4 font-jakarta text-odin-dark-1000-a-65">
					Pick multiple topics to shape your feed.
				</p>
			</div>

			<div className="mt-8 flex flex-wrap gap-2.5">
				{INTEREST_OPTIONS.map(option => {
					const selected = selectedInterests.includes(option.id);

					return (
						<button
							key={option.id}
							type="button"
							onClick={() => onToggleInterest(option.id)}
							className={cn(
								'rounded-full border px-3.5 py-1.5 text-xs font-semibold font-jakarta transition-colors duration-200 cursor-pointer outline-none',
								selected
									? 'border-odin-dark-700 bg-odin-dark-500 text-odin-dark-1000 ring-2 ring-odin-dark-1000-a-65 ring-offset-2 ring-offset-odin-dark-200'
									: 'border-odin-dark-500 bg-odin-dark-300 text-odin-dark-1000-a-65 hover:border-odin-dark-700 hover:text-odin-dark-1000'
							)}
						>
							{option.label}
						</button>
					);
				})}
			</div>
		</Fragment>
	);
}

export default ThirdRegistrationStep;
