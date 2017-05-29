import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component';
import { QuizComponent } from './quiz/quiz.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'question', component: QuestionComponent },
    { path: 'quiz', component: QuizComponent },
];
export const routing = RouterModule.forRoot(APP_ROUTES);
