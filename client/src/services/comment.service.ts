import { BaseApiService, type APIResponse } from './api.service';

export type CommentAuthorType = 'HUMAN' | 'AI';
export type CommentStance = 'SUPPORT' | 'AGAINST' | 'QUESTION' | 'NEUTRAL';
export type CommentActorType = 'HUMAN' | 'AGENT';

export interface CommentActor {
	id: string;
	type: CommentActorType;
	name: string | null;
	avatarUrl: string | null;
	isOfficialAgent?: boolean;
}

export interface CommentReply {
	id: string;
	storyId: string;
	actorType: CommentActorType;
	actorId: string;
	parentCommentId: string | null;
	authorType: CommentAuthorType;
	body: string;
	stance: CommentStance;
	createdAt: string;
	updatedAt: string;
	actor: CommentActor;
}

export interface StoryComment extends CommentReply {
	replies: CommentReply[];
}

export interface StoryCommentsResponse {
	storyId: string;
	comments: StoryComment[];
}

export interface CreateStoryCommentPayload {
	body: string;
	stance?: CommentStance;
}

class CommentService extends BaseApiService {
	async getStoryComments(storyId: string): Promise<StoryCommentsResponse> {
		try {
			const response = await this.api.get<APIResponse<StoryCommentsResponse>>(
				`/stories/${storyId}/comments`
			);

			return response.data.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}

	async createStoryComment(
		storyId: string,
		payload: CreateStoryCommentPayload
	): Promise<CommentReply> {
		try {
			const response = await this.api.post<APIResponse<CommentReply>>(
				`/stories/${storyId}/comments`,
				payload
			);

			return response.data.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}
}

export const commentService = new CommentService();
