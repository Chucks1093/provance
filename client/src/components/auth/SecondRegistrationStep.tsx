import { Fragment } from 'react/jsx-runtime';
import { cn } from '@/lib/utils';

type SecondRegistrationStepProps = {
	selectedAvatar: string;
	onSelectAvatar: (avatarPath: string) => void;
};

const AVATARS = [
	'/avatars/avatar-1.png',
	'/avatars/avatar-2.png',
	'/avatars/avatar-3.png',
	'/avatars/avatar-4.png',
	'/avatars/avatar-5.png',
	'/avatars/avatar-6.png',
	'/avatars/avatar-7.png',
];

function SecondRegistrationStep({
	selectedAvatar,
	onSelectAvatar,
}: SecondRegistrationStepProps) {
	return (
		<Fragment>
			<div className="mt-20">
				<h1 className="font-jakarta text-3xl font-semibold text-odin-dark-1000">
					Choose your avatar
				</h1>
				<p className="mt-4 font-jakarta text-odin-dark-1000-a-65">
					Pick one to personalize your profile.
				</p>
			</div>

			<div className="mt-8 grid grid-cols-3 sm:grid-cols-4 gap-4">
				{AVATARS.map(avatar => {
					const isSelected = selectedAvatar === avatar;

					return (
						<button
							key={avatar}
							type="button"
							onClick={() => onSelectAvatar(avatar)}
							className={cn(
								'size-20 rounded-full p-1 transition-all duration-200 outline-none cursor-pointer justify-self-start',
								isSelected
									? 'opacity-100 ring-2 ring-odin-dark-1000-a-65 ring-offset-2 ring-offset-odin-dark-200'
									: 'opacity-45 hover:opacity-70 hover:ring-2 hover:ring-odin-dark-500 hover:ring-offset-2 hover:ring-offset-odin-dark-200'
							)}
						>
							<img
								src={avatar}
								alt="Avatar"
								className="size-full rounded-full object-cover"
							/>
						</button>
					);
				})}
			</div>
		</Fragment>
	);
}

export default SecondRegistrationStep;
