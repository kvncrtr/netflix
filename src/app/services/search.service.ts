import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm: string;
  searchTerm$ = new Subject<string>();

  setSearchTerm(term: string) {
    this.searchTerm = term;
    this.searchTerm$.next(term);
  }

  getSearchTerm(): string {
    return this.searchTerm;
  }
}







