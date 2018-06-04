import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService} from '../../services/users.service';
import {FavoritesService} from '../../services/favs.service';
import { MeetupsService } from '../../services/meetups.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',  
  styleUrls: ['./profile.component.css'],
  providers: []
})

export class ProfileComponent  {
  currentUrl;
  profile;
  statusCode: number;
  meetupObs;
  isYourMeetups = true;
  isMyMeetups = false;
  isDelete = false;
  @Input() isAdmin;
  isDialogOpen = false;
  MeetupForm: FormGroup;
  favsObs;
  meetupsObs
  yourfavsObs;
  isEdit = false;
  EditMeetupForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
});

EditProfileForm = new FormGroup({
  email: new FormControl('', Validators.required),
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required)
});

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router:Router,
    private usersService: UsersService,
    private favoritesService: FavoritesService,
    private meetupsService: MeetupsService) {
  }
 

  ngOnInit() {
    this.profile = this.authService.isLoggedIn();
    this.favsObs = this.favoritesService.getFavsByUserId(this.profile._id); 
    this.meetupsObs = this.meetupsService.getAllMeetups();
    // this.yourfavsObs = this.(this.profile._id); 
    // createUser: req.body.createUser
    // //this.yourfavsObs =  this.favoritesService.getFavsByUserCreate(this.profile._id); 
  }
  editProfile(profileId) {
    this.isEdit = true;
  }
  saveProfile(profileId) {
    
    this.isEdit = false;
  }
  changeYourMeetups() {
    if(this.isYourMeetups) {
      this.isYourMeetups = false;
      this.isMyMeetups=true;
    } else {
      if(this.isMyMeetups) {
        this.isYourMeetups = true;
        this.isMyMeetups=false;
      }

    }
  }

  openModal() {
    this.isDialogOpen = true;
    //document.getElementById('add-meetup-form');
   // this.MeetupForm.reset();
    //document.querySelectorAll('input')
    console.log(this.MeetupForm);
  }
  
}