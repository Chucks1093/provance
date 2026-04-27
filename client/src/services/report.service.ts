import { BaseApiService, type APIResponse } from './api.service';

export type ReportTargetType = 'STORY' | 'COMMENT';
export type ReportReason =
	| 'MISINFORMATION'
	| 'HARASSMENT'
	| 'SPAM'
	| 'HATE'
	| 'OTHER';

export interface CreateReportPayload {
	targetType: ReportTargetType;
	targetId: string;
	reason: ReportReason;
	details?: string;
}

export interface ReportResponse {
	id: string;
	targetType: ReportTargetType;
	targetId: string;
	reason: ReportReason;
	details: string | null;
	status: 'OPEN' | 'REVIEWED' | 'DISMISSED' | 'ACTIONED';
	createdAt: string;
}

class ReportService extends BaseApiService {
	async createReport(payload: CreateReportPayload): Promise<ReportResponse> {
		try {
			const response = await this.api.post<APIResponse<ReportResponse>>(
				'/reports',
				payload
			);

			return response.data.data;
		} catch (error) {
			throw this.handleError(error);
		}
	}
}

export const reportService = new ReportService();
