import { Injectable, OnInit } from "@angular/core";

@Injectable({
   providedIn: 'root'
})
export class BookmarkService implements OnInit {
   isBookmarked: boolean = false;
   
   constructor() {}

   ngOnInit(): void {
      
   }
}