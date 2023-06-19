import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Modules */ 
import { ReactiveFormsModule } from '@angular/forms';

/* Components */ 
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
