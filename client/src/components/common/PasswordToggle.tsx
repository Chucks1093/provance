import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleProps {
	isPasswordVisible: boolean;
	onToggle: () => void;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({
	isPasswordVisible,
	onToggle,
}) => (
	<button
		type="button"
		onClick={onToggle}
		className="pr-5 pl-2 text-odin-dark-1000-a-65 transition-colors hover:text-odin-dark-1000"
	>
		{isPasswordVisible ? <EyeOff /> : <Eye />}
	</button>
);

export default PasswordToggle;
