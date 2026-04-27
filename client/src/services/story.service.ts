import { BaseApiService, type APIResponse } from './api.service';

export type StoryVerdict = 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED';

export interface StoryCitation {
	rank: number;
	url: string;
	title: string;
	publisher: string;
	publishedAt: string | null;
	snippet: string;
	faviconUrl: string | null;
	sourceType: string;
	reliability: string;
}

export interface StoryListItem {
	id: string;
	headline: string;
	title: string;
	subtitle: string;
	verdict: StoryVerdict;
	confidence: number;
	imageUrl: string | null;
	createdAt: string;
	trend: {
		id: string;
		title: string;
		category: string;
		url: string;
	} | null;
	citationsCount: number;
	sourcePreviews: Array<{
		rank: number;
		url: string;
		publisher: string;
		imageUrl: string | null;
		faviconUrl: string | null;
	}>;
	isBookmarked?: boolean;
}

export interface StoryDetail {
	id: string;
	headline: string;
	title: string;
	subtitle: string;
	bodyMarkdown: string;
	verdict: StoryVerdict;
	confidence: number;
	imageUrl: string | null;
	createdAt: string;
	updatedAt: string;
	trend: {
		id: string;
		title: string;
		category: string;
		url: string;
		publishedAt: string | null;
	};
	citations: StoryCitation[];
}

export interface StoryListResponse {
	stories: StoryListItem[];
	pagination: {
		total: number;
		limit: number;
		offset: number;
		hasMore: boolean;
	};
}

export interface GetStoriesParams {
	limit?: number;
	offset?: number;
}

export interface SourcePublisherItem {
	publisher: string;
	faviconUrl: string | null;
	storyCount: number;
}

export interface FollowedSourcePublisherItem {
	publisher: string;
	publisherKey: string;
}

class StoryService extends BaseApiService {
	async getStories(params?: GetStoriesParams): Promise<StoryListResponse> {
		try {
			const response = await this.api.get<APIResponse<StoryListResponse>>(
				'/stories',
				{ params }
			);

			return response.data.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async getStory(storyId: string): Promise<StoryDetail> {
		try {
			const response = await this.api.get<APIResponse<StoryDetail>>(
				`/stories/${storyId}`
			);

			return response.data.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async getSourcePublishers(limit = 60): Promise<SourcePublisherItem[]> {
		try {
			const response = await this.api.get<
				APIResponse<{ publishers: SourcePublisherItem[] }>
			>('/stories/publishers', {
				params: { limit },
			});

			return response.data.data.publishers;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async getFollowedSourcePublishers(): Promise<FollowedSourcePublisherItem[]> {
		try {
			const response = await this.api.get<
				APIResponse<{ publishers: FollowedSourcePublisherItem[] }>
			>('/stories/publishers/following');
			return response.data.data.publishers;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async followSourcePublisher(
		publisher: string
	): Promise<FollowedSourcePublisherItem> {
		try {
			const response = await this.api.post<
				APIResponse<FollowedSourcePublisherItem>
			>('/stories/publishers/follow', {
				publisher,
			});
			return response.data.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async unfollowSourcePublisher(publisher: string): Promise<string> {
		try {
			const response = await this.api.delete<
				APIResponse<{ publisherKey: string }>
			>('/stories/publishers/follow', {
				data: { publisher },
			});
			return response.data.data.publisherKey;
		} catch (error) {
			throw this.handleError(error);
		}
	}
}

export const storyService = new StoryService();
