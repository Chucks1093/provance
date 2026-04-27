import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Bookmark, Globe, Heart, LogOut, Newspaper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { authService, type User } from '@/services/auth.service';
import showToast from '@/utils/toast.util';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type HeaderProps = {
	className?: string;
};

const INTEREST_OPTIONS = [
	{ id: 'world', label: 'World' },
	{ id: 'politics', label: 'Politics' },
	{ id: 'business', label: 'Business' },
	{ id: 'tech', label: 'Tech' },
	{ id: 'global', label: 'Global' },
	{ id: 'sports', label: 'Sports' },
	{ id: 'finance', label: 'Finance' },
	{ id: 'ai', label: 'AI' },
	{ id: 'science', label: 'Science' },
	{ id: 'health', label: 'Health' },
	{ id: 'climate', label: 'Climate' },
	{ id: 'energy', label: 'Energy' },
	{ id: 'crypto', label: 'Crypto' },
	{ id: 'security', label: 'Security' },
	{ id: 'startup', label: 'Startups' },
	{ id: 'media', label: 'Media' },
	{ id: 'culture', label: 'Culture' },
	{ id: 'education', label: 'Education' },
	{ id: 'travel', label: 'Travel' },
	{ id: 'africa', label: 'Africa' },
	{ id: 'europe', label: 'Europe' },
	{ id: 'americas', label: 'Americas' },
] as const;

