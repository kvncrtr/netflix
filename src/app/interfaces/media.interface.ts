export interface Media {
      title: string;
      id?: string,
      thumbnail: {
         regular: {
            small: string;
            medium: string;
            large: string;
         };
         trending?: {
            small: string;
            large: string;
         };
      };
      year: number;
      category: string;
      rating: string;
      isBookmarked: boolean;
      isTrending: boolean;
} 