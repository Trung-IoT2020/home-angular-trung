import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClipboardModule} from "ngx-clipboard";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {JwtInterceptor, JwtModule} from "@auth0/angular-jwt";
import {EnvironmentsService} from "../_services/environments.service";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {CookieService} from "ng2-cookies";
import {SharedModule} from "../_modules/shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClipboardModule,
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
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    EnvironmentsService,
    {
      provide: APP_INITIALIZER,
      useFactory: (envService: EnvironmentsService) => () => envService.init(),
      deps: [EnvironmentsService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