function getInitials(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return 'PL';
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function Header({ className }: HeaderProps) {
	const navigate = useNavigate();
	const [profile, setProfile] = useState<User | null>(null);
	const [isInterestsDialogOpen, setIsInterestsDialogOpen] = useState(false);
	const [draftInterests, setDraftInterests] = useState<string[]>([]);
	const [savingInterests, setSavingInterests] = useState(false);

	useEffect(() => {
		setProfile(authService.getUser());
	}, []);

	useEffect(() => {
		const onStorage = () => setProfile(authService.getUser());
		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	}, []);

	useEffect(() => {
		setDraftInterests(profile?.interests ?? []);
	}, [profile?.interests]);

	const isAuthenticated = Boolean(profile && authService.getSessionToken());

	const avatarFallback = useMemo(() => {
		if (!profile) return 'PL';
		return getInitials(profile.name);
	}, [profile]);

	const handleLogout = async () => {
		await authService.logout();
		setProfile(null);
		navigate('/');
	};

	const toggleInterest = (interest: string) => {
		setDraftInterests(current =>
			current.includes(interest)
				? current.filter(item => item !== interest)
				: [...current, interest]
		);
	};

	const handleSaveInterests = async () => {
		if (!profile || draftInterests.length === 0 || savingInterests) return;
		try {
			setSavingInterests(true);
			const updated = await authService.completeOnboarding({
				avatarUrl: profile.avatarUrl || '/icons/avatar.png',
				interests: draftInterests,
			});
			setProfile(updated);
			setIsInterestsDialogOpen(false);
			showToast.success('Interests updated');
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'Failed to update interests';
			showToast.error(message);
		} finally {
			setSavingInterests(false);
		}
	};

	return (
		<>
			<header
				className={cn(
					'flex items-center justify-between gap-3 sm:gap-6',
					className
				)}
			>
				<Link to="/" className="flex items-center gap-2 shrink-0">
					<Globe className="text-odin-dark-1000" />
					<p className="font-montserrat text-base font-semibold uppercase tracking-[0.1em] text-odin-dark-1000 sm:text-lg">
						Proofline
					</p>
				</Link>

				<div className="ml-auto flex items-center gap-2 text-sm font-inter text-odin-dark-1000-a-65 sm:gap-4 sm:text-md">
					<Link
						to="/about"
						className="md:block hidden font-montserrat text-lg font-semibold transition hover:text-odin-dark-1000"
					>
						About
					</Link>

					{isAuthenticated && profile ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									className="rounded-full ring-2 ring-odin-dark-1000-a-50 ring-offset-2 ring-offset-odin-dark-200 outline-none transition hover:ring-odin-dark-1000"
									aria-label="Open profile menu"
								>
									<Avatar className="size-7 border border-odin-dark-500">
										<AvatarImage
											src={profile.avatarUrl || '/icons/avatar.png'}
											alt={profile.name}
										/>
										<AvatarFallback className="bg-odin-dark-500 text-odin-dark-1000">
											{avatarFallback}
										</AvatarFallback>
									</Avatar>
								</button>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								align="end"
								className="w-64 rounded-2xl border border-odin-dark-500 bg-odin-dark-200 p-2 text-odin-dark-1000"
							>
								<DropdownMenuLabel className="px-3 py-2">
									<div className="flex items-center gap-3">
										<Avatar className="size-10 border border-odin-dark-500">
											<AvatarImage
												src={
													profile.avatarUrl || '/icons/avatar.png'
												}
												alt={profile.name}
											/>
											<AvatarFallback className="bg-odin-dark-500 text-odin-dark-1000">
												{avatarFallback}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<p className="truncate text-sm font-semibold text-odin-dark-1000">
												{profile.name}
											</p>
											<p className="truncate text-xs text-odin-dark-1000-a-65">
												{profile.email}
											</p>
										</div>
									</div>
								</DropdownMenuLabel>

								<DropdownMenuSeparator className="my-2 bg-odin-dark-500" />

								<DropdownMenuItem
									asChild
									className="rounded-lg px-3 py-2 text-odin-dark-1000-a-65 hover:bg-odin-dark-300 hover:text-odin-dark-1000"
								>
									<Link to="/stories">
										<Newspaper className="size-4" />
										View Stories
									</Link>
								</DropdownMenuItem>

								<DropdownMenuItem
									asChild
									className="rounded-lg px-3 py-2 text-odin-dark-1000-a-65 hover:bg-odin-dark-300 hover:text-odin-dark-1000"
								>
									<Link to="/bookmarks">
										<Bookmark className="size-4" />
										View Bookmarks
									</Link>
								</DropdownMenuItem>

								<DropdownMenuItem
									onClick={() => setIsInterestsDialogOpen(true)}
									className="rounded-lg px-3 py-2 text-odin-dark-1000-a-65 hover:bg-odin-dark-300 hover:text-odin-dark-1000"
								>
									<Heart className="size-4" />
									Your Interests
								</DropdownMenuItem>

								<DropdownMenuSeparator className="my-2 bg-odin-dark-500" />

								<DropdownMenuItem
									onClick={handleLogout}
									className="rounded-lg px-3 py-2 text-odin-dark-1000-a-65 hover:bg-odin-dark-300 hover:text-odin-dark-1000"
								>
									<LogOut className="size-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link
							to="/stories"
							className="rounded-full border border-odin-dark-1000-a-20 bg-odin-dark-1000 px-4 py-1.5 text-xs text-odin-dark-0 transition hover:bg-white sm:px-5 sm:text-sm"
						>
							Get Started
						</Link>
					)}
				</div>
			</header>

			<Dialog
				open={isInterestsDialogOpen}
				onOpenChange={open => {
					setIsInterestsDialogOpen(open);
					if (!open) setDraftInterests(profile?.interests ?? []);
				}}
			>
				<DialogContent className="border-odin-dark-500 bg-odin-dark-300 text-odin-dark-1000 sm:max-w-xl">
					<DialogHeader>
						<DialogTitle>Your Interests</DialogTitle>
						<DialogDescription className="text-odin-dark-1000-a-65">
							Choose the topics you want to see more in your feed.
						</DialogDescription>
					</DialogHeader>

					<div className="max-h-[360px] overflow-y-auto px-2 pt-6">
						<div className="flex flex-wrap gap-2.5">
							{INTEREST_OPTIONS.map(option => {
								const selected = draftInterests.includes(option.id);
								return (
									<button
										key={option.id}
										type="button"
										onClick={() => toggleInterest(option.id)}
										className={cn(
											'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer outline-none',
											selected
												? 'border-odin-dark-700 bg-odin-dark-500 text-odin-dark-1000 ring-2 ring-odin-dark-1000-a-65 ring-offset-2 ring-offset-odin-dark-200'
												: 'border-odin-dark-500 bg-odin-dark-400 text-odin-dark-1000-a-65 hover:border-odin-dark-700 hover:text-odin-dark-1000'
										)}
									>
										{option.label}
									</button>
								);
							})}
						</div>
					</div>

					<DialogFooter>
						<button
							type="button"
							onClick={() => {
								setDraftInterests(profile?.interests ?? []);
								setIsInterestsDialogOpen(false);
							}}
							className="rounded-full border border-odin-dark-500 bg-odin-dark-400 px-4 py-2 text-sm font-semibold text-odin-dark-1000 transition hover:bg-odin-dark-500"
						>
							Cancel
						</button>
						<button
							type="button"
							disabled={draftInterests.length === 0 || savingInterests}
							onClick={handleSaveInterests}
							className="rounded-full border border-odin-dark-500 bg-odin-dark-1000 px-4 py-2 text-sm font-semibold text-odin-dark-200 transition hover:bg-odin-dark-1000-a-85 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{savingInterests ? 'Saving...' : 'Save Changes'}
						</button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
