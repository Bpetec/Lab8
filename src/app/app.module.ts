import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';

import { FormsModule } from '@angular/forms';
// added for ngModel ^
import { ToastModule } from './toast/toast.module';
// adding this import and adding it to the imports is all you need to do to use the toast module from lab 7
import { LoginComponent } from './login/login.component';
import { AppRoutes } from './app.routes';
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    AppRoutes
    // HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

