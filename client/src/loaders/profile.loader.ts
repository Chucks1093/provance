import { redirect } from 'react-router';
import { authService } from '@/services/auth.service';

export async function storiesAuthLoader({
	request,
}: {
	request: Request;
}) {
	const currentUrl = new URL(request.url);
	const targetPath = `${currentUrl.pathname}${currentUrl.search}`;
	const token = authService.getSessionToken();
	if (!token) {
		return redirect(`/auth/login?redirect=${encodeURIComponent(targetPath)}`);
	}

	try {
		const profile = await authService.getProfile();
		if (!profile) {
			await authService.logout();
			return redirect(
				`/auth/login?redirect=${encodeURIComponent(targetPath)}`
			);
		}

		if (!profile.emailVerified) {
			return redirect('/auth/verify');
		}

		return null;
	} catch {
		await authService.logout();
		return redirect(`/auth/login?redirect=${encodeURIComponent(targetPath)}`);
	}
}
