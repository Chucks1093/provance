import { create } from 'zustand';

// Profile type sample
export const demoUser = {
	age: 28,
	country: 'Nigeria',
	createdAt: '2025-09-08T10:00:00.000Z',
	// credentials: null,
	dateOfBirth: '1997-05-14',
	description: 'Full-stack developer with a passion for fintech solutions.',
	educationLevel: "Bachelor's Degree",
	email: 'demo.useer@example.com',
	emailVerified: true,
	firstName: 'John',
	gender: 'Male',
	howDidYouHearAboutUs: 'Friend referral',
	id: 'user_123456789',
	imageLink: 'https://randomuser.me/api/portraits/men/32.jpg',
	lastName: 'Doe',
	profilePicture: '/icons/avatar.png',
	phoneNumber: '09123456789',
	stateOfResidence: 'Lagos',
	status: 'active',
	authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.token.example',
};

type UserProfile = typeof demoUser;

// Simple profile store
interface ProfileStore {
	profile: UserProfile | null;
	setProfile: (profile: UserProfile) => void;
	clearProfile: () => void;
}

// Create the Zustand store
export const useProfileStore = create<ProfileStore>(set => ({
	profile: demoUser,

	setProfile: (profile: UserProfile) => {
		set({ profile });
	},

	clearProfile: () => {
		set({ profile: null });
	},
}));
