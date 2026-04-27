import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { authService } from '@/services/auth.service';
import showToast from '@/utils/toast.util';
import { Globe } from 'lucide-react';

const ONBOARDING_ALLOWED_KEY = 'proofline_onboarding_allowed';

function OAuthCallback() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [statusText, setStatusText] = useState('Finishing Google login...');

	useEffect(() => {
		const result = authService.handleOAuthCallback(searchParams);

		if (result.success) {
			showToast.success(result.message);
			const hasOnboardingCompleted =
				Boolean(result.profile?.avatarUrl) &&
				Boolean(result.profile?.interests?.length);
			if (hasOnboardingCompleted) {
				navigate('/stories', { replace: true });
				return;
			}
			localStorage.setItem(ONBOARDING_ALLOWED_KEY, 'true');
			navigate('/auth/register?step=2', { replace: true });
			return;
		}

		showToast.error(result.message);
		setStatusText(result.message);
		const timer = setTimeout(() => {
			navigate('/auth/login', { replace: true });
		}, 1500);

		return () => clearTimeout(timer);
	}, [navigate, searchParams]);

	return (
		<div className="min-h-screen bg-odin-dark-200 px-4 text-odin-dark-1000">
			<div className="mx-auto flex max-w-5xl items-center justify-center pt-20 sm:pt-8">
				<div className="absolute left-4 top-6 flex items-center gap-2 sm:left-8 sm:top-8">
					<Globe className="text-odin-dark-1000-a-65" />
					<p className="font-montserrat text-base font-semibold uppercase tracking-[0.1em] text-odin-dark-1000 sm:text-lg">
						Proofline
					</p>
				</div>
				<div className="w-full max-w-md rounded-2xl border border-odin-dark-500 bg-odin-dark-300 p-6 text-center sm:p-8">
					<h1 className="font-jakarta text-lg font-semibold text-odin-dark-1000 sm:text-xl">
					Google Authentication
					</h1>
					<p className="mt-3 font-jakarta text-sm text-odin-dark-1000-a-65">
						{statusText}
					</p>
				</div>
			</div>
		</div>
	);
}

export default OAuthCallback;
