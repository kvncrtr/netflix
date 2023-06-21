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

   // category: string,
   // id?: string,
   // isBookmarked: boolean,
   // isTrending: boolean,
   // rating: string,
   // thumbnail: {
   //    regular: {
   //       large: string,
   //       medium: string,
   //       small: string
   //    },
   //    trending?: {
   //       large: string,
   //       small: string
   //    }
   // },
   // title: string,
   // year: number
} 