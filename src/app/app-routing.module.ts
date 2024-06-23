import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AddComponent } from './add/add.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { MoodHistoryComponent } from './mood-history/mood-history.component';
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: EditQuestionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'header', children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]},
  { path: 'history', component: MoodHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
