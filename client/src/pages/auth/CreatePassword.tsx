import { ScrollArea } from '@/components/ui/scroll-area';
import FormInput from '@/components/common/FormInput';
import { useEffect, useState } from 'react';
import showToast from '@/utils/toast.util';
import { authService } from '@/services/auth.service';
import { Link, useNavigate } from 'react-router';
import PasswordToggle from '@/components/common/PasswordToggle';
import { Globe } from 'lucide-react';

function CreatePassword() {
	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
		resetCode: '',
		email: '',
	});
	const [passwordVisibility, setPasswordVisibility] = useState({
		password: false,
		confirmPassword: false,
		resetCode: false,
	});
	const navigate = useNavigate();

	useEffect(() => {
		const email = sessionStorage.getItem('proofline_reset_email') || '';
		setFormData(prev => ({ ...prev, email }));
	}, []);

	const handlePasswordToggle = (field: keyof typeof passwordVisibility) => {
		setPasswordVisibility(prev => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleResetPassword = async () => {
		if (!formData.email || !formData.resetCode || !formData.password) {
			showToast.error('Please complete all fields');
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			showToast.error('Passwords do not match');
			return;
		}

		try {
			await authService.resetPasswordWithCode({
				email: formData.email,
				resetCode: formData.resetCode,
				newPassword: formData.password,
				confirmPassword: formData.confirmPassword,
			});
			showToast.success(`Password reset successful: ${formData.email}`);
			sessionStorage.removeItem('proofline_reset_email');
			navigate('/auth/login', { viewTransition: true });
		} catch (error) {
			console.error('Error resetting password:', error);
			showToast.error(
				error instanceof Error
					? error.message
					: 'Failed to reset password'
			);
		}
	};

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
									Create New Password
								</h1>
								<p className="mt-3 text-sm font-jakarta text-odin-dark-1000-a-65 sm:mt-4 sm:text-base">
									Set a strong password to secure your account.
								</p>
							</div>
							<form className="mt-8 space-y-8">
								<FormInput
									label="Reset Code"
									value={formData.resetCode}
									onChange={value =>
										handleInputChange('resetCode', value)
									}
									placeholder="Enter the reset code sent to your email"
									required
									type={passwordVisibility.resetCode ? 'text' : 'password'}
									suffix={
										<PasswordToggle
											onToggle={() =>
												handlePasswordToggle('resetCode')
											}
											isPasswordVisible={passwordVisibility.resetCode}
										/>
									}
								/>
								<FormInput
									label="Email Address"
									value={formData.email}
									onChange={value => handleInputChange('email', value)}
									placeholder="Confirm your email address"
									required
									type="email"
								/>
								<FormInput
									label="Password"
									value={formData.password}
									onChange={value =>
										handleInputChange('password', value)
									}
									placeholder="Enter your password"
									required
									type={passwordVisibility.password ? 'text' : 'password'}
									suffix={
										<PasswordToggle
											onToggle={() =>
												handlePasswordToggle('password')
											}
											isPasswordVisible={passwordVisibility.password}
										/>
									}
								/>
								<FormInput
									label="Confirm Password"
									value={formData.confirmPassword}
									onChange={value =>
										handleInputChange('confirmPassword', value)
									}
									placeholder="Confirm your password"
									required
									type={
										passwordVisibility.confirmPassword
											? 'text'
											: 'password'
									}
									suffix={
										<PasswordToggle
											onToggle={() =>
												handlePasswordToggle('confirmPassword')
											}
											isPasswordVisible={
												passwordVisibility.confirmPassword
											}
										/>
									}
								/>
							</form>
							<button
								onClick={handleResetPassword}
								className="mt-9 w-full cursor-pointer rounded-lg border border-odin-dark-500 bg-odin-dark-1000 px-10 py-3 font-jakarta font-semibold text-odin-dark-0 transition-colors duration-200 hover:bg-odin-dark-700 active:bg-odin-dark-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
							>
								Reset Password
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

export default CreatePassword;
