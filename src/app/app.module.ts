import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClipboardModule} from "ngx-clipboard";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {JwtInterceptor, JwtModule} from "@auth0/angular-jwt";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {CookieService} from "ng2-cookies";
import {SharedModule} from "../_modules/shared/shared.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: (request) => {
          return localStorage.getItem('access_token');
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
