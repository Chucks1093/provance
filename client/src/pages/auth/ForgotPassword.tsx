import { ScrollArea } from '@/components/ui/scroll-area';
import FormInput from '@/components/common/FormInput';
import { useState } from 'react';
import { Globe, Mail } from 'lucide-react';
import showToast from '@/utils/toast.util';
import { authService } from '@/services/auth.service';
import { Link, useNavigate } from 'react-router';

function ForgotPassword() {
	const [formData, setFormData] = useState({ email: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSendCode = async () => {
		setIsSubmitting(true);
		try {
			await authService.forgotPassword(formData.email);
			showToast.success(`Reset code sent to ${formData.email}`);
			sessionStorage.setItem('proofline_reset_email', formData.email);
			navigate('/auth/password/create', {
				viewTransition: true,
			});
		} catch (error) {
			console.error('Error sending reset code:', error);
			showToast.error('Failed to send reset code');
		} finally {
			setIsSubmitting(false);
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
							<header className="mt-6 flex items-center justify-between sm:mt-8 md:mt-18">
								<Link to="/" className="flex items-center gap-2">
									<Globe className="text-odin-dark-1000-a-65" />
									<p className="font-montserrat text-base font-semibold uppercase tracking-[0.1em] text-odin-dark-1000 sm:text-lg">
										Proofline
									</p>
								</Link>
							</header>
							<div className="mt-12 sm:mt-16 md:mt-20">
								<h1 className="font-jakarta text-2xl font-semibold text-odin-dark-1000 sm:text-3xl">
									Forgot Your Password?
								</h1>
								<p className="mt-3 text-sm font-jakarta text-odin-dark-1000-a-65 sm:mt-4 sm:text-base">
									Enter your registered email. We will send you a code
									to reset your password.
								</p>
							</div>
							<form className="mt-8 space-y-8">
								<FormInput
									label="Email"
									value={formData.email}
									onChange={value => handleInputChange('email', value)}
									placeholder="Enter your email"
									required
									type="email"
									suffix={<MailIcon />}
								/>
							</form>
							<button
								onClick={handleSendCode}
								disabled={isSubmitting}
								className="mt-9 w-full cursor-pointer rounded-lg border border-odin-dark-500 bg-odin-dark-1000 px-14 py-3 font-jakarta font-semibold text-odin-dark-0 transition-colors duration-200 hover:bg-odin-dark-700 active:bg-odin-dark-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
							>
								Send Reset Code
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
		</div>
	);
}

export default ForgotPassword;
