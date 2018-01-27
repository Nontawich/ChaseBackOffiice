
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpProviderService } from "./service/http-provider.service";
import { UtilityProviderService } from "./service/utility-provider.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { CustomOption } from "./shared/toastr/custom-option";
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { RegisterFormComponent } from './registar/register-form/register-form.component';
import { UserProfilePageComponent } from './registar/user-profile/user-profile-page.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import * as $ from 'jquery';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,NotfoundComponent,LoginComponent,RegisterFormComponent,UserProfilePageComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,BrowserModule,
        SharedModule,
        HttpClientModule,FormsModule,HttpModule,
        HttpClientModule,
        ToastModule.forRoot(),
        ReactiveFormsModule,
        Ng2SmartTableModule,
        NgbModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
              }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
        })
    ],
    providers: [
        //Toastr and auth providers 
        HttpProviderService,UtilityProviderService,
        { provide: ToastOptions, useClass: CustomOption },
        AuthService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }