import { env } from '@/utils/env.utils';
import axios, { type AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

export interface APIResponse<T = undefined> {
	success: boolean;
	data: T;
	message: string;
}

export interface APIErrorResponse {
	success: false;
	message: string;
	code?: string;
	errors?: Array<{
		field?: string;
		message: string;
	}>;
}

export class ApiError extends Error {
	public status: number;
	public response?: APIErrorResponse;

	constructor(
		message: string,
		status: number = 500,
		response?: APIErrorResponse
	) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.response = response;
	}
}

// BASE CLASS - All services inherit from this
export class BaseApiService {
	protected api: AxiosInstance;
	protected API_URL: string;
	private ACCESS_TOKEN: string = 'proofline_access_token';
	private REFRESH_TOKEN: string = 'proofline_refresh_token';
	private AUTH_SESSION_TOKEN_KEY: string = 'proofline_session_token';
	private AUTH_USER_PROFILE_KEY: string = 'proofline_user';
	private REDIRECT_AFTER_LOGIN_KEY: string = 'proofline_redirect_after_login';

	constructor() {
		this.API_URL = env.VITE_BACKEND_URL;

		this.api = axios.create({
			baseURL: this.API_URL,
			withCredentials: true, // Send cookies
		});

		this.setupInterceptors();
	}

	private setupInterceptors() {
		this.api.interceptors.request.use(config => {
			const token = localStorage.getItem('proofline_session_token');
			if (!token) return config;

			config.headers = config.headers ?? {};
			config.headers.Authorization = `Bearer ${token}`;
			return config;
		});

		// Response interceptor - handles token refresh
		this.api.interceptors.response.use(
			response => response,
			async error => {
				const originalRequest = error.config;
				const status = error?.response?.status;
				const message =
					(error?.response?.data?.message as string | undefined) ?? '';

				const isSessionExpired =
					status === 401 &&
					(message.toLowerCase().includes('invalid or expired session') ||
						message.toLowerCase().includes('authentication required'));

				if (
					error.response?.status === 401 &&
					error.response?.data?.code === 'TOKEN_EXPIRED' &&
					!originalRequest._retry
				) {
					originalRequest._retry = true;

					try {
						// Call refresh endpoint
						await this.api.post('/auth/refresh');

						// Retry original request
						return this.api(originalRequest);
					} catch (refreshError) {
						// Refresh failed - clear auth and redirect
						this.clearAuth();
						window.location.href = '/login';
						return Promise.reject(refreshError);
					}
				}

				if (isSessionExpired) {
					const currentPath =
						typeof window !== 'undefined'
							? `${window.location.pathname}${window.location.search}`
							: '/stories';
					const isAuthPath =
						typeof window !== 'undefined' &&
						window.location.pathname.startsWith('/auth/');

					this.clearAuth();

					if (typeof window !== 'undefined' && !isAuthPath) {
						localStorage.setItem(
							this.REDIRECT_AFTER_LOGIN_KEY,
							currentPath
						);
						window.location.href = `/auth/login?redirect=${encodeURIComponent(
							currentPath
						)}`;
					}
				}

				return Promise.reject(error);
			}
		);
	}

	// Store authentication token in cookie
	public setAuthToken(token: string): void {
		// Store token with expiry of 7 days
		Cookies.set(this.ACCESS_TOKEN, token, {
			expires: 7,
		});
	}

	// Common error handler
	protected handleError(error: unknown): ApiError {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<APIErrorResponse>;

			if (axiosError.response) {
				const status = axiosError.response.status;
				const data = axiosError.response.data;
				const message = data?.message || 'An error occurred';

				return new ApiError(message, status, data);
			} else if (axiosError.request) {
				return new ApiError('Network error - check your connection', 0);
			}
		}

		if (error instanceof Error) {
			return new ApiError(error.message, 500);
		}

		return new ApiError('Something went wrong', 500);
	}

	// Override this in child classes if needed
	protected clearAuth(): void {
		Cookies.remove(this.ACCESS_TOKEN);
		Cookies.remove(this.REFRESH_TOKEN);
		localStorage.removeItem(this.AUTH_SESSION_TOKEN_KEY);
		localStorage.removeItem(this.AUTH_USER_PROFILE_KEY);
	}
}
