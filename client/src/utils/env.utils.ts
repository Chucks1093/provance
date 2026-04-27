import { z } from 'zod';

const envSchema = z.object({
	VITE_BACKEND_URL: z.string().default('/api'),
});

export const env = envSchema.parse({
	VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
});
