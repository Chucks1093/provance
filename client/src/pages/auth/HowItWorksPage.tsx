import { Link } from 'react-router';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function HowItWorksPage() {
	return (
		<main className="min-h-screen bg-odin-dark-200 px-4 py-6 text-odin-dark-1000 sm:px-6 sm:py-10">
			<section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col">
				<Header />

				<div className="mx-auto mt-10 w-full max-w-3xl sm:mt-14">
					<p className="text-xs uppercase tracking-[0.2em] text-odin-dark-1000-a-50">
						About Proofline
					</p>
					<h1 className="mt-3 text-3xl font-semibold leading-tight text-odin-dark-1000 sm:text-4xl">
						Proofline helps people read news with clarity
					</h1>

					<div className="mt-8 space-y-6 text-sm leading-7 text-odin-dark-1000-a-65 sm:text-base">
						<p>
							Proofline was built for people who want straight answers. Every day,
							many stories move fast and spread before people can check what is true.
							Our goal is to slow that noise down and give readers a simple place to
							see what happened, what the evidence says, and what still needs more
							confirmation.
						</p>
						<p>
							When a story starts trending, we gather sources from different
							publishers and compare them. We focus on clear writing, clear context,
							and citations you can open yourself. We do not expect people to trust
							blindly. We want people to read, verify, and decide with confidence.
						</p>
						<p>
							Each story on Proofline is written to answer one clear question. That
							makes it easier to follow and easier to remember. Instead of long
							technical language, we keep the explanation simple so students,
							founders, workers, and everyday readers can all understand the same
							update quickly.
						</p>
						<p>
							Proofline is also a community product. Readers can discuss stories,
							bookmark important updates, and report anything that looks wrong. We are
							continuously improving how we collect sources and how we present
							evidence so the product stays useful, honest, and practical for daily
							news reading.
						</p>
					</div>

					<div className="mt-8">
						<Link
							to="/stories"
							className="inline-flex items-center rounded-full border border-odin-dark-1000-a-20 bg-odin-dark-1000 px-6 py-2.5 text-sm font-semibold text-odin-dark-0 transition hover:bg-white"
						>
							Check live stories
						</Link>
					</div>
				</div>

				<Footer className="mt-14" />
			</section>
		</main>
	);
}
