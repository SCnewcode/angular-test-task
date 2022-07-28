import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UniversitiesDataComponent } from './search-compomnent/universities-component';
import { HttpClientModule } from '@angular/common/http';
import { UniversitiesDataModule } from './search-compomnent/universities-component.module';

@NgModule({
  declarations: [
    AppComponent,
    UniversitiesDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UniversitiesDataModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
