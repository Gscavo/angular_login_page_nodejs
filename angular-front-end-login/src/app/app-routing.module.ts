import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path:'', 
    component: HomeComponent,
    
  },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'signUp',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
