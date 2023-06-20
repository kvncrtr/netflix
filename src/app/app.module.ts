import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Modules */ 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

/* Components */ 
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchBarComponent,
    PreviewCardComponent,
    TvSeriesComponent,
    BookmarkComponent,
    HomeComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
