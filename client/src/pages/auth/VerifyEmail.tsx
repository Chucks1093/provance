import { useState, useEffect } from 'react';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { Link, useNavigate } from 'react-router';
import { Globe, X } from 'lucide-react';
import showToast from '@/utils/toast.util';
import { authService } from '@/services/auth.service';

const ONBOARDING_ALLOWED_KEY = 'proofline_onboarding_allowed';

export default function VerifyEmail() {
	const [value, setValue] = useState('');
	const [error, setError] = useState(false);
	const [timeLeft, setTimeLeft] = useState(45);
	const [canResend, setCanResend] = useState(false);
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const pendingEmail = sessionStorage.getItem('proofline_verify_email');
		if (!pendingEmail) {
			navigate('/auth/register', { replace: true });
			return;
		}
		setEmail(pendingEmail);
	}, [navigate]);

	useEffect(() => {
		if (timeLeft > 0) {
			const timer = setTimeout(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
			return () => clearTimeout(timer);
		}
		setCanResend(true);
	}, [timeLeft]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await authService.verifyEmail(email, value);

			const onboardingRaw = localStorage.getItem('proofline_onboarding_profile');
			if (onboardingRaw) {
				try {
					const onboarding = JSON.parse(onboardingRaw) as {
						avatarUrl?: string;
						interests?: string[];
					};

					if (onboarding.avatarUrl && onboarding.interests?.length) {
						await authService.completeOnboarding({
							avatarUrl: onboarding.avatarUrl,
							interests: onboarding.interests,
						});
						localStorage.removeItem('proofline_onboarding_profile');
					}
				} catch {
					// keep onboarding data for retry
				}
			}

			setError(false);
			showToast.success('OTP verified successfully!');
			sessionStorage.removeItem('proofline_verify_email');
			localStorage.setItem(ONBOARDING_ALLOWED_KEY, 'true');
			navigate('/auth/register?step=2');
		} catch (submitError) {
			console.error('Error verifying OTP:', submitError);
			setError(true);
			showToast.error('Invalid OTP, please try again.');
		}
	};

	const handleResend = async () => {
		if (!canResend) return;

		setTimeLeft(45);
		setCanResend(false);
		setValue('');
		setError(false);

		try {
			await authService.resendVerification(email);
			showToast.success('OTP resent successfully');
		} catch (resendError) {
			console.error('Error resending OTP:', resendError);
			showToast.error('Could not resend OTP. Please try again.');
		}
	};

	return (
		<div className="relative flex min-h-screen w-full items-center justify-center bg-odin-dark-200 px-4 py-6 text-odin-dark-1000 sm:px-6 sm:py-10">
			<Link to="/" className="absolute left-4 top-5 flex items-center gap-2 sm:left-8 sm:top-8">
				<Globe className="text-odin-dark-1000-a-65" />
				<p className="font-montserrat text-base font-semibold uppercase tracking-[0.1em] text-odin-dark-1000 sm:text-lg">
					Proofline
				</p>
			</Link>
			<Link
				to="/auth/login"
				className="absolute right-4 top-5 cursor-pointer rounded-full border border-odin-dark-500 bg-odin-dark-300 p-2 hover:bg-odin-dark-400 sm:right-8 sm:top-8"
			>
				<X className="h-6 w-6 text-odin-dark-1000-a-65" />
			</Link>

			<div className="relative mt-12 flex w-full max-w-2xl flex-col justify-center sm:bottom-[.5rem] sm:mt-0">
				<div className="mx-auto mb-8 flex items-center gap-2 sm:mb-12">
					<Globe className="text-odin-dark-1000-a-65" />
					<p className="font-montserrat text-base font-semibold uppercase tracking-[0.1em] text-odin-dark-1000 sm:text-lg">
						Proofline
					</p>
				</div>
				<h2 className="mb-2 text-center font-inter text-3xl font-semibold text-odin-dark-1000 sm:text-4xl">
					Verify Your Email
				</h2>
				<p className="mb-6 text-center text-sm font-jakarta text-odin-dark-1000-a-65 sm:text-md">
					Enter the 6-digit code sent to
					<span className="ml-1 text-odin-dark-1000">{email}</span>
				</p>
				<form
					onSubmit={handleSubmit}
					className="flex w-full flex-col items-center justify-center space-y-6"
				>
					<div className="flex justify-center">
						<InputOTP maxLength={6} value={value} onChange={setValue}>
							<InputOTPGroup className="flex gap-2 sm:gap-3">
								{Array.from({ length: 6 }).map((_, i) => (
									<InputOTPSlot
										key={i}
										index={i}
										className={`h-10 w-10 rounded-lg border text-center text-lg sm:text-xl md:h-14 md:w-14 ${
											error
												? 'border-red-500 text-red-500 focus:ring-red-500'
												: 'border-odin-dark-500 bg-odin-dark-300 text-odin-dark-1000 focus:ring-odin-dark-700'
										}`}
									/>
								))}
							</InputOTPGroup>
						</InputOTP>
					</div>

					{error && (
						<p className="text-sm text-red-500 text-center">
							Invalid OTP, please try again.
						</p>
					)}

					<button className="mt-8 w-full cursor-pointer rounded-lg border border-odin-dark-500 bg-odin-dark-1000 px-10 py-3 font-jakarta font-semibold text-odin-dark-0 transition-colors duration-200 hover:bg-odin-dark-700 active:bg-odin-dark-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
						Verify & Continue
					</button>

					<p className="font-jakarta text-odin-dark-1000-a-65">
						Didn't get code?
						{canResend ? (
							<button
								type="button"
								onClick={handleResend}
								className="ml-1 cursor-pointer text-odin-dark-1000 hover:underline"
							>
								Resend
							</button>
						) : (
							<span className="ml-1 text-odin-dark-1000-a-50">
								Resend in {timeLeft}s
							</span>
						)}
					</p>
				</form>
			</div>
		</div>
	);
}
