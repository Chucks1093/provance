import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import Stepper from '@/components/common/Stepper';
import FirstRegistrationStep, {
	type FirstRegistrationProps,
} from '@/components/auth/FirstRegistrationStep';
import showToast from '@/utils/toast.util';
import SecondRegistrationStep from '@/components/auth/SecondRegistrationStep';
import ThirdRegistrationStep from '@/components/auth/ThirdRegistrationStep';
import { useZodValidation } from '@/hooks/useZodValidation';
import { z } from 'zod';
import CircularSpinner from '@/components/common/CircularSpinnerProps';
import { authService } from '@/services/auth.service';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Globe } from 'lucide-react';

const registrationSchema = z
	.object({
		name: z
			.string()
			.min(1, 'Name is required')
			.min(2, 'Name must be at least 2 characters')
			.max(100, 'Name must be less than 100 characters')
			.regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

		email: z
			.email('Please enter a valid email address')
			.min(1, 'Email is required')
			.toLowerCase(),

		password: z
			.string()
			.min(1, 'Password is required')
			.min(8, 'Password must be at least 8 characters long')
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				'Password must contain at least one uppercase letter, one lowercase letter, and one number'
			),

		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const ONBOARDING_DRAFT_KEY = 'proofline_onboarding_profile';
const ONBOARDING_ALLOWED_KEY = 'proofline_onboarding_allowed';

function Register() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const initialData = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [loading, setLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<RegistrationFormData>(initialData);
	const [selectedAvatar, setSelectedAvatar] = useState(
		'/avatars/avatar-1.png'
	);
	const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

	const { errors, touched, validateAndTouch, validate, markAllTouched } =
		useZodValidation(initialData);

	useEffect(() => {
		const rawStep = Number(searchParams.get('step') ?? '1');
		setCurrentStep(rawStep >= 2 ? Math.min(rawStep, 3) : 1);
	}, [searchParams]);

	useEffect(() => {
		const draftRaw = localStorage.getItem(ONBOARDING_DRAFT_KEY);
		if (!draftRaw) return;
		try {
			const draft = JSON.parse(draftRaw) as {
				avatarUrl?: string;
				interests?: string[];
			};
			if (draft.avatarUrl) setSelectedAvatar(draft.avatarUrl);
			if (Array.isArray(draft.interests))
				setSelectedInterests(draft.interests);
		} catch {
			// ignore malformed draft
		}
	}, []);

	useEffect(() => {
		if (currentStep === 1) return;

		const user = authService.getUser();
		const token = authService.getSessionToken();
		const onboardingAllowed =
			localStorage.getItem(ONBOARDING_ALLOWED_KEY) === 'true';

		if (!token || !user) {
			navigate('/auth/login', { replace: true });
			return;
		}

		if (!user.emailVerified) {
			navigate('/auth/verify', { replace: true });
			return;
		}

		const hasOnboardingCompleted =
			Boolean(user.avatarUrl) && Boolean(user.interests?.length);
		if (hasOnboardingCompleted) {
			navigate('/stories', { replace: true });
			return;
		}

		if (!onboardingAllowed) {
			navigate('/auth/register?step=1', { replace: true });
		}
	}, [currentStep, navigate]);

	const handleInputChange = (
		field: keyof FirstRegistrationProps['formData'],
		value: string
	) => {
		setFormData(prev => {
			const newData = { ...prev, [field]: value };
			validateAndTouch(registrationSchema, newData, field);
			return newData;
		});
	};

	const handleToggleInterest = (interest: string) => {
		setSelectedInterests(prev =>
			prev.includes(interest)
				? prev.filter(item => item !== interest)
				: [...prev, interest]
		);
	};

	const handleRegisterSubmit = async () => {
		try {
			setLoading(true);

			await authService.register({
				name: formData.name,
				email: formData.email,
				password: formData.password,
			});

			sessionStorage.setItem('proofline_verify_email', formData.email);
			showToast.success('Registration Successful');
			showToast.message(
				'We sent a 6-digit verification code to your email.'
			);
			navigate('/auth/verify');
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'Registration failed. Please try again.';
			showToast.error(message);
		} finally {
			setLoading(false);
		}
	};

	const handleContinue = async () => {
		if (currentStep === 1) {
			markAllTouched();
			const validData = validate(registrationSchema, formData);
			if (!validData) {
				showToast.error('Please fix the errors before continuing');
				return;
			}

			await handleRegisterSubmit();
			return;
		}

		if (currentStep === 2) {
			localStorage.setItem(
				ONBOARDING_DRAFT_KEY,
				JSON.stringify({
					avatarUrl: selectedAvatar,
					interests: selectedInterests,
				})
			);
			setSearchParams({ step: '3' });
			return;
		}

		if (selectedInterests.length === 0) {
			showToast.error('Select at least one interest');
			return;
		}

		try {
			setLoading(true);
			await authService.completeOnboarding({
				avatarUrl: selectedAvatar,
				interests: selectedInterests,
			});
			localStorage.removeItem(ONBOARDING_DRAFT_KEY);
			localStorage.removeItem(ONBOARDING_ALLOWED_KEY);
			showToast.success('Profile setup completed');
			navigate('/stories', { replace: true });
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'Failed to complete onboarding';
			showToast.error(message);
		} finally {
			setLoading(false);
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<FirstRegistrationStep
						formData={formData}
						errors={errors}
						touched={touched}
						onInputChange={handleInputChange}
					/>
				);

			case 2:
				return (
					<SecondRegistrationStep
						selectedAvatar={selectedAvatar}
						onSelectAvatar={setSelectedAvatar}
					/>
				);

			case 3:
				return (
					<ThirdRegistrationStep
						selectedInterests={selectedInterests}
						onToggleInterest={handleToggleInterest}
					/>
				);

			default:
				return (
					<FirstRegistrationStep
						formData={formData}
						errors={errors}
						touched={touched}
						onInputChange={handleInputChange}
					/>
				);
		}
	};

	return (
		<div className="grid min-h-screen grid-cols-1 bg-odin-dark-200 text-odin-dark-1000 lg:h-screen lg:grid-cols-[45%_55%] lg:grid-rows-[100vh]">
			<div className="hidden bg-odin-dark-0 lg:block">
				<img
					src="/images/placeholder.jpeg"
					className="h-full w-full object-cover"
					alt=""
				/>
			</div>
			<div className="h-full bg-odin-dark-200">
				<ScrollArea className="h-full">
					<div className="mx-auto max-w-[37.9rem] px-4 pb-8 sm:px-6 md:px-4">
						<header className="mt-12 flex items-center justify-between  md:mt-18">
							<Link to="/" className="flex items-center gap-2">
								<Globe className="text-odin-dark-1000-a-65" />
								<p className="font-montserrat text-base font-semibold uppercase tracking-[0.1em] text-odin-dark-1000 sm:text-lg">
									Proofline
								</p>
							</Link>
						</header>
						{renderStepContent()}
						<div className="mt-8 flex flex-col justify-between gap-4 md:flex-row md:gap-7">
							<Stepper
								currentStep={currentStep}
								totalSteps={3}
								onStepClick={step => {
									if (currentStep === 1) return;
									setSearchParams({ step: String(step) });
								}}
								variant="rounded"
							/>
							<button
								onClick={handleContinue}
								disabled={loading}
								className="w-full cursor-pointer rounded-lg border border-odin-dark-500 bg-odin-dark-1000 px-14 py-3 font-jakarta font-semibold text-odin-dark-0 transition-colors duration-200 hover:bg-odin-dark-700 active:bg-odin-dark-700 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
							>
								{loading ? (
									<CircularSpinner size={22} />
								) : currentStep < 3 ? (
									'Next'
								) : (
									'Finish Setup'
								)}
							</button>
						</div>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}

export default Register;
