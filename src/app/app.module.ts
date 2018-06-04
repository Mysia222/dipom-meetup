import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MeetupsComponent } from './components/meetups/meetups.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditComponent } from './components/edit/edit.component';
import { MeetupComponent } from './components/meetup/meetup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { FavsComponent } from './components/favs/favs.component';
import { CommentComponent } from './components/comment/comment.component';
import { MapComponent } from './components/map/map.component';
import { TrackmeComponent } from './components/trackme/trackme.component';
import { AddmeetupComponent } from './components/addmeetup/addmeetup.component';
import { MeetuplistComponent } from './components/meetuplist/meetuplist.component';

import { AuthService} from './services/auth.service';
import { UsersService } from './services/users.service';
import { FavoritesService } from './services/favs.service';
import { MeetupsService } from './services/meetups.service';
import { MapService } from './services/map.service';

import { HttpModule } from '@angular/http';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { categoryFilterPipe } from './pipes/categoryFilter.pipe';
import { AuthGuard } from './guards/auth.guard'; //add admin Guard

import { ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MaterializeModule } from 'angular2-materialize';
// import { JwtModule } from '@auth0/angular-jwt';
//import { EditorModule } from './components/editor/editor.module';
import { EditorComponent } from './components/editor/editor.component';

// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

export function tokenGetter() {
  return localStorage.getItem('mean-token');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MeetupsComponent,
    EditComponent,
    FilterPipe,
    SortPipe,
    categoryFilterPipe,
    MeetupComponent,
    FavsComponent,
    ProfileComponent,
    NavbarComponent,
    UsersComponent,
    CommentComponent,
    MapComponent,
    TrackmeComponent,
    AddmeetupComponent,
    EditorComponent,
    MeetuplistComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAkonYfV76WBEr0t7bPHCOrCL6FyjtMz6o'
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    AppRoutingModule,
    Ng2CarouselamosModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MaterializeModule
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       return localStorage.getItem('mean_token');
    //     },
    //     whitelistedDomains: ['localhost:8000/auth/']
    //   }
    // })
  ],
  providers: [AuthService, AuthGuard, UsersService, MeetupsService, FavoritesService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
