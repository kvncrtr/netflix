export interface User {
   username: string,
   id: number,
   password: string,
   bookmark: Movie[]
} 

interface Thumbnail {
   regular: {
     small: string;
     medium: string;
     large: string;
   };
}

interface Movie {
   title: string;
   thumbnail: Thumbnail;
   year: number;
   category: string;
   rating: string;
}