import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { TestimoniesComponent } from './testimonies/testimonies.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { PopularcourseComponent } from './popularcourse/popularcourse.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import {FaqService} from './faq.service';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { FacultyDashboardComponent } from './faculty-dashboard/faculty-dashboard.component';

import { RoleGuard } from './role.guard';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChartComponent } from './chart/chart.component';


import { StoreModule } from '@ngrx/store';

import { forgotPasswordReducer } from './store/reducers/forgot-password.reducer';

import { userReducer } from './store/reducers/user.reducer';
import { QuizLearnComponent } from './quizlearn/quizlearn.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { EmailService } from './email.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    FaqComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    TestimoniesComponent,
    SubscribeComponent,
    SignupComponent,
    PopularcourseComponent,
  
    UserDashboardComponent,
    FacultyDashboardComponent,
    AllCoursesComponent,
    AdminDashboardComponent,
    ChartComponent,
    QuizLearnComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    HttpClientModule,

  
    StoreModule.forRoot({ forgotPassword: forgotPasswordReducer }),
    StoreModule.forRoot({ user: userReducer }),

  ],
  providers: [
    provideAnimationsAsync(),
    FaqService,DataService,
    AuthGuard, AuthService,RoleGuard,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
