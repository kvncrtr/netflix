import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchControl = new FormControl();

  constructor(private searchService: SearchService) {
    this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.search(searchTerm);
    })
  }

  search(searchTerm: string) {
    this.searchService.setSearchTerm(searchTerm);
  }
}
