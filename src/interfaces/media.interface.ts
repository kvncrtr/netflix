export interface Media {
   category: string,
   id?: string,
   isBookmarked: boolean,
   isTrending: boolean,
   rating: string,
   thumbnail: {
      regular: {
         large: string,
         medium: string,
         small: string
      },
      trending: {
         large: string,
         small: string
      }
   },
   title: string,
   year: number
} 