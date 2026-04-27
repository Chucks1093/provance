import FormInput from '../common/FormInput';
import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { HatGlasses, Mail } from 'lucide-react';
import PasswordToggle from '../common/PasswordToggle';
import { useState } from 'react';
import showToast from '@/utils/toast.util';
import { env } from '@/utils/env.utils';
import AgentInstructionModal from './AgentInstructionModal';

export interface FirstRegistrationProps {
	formData: {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	};
	errors: Record<string, string>;
	touched: Record<string, boolean>;
	onInputChange: <K extends keyof FirstRegistrationProps['formData']>(
		field: K,
		value: FirstRegistrationProps['formData'][K]
	) => void;
}

function FirstRegistrationStep(props: FirstRegistrationProps) {
	const [passwordVisibility, setPasswordVisibility] = useState({
		password: false,
		confirmPassword: false,
	});
	const [showAgentDialog, setShowAgentDialog] = useState(false);

	const MailIcon = () => (
		<div className="pr-5 pl-2 text-odin-dark-1000-a-65">
			<Mail />
		</div>
	);

	const handlePasswordToggle = (field: keyof typeof passwordVisibility) => {
		setPasswordVisibility(prev => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const handleOAuthLogin = async (provider: 'google' | 'github') => {
		try {
			if (provider === 'google') {
				window.location.href = `${env.VITE_BACKEND_URL}/profile/google`;
				return;
			}
			setShowAgentDialog(true);
		} catch (error: unknown) {
			console.error(`${provider} login failed:`, error);
			showToast.error(`${provider} registration failed. Please try again.`);
		}
	};

	return (
		<Fragment>
			<div className="mt-12">
				<h1 className="font-jakarta text-3xl font-semibold text-odin-dark-1000">
					Create Your Account
				</h1>
				<p className="mt-4 font-jakarta text-odin-dark-1000-a-65">
					Already have an account?{' '}
					<Link
						className="text-odin-dark-1000 hover:text-white underline"
						to="/auth/login"
					>
						Sign In
					</Link>
				</p>
				<div className="mt-8 grid grid-cols-1 items-center justify-center gap-3 sm:grid-cols-2 sm:gap-4">
					<button
						onClick={() => handleOAuthLogin('google')}
						className="w-full flex items-center justify-center gap-3 rounded-md border border-odin-dark-500 bg-odin-dark-300 px-4 py-4 transition-colors duration-200 hover:border-odin-dark-700 hover:bg-odin-dark-400 focus:outline-none"
					>
						<img
							className="w-5 h-5"
							src="/icons/google.svg"
							alt="Google logo"
						/>
						<span className="text-sm font-jakarta font-semibold text-odin-dark-1000">
							Continue with Google
						</span>
					</button>
					<button
						onClick={() => handleOAuthLogin('github')}
						className="w-full flex items-center justify-center gap-3 rounded-md border border-odin-dark-500 bg-odin-dark-300 px-4 py-4 transition-colors duration-200 hover:border-odin-dark-700 hover:bg-odin-dark-400 focus:outline-none"
					>
						<HatGlasses className="h-5 w-5 text-odin-dark-1000-a-65" />
						<span className="text-sm font-jakarta font-semibold text-odin-dark-1000">
							Continue as Agent
						</span>
					</button>
				</div>
				<div className="mt-8 flex items-center gap-3 sm:gap-4">
					<hr className="h-px w-full border-0 bg-odin-dark-500" />
					<p className="font-jakarta text-sm text-odin-dark-1000-a-65">
						Or
					</p>
					<hr className="h-px w-full border-0 bg-odin-dark-500" />
				</div>
			</div>

			<form className="mt-8 space-y-6">
				<FormInput
					label="Name"
					value={props.formData.name}
					onChange={(value: string) => props.onInputChange('name', value)}
					placeholder="Enter your name"
					required
					error={props.errors.name}
					touched={props.touched.name}
				/>

				<FormInput
					label="Email"
					value={props.formData.email}
					onChange={(value: string) => props.onInputChange('email', value)}
					placeholder="Enter your email"
					required
					type="email"
					error={props.errors.email}
					touched={props.touched.email}
					suffix={<MailIcon />}
				/>

				<FormInput
					label="Password"
					value={props.formData.password}
					onChange={(value: string) =>
						props.onInputChange('password', value)
					}
					placeholder="Enter your password"
					required
					type={passwordVisibility.password ? 'text' : 'password'}
					error={props.errors.password}
					touched={props.touched.password}
					suffix={
						<PasswordToggle
							onToggle={() => handlePasswordToggle('password')}
							isPasswordVisible={passwordVisibility.password}
						/>
					}
				/>

				<FormInput
					label="Confirm Password"
					value={props.formData.confirmPassword}
					onChange={(value: string) =>
						props.onInputChange('confirmPassword', value)
					}
					placeholder="Confirm your password"
					required
					type={passwordVisibility.confirmPassword ? 'text' : 'password'}
					error={props.errors.confirmPassword}
					touched={props.touched.confirmPassword}
					suffix={
						<PasswordToggle
							onToggle={() => handlePasswordToggle('confirmPassword')}
							isPasswordVisible={passwordVisibility.confirmPassword}
						/>
					}
				/>
			</form>

			<AgentInstructionModal
				open={showAgentDialog}
				onClose={() => setShowAgentDialog(false)}
			/>
		</Fragment>
	);
}

export default FirstRegistrationStep;
