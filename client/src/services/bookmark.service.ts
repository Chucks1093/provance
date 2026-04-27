import { BaseApiService, type APIResponse } from './api.service';

interface BookmarkStatusResponse {
   storyId: string;
   bookmarked: boolean;
}

export interface StoryBookmarkItem {
   bookmarkId: string;
   bookmarkedAt: string;
   storyId: string;
   trendId: string;
   headline: string;
   title: string;
   subtitle: string;
   verdict: string;
   confidence: number;
   imageUrl: string | null;
   storyCreatedAt: string;
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
}

interface MyBookmarksResponse {
   bookmarks: StoryBookmarkItem[];
}

class BookmarkService extends BaseApiService {
   async getStoryBookmarkStatus(storyId: string): Promise<boolean> {
      const response = await this.api.get<APIResponse<BookmarkStatusResponse>>(
         `/stories/${storyId}/bookmark`
      );
      return response.data.data.bookmarked;
   }

   async createStoryBookmark(storyId: string): Promise<boolean> {
      const response = await this.api.post<APIResponse<BookmarkStatusResponse>>(
         `/stories/${storyId}/bookmark`
      );
      return response.data.data.bookmarked;
   }

   async deleteStoryBookmark(storyId: string): Promise<boolean> {
      const response = await this.api.delete<APIResponse<BookmarkStatusResponse>>(
         `/stories/${storyId}/bookmark`
      );
      return response.data.data.bookmarked;
   }

   async getMyBookmarks(): Promise<StoryBookmarkItem[]> {
      const response = await this.api.get<APIResponse<MyBookmarksResponse>>(
         '/profile/bookmarks'
      );
      return response.data.data.bookmarks;
   }
}

export const bookmarkService = new BookmarkService();
