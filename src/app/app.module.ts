import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Modules */ 
import { ReactiveFormsModule } from '@angular/forms';

/* Components */ 
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchBarComponent,
    PreviewCardComponent,
    TvSeriesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
