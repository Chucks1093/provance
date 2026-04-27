import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import Header from '@/components/shared/Header';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const HERO_IMAGES = [
	'/images/hero/bg-1.jpg',
	'/images/hero/bg-2.jpg',
	'/images/hero/bg-3.jpg',
	'/images/hero/bg-4.jpg',
];

const DISPLAY_MS = 15000;
const FIRST_FADE_IN_MS = 3800;
const FADE_IN_MS = 1800;
const FADE_OUT_MS = 1300;
const GAP_MS = 700;
const ZOOM_START_DELAY_MS = 900;
const ZOOM_DURATION_MS = 41000;

export default function LandingPage() {
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const [phase, setPhase] = useState<
		'hidden' | 'visible' | 'fadingOut' | 'reset'
	>('hidden');
	const [hasInitialFadeCompleted, setHasInitialFadeCompleted] =
		useState(false);

	useEffect(() => {
		let isMounted = true;
		let timeoutId: number | undefined;

		const sleep = (ms: number) =>
			new Promise<void>(resolve => {
				timeoutId = window.setTimeout(resolve, ms);
			});

		const run = async () => {
			await sleep(80);
			if (!isMounted) return;
			setPhase('visible');

			await sleep(FIRST_FADE_IN_MS);
			if (!isMounted) return;
			setHasInitialFadeCompleted(true);

			while (isMounted) {
				await sleep(DISPLAY_MS);
				if (!isMounted) return;

				setPhase('fadingOut');
				await sleep(FADE_OUT_MS);
				if (!isMounted) return;

				setPhase('reset');
				await sleep(GAP_MS);
				if (!isMounted) return;

				setActiveImageIndex(current =>
					current === HERO_IMAGES.length - 1 ? 0 : current + 1
				);
				await sleep(60);
				if (!isMounted) return;
				setPhase('visible');
			}
		};

		void run();

		return () => {
			isMounted = false;
			if (timeoutId) window.clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div className="relative min-h-screen overflow-hidden bg-odin-dark-200 text-odin-dark-1000">
			<div className="relative z-50 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-10">
				<Header />

				<main className="mt-auto grid gap-8 pb-15 md:pb-6 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
					<div className="relative max-w-2xl overflow-hidden px-0 p-2 ">
						<h2 className="mt-1 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
							Where truth is tested
						</h2>
						<p className="font-gelasio text-3xl italic  mt-2 md:mt-0 leading-[1.05] text-odin-dark-1000 sm:text-5xl md:text-6xl">
							in every claim.
						</p>

						<p className="mt-5 max-w-xl text-sm font-inter text-odin-dark-1000-a-65 sm:text-base">
							Proofline follows trending stories, verifies each one with
							citations, and publishes clear verdicts so readers can see
							what is known, what is disputed, and what still needs more
							evidence.
						</p>

						<div className="mt-8 flex items-center gap-3">
							<Link
								to="/stories"
								className="rounded-full border border-odin-dark-1000-a-20 bg-odin-dark-1000 px-6 py-2.5 text-sm font-semibold text-odin-dark-0 transition hover:-translate-y-0.5 hover:bg-white sm:px-7 sm:py-3 sm:text-base"
							>
								View Stories
							</Link>
							<Link
								to="/about"
								className="flex h-10 w-10 items-center justify-center rounded-full border border-odin-dark-1000-a-20 bg-odin-dark-1000 text-odin-dark-0 transition hover:-translate-y-0.5 hover:bg-white hover:text-odin-dark-0 sm:h-12 sm:w-12"
								aria-label="About Proofline"
							>
								<BookOpen size={18} />
							</Link>
						</div>
					</div>
				</main>
			</div>

			<motion.img
				key={HERO_IMAGES[activeImageIndex]}
				className="absolute inset-0 z-10 h-full w-full object-cover brightness-50"
				src={HERO_IMAGES[activeImageIndex]}
				alt=""
				initial={{ opacity: 0, scale: 1 }}
				animate={
					phase === 'visible'
						? { opacity: 1, scale: 1.2 }
						: phase === 'fadingOut'
							? { opacity: 0, scale: 1.2 }
							: phase === 'reset'
								? { opacity: 0, scale: 1 }
								: { opacity: 0, scale: 1 }
				}
				transition={
					phase === 'visible'
						? {
								opacity: {
									duration:
										(hasInitialFadeCompleted
											? FADE_IN_MS
											: FIRST_FADE_IN_MS) / 1000,
									ease: 'easeInOut',
								},
								scale: {
									duration: ZOOM_DURATION_MS / 1000,
									delay: ZOOM_START_DELAY_MS / 1000,
									ease: 'linear',
								},
							}
						: phase === 'fadingOut'
							? {
									opacity: {
										duration: FADE_OUT_MS / 1000,
										ease: 'easeInOut',
									},
									scale: {
										duration: 0,
									},
								}
							: phase === 'reset'
								? {
										opacity: {
											duration: 0,
										},
										scale: {
											duration: GAP_MS / 1000,
											ease: 'linear',
										},
									}
								: {
										opacity: {
											duration: FADE_OUT_MS / 1000,
											ease: 'easeInOut',
										},
										scale: {
											duration: FADE_OUT_MS / 1000,
											ease: 'easeInOut',
										},
									}
				}
			/>
			<span className="absolute inset-0 z-20 bg-odin-dark-0-a-30" />
			<span className="absolute bottom-0 left-0 z-20 h-full md:h-[70%] w-full bg-linear-to-b from-transparent via-transparent to-black" />
		</div>
	);
}
