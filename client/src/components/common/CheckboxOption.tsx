import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxOptionProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
	disabled?: boolean;
	className?: string;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({
	checked,
	onChange,
	label,
	disabled = false,
	className = '',
}) => {
	const handleToggle = () => {
		if (!disabled) {
			onChange(!checked);
		}
	};

	return (
		<div className={cn('flex gap-3 mt-6', className)}>
			<button
				type="button"
				onClick={handleToggle}
				disabled={disabled}
				className={cn(
					'w-6 h-6 rounded-sm flex items-center justify-center transition-colors duration-200',
					checked ? 'border border-odin-dark-1000-a-20 bg-odin-light-0 text-odin-dark-0' : 'border border-odin-dark-500 bg-odin-dark-300',
					disabled
						? 'opacity-50 cursor-not-allowed'
						: 'cursor-pointer hover:opacity-80'
				)}
			>
				{checked && <Check className="h-4 w-4 text-odin-dark-0 stroke-[3]" />}
			</button>

			<p
				className={cn(
					'w-[90%] cursor-pointer select-none font-jakarta text-odin-dark-1000-a-65',
					disabled && 'opacity-50'
				)}
				onClick={handleToggle}
			>
				{label}
			</p>
		</div>
	);
};

export default CheckboxOption;
