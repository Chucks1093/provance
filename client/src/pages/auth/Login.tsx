import { ScrollArea } from '@/components/ui/scroll-area';
import FormInput from '@/components/common/FormInput';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Globe, Mail, HatGlasses } from 'lucide-react';
import showToast from '@/utils/toast.util';

import { z } from 'zod';
import { useZodValidation } from '@/hooks/useZodValidation';
import PasswordToggle from '@/components/common/PasswordToggle';
import CircularSpinner from '@/components/common/CircularSpinnerProps';
import CheckboxOption from '@/components/common/CheckboxOption';
import { env } from '@/utils/env.utils';
import { authService } from '@/services/auth.service';
import AgentInstructionModal from '@/components/auth/AgentInstructionModal';
const LoginSchema = z.object({
	email: z.email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const ONBOARDING_ALLOWED_KEY = 'proofline_onboarding_allowed';

// Inferred TypeScript type
type LoginData = z.infer<typeof LoginSchema>;

function Login() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const initialData = { email: '', password: '' };
	const [formData, setFormData] = useState<LoginData>(initialData);
	const { errors, touched, validateAndTouch } = useZodValidation(initialData);
	const [passwordVisibility, setPasswordVisibility] = useState({
		password: false,
	});
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [showAgentDialog, setShowAgentDialog] = useState(false);
	const REDIRECT_AFTER_LOGIN_KEY = 'proofline_redirect_after_login';

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData(prev => {
			const newData = { ...prev, [field]: value };
			validateAndTouch(LoginSchema, newData, field);
			return newData;
		});
	};

	const validateForm = () => {
		try {
			return LoginSchema.parse(formData);
		} catch (err) {
			if (err instanceof z.ZodError) {
				showToast.error(err.issues[0]?.message ?? 'Invalid input');
			}
			return null;
		}
	};

	const handleSignIn = async () => {
		try {
			setLoading(true);
			const validInput = validateForm();
			if (!validInput) return;
			const profile = await authService.login(
				validInput.email,
				validInput.password
			);
			showToast.success('Login successful');
			const hasOnboardingCompleted =
				Boolean(profile.avatarUrl) && Boolean(profile.interests?.length);
			if (!hasOnboardingCompleted) {
				localStorage.setItem(ONBOARDING_ALLOWED_KEY, 'true');
				navigate('/auth/register?step=2');
				return;
			}
			const queryRedirect = searchParams.get('redirect');
			const storedRedirect = localStorage.getItem(REDIRECT_AFTER_LOGIN_KEY);
			const nextPath = queryRedirect || storedRedirect || '/stories';
			localStorage.removeItem(REDIRECT_AFTER_LOGIN_KEY);
			navigate(nextPath);
		} catch (error) {
			console.log(error);
			const message =
				error instanceof Error ? error.message : 'Login failed';
			showToast.error(message);
		} finally {
			setLoading(false);
		}
	};

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
			showToast.error(`${provider} login failed. Please try again.`);
		}
	};

	const MailIcon = () => (
		<div className="pr-5 pl-2 text-odin-dark-1000-a-65">
			<Mail />
		</div>
	);

	return (
		<div className="grid min-h-screen grid-cols-1 bg-odin-dark-200 text-odin-dark-1000 lg:h-screen lg:grid-cols-[55%_45%] lg:grid-rows-[100vh]">
			<div className="h-full bg-odin-dark-200">
				<ScrollArea className="h-full">
					<div className="mx-auto max-w-[37.9rem] px-1 pb-8">
						<div className="px-4 sm:px-5 md:px-1">
							<header className="mt-12 flex items-center justify-between  md:mt-18">
								<Link to="/" className="flex items-center gap-2">
									<Globe className="text-odin-dark-1000" />
									<p className="font-montserrat text-base font-semibold uppercase tracking-[0.1em] text-odin-dark-1000 sm:text-lg">
										Proofline
									</p>
								</Link>
							</header>
							<div className="mt-10 sm:mt-12">
								<h1 className="font-jakarta text-2xl font-semibold text-odin-dark-1000 sm:text-3xl">
									Welcome Back!
								</h1>
								<p className="mt-3 text-sm font-jakarta text-odin-dark-1000-a-65 sm:mt-4 sm:text-base">
									Are you new here ?{' '}
									<Link
										className="text-odin-dark-1000 hover:text-white underline"
										to="/auth/register"
									>
										Create Account
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
									<p className="text-sm font-jakarta text-odin-dark-1000-a-65">
										Or
									</p>
									<hr className="h-px w-full border-0 bg-odin-dark-500" />
								</div>
							</div>
							<form className="mt-8 space-y-8 b ">
								<FormInput
									label="Email"
									value={formData.email}
									onChange={value => handleInputChange('email', value)}
									placeholder="Enter your full name"
									required
									type="email"
									error={errors.email}
									touched={touched.email}
									suffix={<MailIcon />}
								/>
								<FormInput
									label="Password"
									value={formData.password}
									onChange={value =>
										handleInputChange('password', value)
									}
									placeholder="Enter your password"
									required
									type={
										passwordVisibility.password ? 'text' : 'password'
									}
									suffix={
										<PasswordToggle
											onToggle={() =>
												handlePasswordToggle('password')
											}
											isPasswordVisible={passwordVisibility.password}
										/>
									}
								/>
							</form>
							<div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:gap-7">
								<CheckboxOption
									checked={rememberMe}
									onChange={setRememberMe}
									label="Remember Me"
									className="mt-0"
								/>
								<Link
									to="/auth/password/forgot"
									className="font-jakarta text-odin-dark-1000-a-65 hover:text-odin-dark-1000 hover:underline"
								>
									Forget Password ?
								</Link>
							</div>
							<button
								onClick={handleSignIn}
								disabled={loading}
								className="mt-9 w-full cursor-pointer rounded-lg border border-odin-dark-500 bg-odin-dark-1000 px-14 py-3 font-jakarta font-semibold text-odin-dark-0 transition-colors duration-200 hover:bg-odin-dark-700 active:bg-odin-dark-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
							>
								{loading ? <CircularSpinner size={22} /> : 'Sign In'}
							</button>
						</div>
					</div>
				</ScrollArea>
			</div>

			<div className="hidden bg-odin-dark-0 lg:block">
				<img
					src="/images/placeholder.jpeg"
					className="h-full w-full object-cover"
					alt=""
				/>
			</div>
			<AgentInstructionModal
				open={showAgentDialog}
				onClose={() => setShowAgentDialog(false)}
			/>
		</div>
	);
}

export default Login;
