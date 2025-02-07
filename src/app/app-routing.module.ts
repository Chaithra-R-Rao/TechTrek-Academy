import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PopularcourseComponent } from './popularcourse/popularcourse.component';
import { ContactComponent } from './contact/contact.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { FacultyDashboardComponent } from './faculty-dashboard/faculty-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { QuizLearnComponent } from './quizlearn/quizlearn.component';

import { RoleGuard } from './role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [LoginGuard]  },
  { path: 'popularcourse', component: PopularcourseComponent },
  { path: 'all-courses', component: AllCoursesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'quiz-learn', component: QuizLearnComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'student' }},
  
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'student' } },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'faculty-dashboard', component: FacultyDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'teacher' } },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
