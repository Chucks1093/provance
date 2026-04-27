import { Globe } from 'lucide-react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';

type GlobalErrorPageProps = {
	title?: string;
	description?: string;
	showErrorDetails?: boolean;
};

export default function GlobalErrorPage({
	title,
	description,
	showErrorDetails = true,
}: GlobalErrorPageProps) {
	const routeError = useRouteError();

	let resolvedTitle = title ?? 'Something went wrong';
	let resolvedDescription =
		description ?? 'An unexpected error occurred. Please go back to the home page.';

	if (!title && showErrorDetails && routeError) {
		if (isRouteErrorResponse(routeError)) {
			if (routeError.status === 404) {
				resolvedTitle = 'Page not found';
				resolvedDescription =
					'The page you are looking for does not exist. Go back to home.';
			} else {
				resolvedTitle = `${routeError.status} ${routeError.statusText}`;
				resolvedDescription =
					typeof routeError.data === 'string'
						? routeError.data
						: 'Something went wrong while loading this page.';
			}
		} else if (routeError instanceof Error) {
			resolvedDescription = routeError.message || resolvedDescription;
		}
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-odin-dark-200 px-6 py-10 text-odin-dark-1000">
			<section className="w-full max-w-xl rounded-2xl border border-odin-dark-500 bg-odin-dark-300 p-8 text-center">
				<div className="mx-auto mb-8 flex items-center justify-center gap-2">
					<Globe className="text-odin-dark-1000-a-65" />
					<p className="font-montserrat text-lg font-semibold uppercase tracking-[0.1em] text-odin-dark-1000">
						Proofline
					</p>
				</div>

				<h1 className="text-3xl font-semibold text-odin-dark-1000">{resolvedTitle}</h1>
				<p className="mt-3 text-sm text-odin-dark-1000-a-65">
					{resolvedDescription}
				</p>

				<Link
					to="/"
					className="mx-auto mt-8 inline-flex rounded-lg border border-odin-dark-500 bg-odin-dark-1000 px-6 py-2.5 text-sm font-semibold text-odin-dark-0 transition hover:bg-odin-dark-700"
				>
					Go Home
				</Link>
			</section>
		</main>
	);
}
