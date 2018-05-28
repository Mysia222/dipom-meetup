import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { MeetupComponent } from './components/meetup/meetup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { MeetupsComponent } from './components/meetups/meetups.component';
import { MeetuplistComponent } from './components/meetuplist/meetuplist.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [

  { 
    path: '*',
    component: HomeComponent
  },
  { 
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'meetups/edit',
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'meetups/:id',
    component: MeetupComponent
  },

  {
    path: 'meetups/category/:id',
    component: HomeComponent
  },
  {
    path: 'meetups',
    component: MeetuplistComponent
  },
  
  {
      path: '**',
      component: HomeComponent
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule {}