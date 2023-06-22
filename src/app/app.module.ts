import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Modules */ 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

/* Components */ 
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TrendingCardComponent } from './components/trending-card/trending-card.component';
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchBarComponent,
    PreviewCardComponent,
    TvSeriesComponent,
    BookmarkComponent,
    HomeComponent,
    MoviesComponent,
    TrendingCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
