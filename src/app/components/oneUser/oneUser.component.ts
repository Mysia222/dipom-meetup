import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsersService} from '../../services/users.service';
import {FavoritesService} from '../../services/favs.service';
import { MeetupsService } from '../../services/meetups.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
  selector: 'app-oneUser',
  templateUrl: './oneUser.component.html',  
  styleUrls: ['./oneUser.component.css'],
  providers: []
})

export class oneUserComponent  {
  currentUrl;
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
  profile;
  blocked= false;
  pictureUrl = "./assets/img/profile.png";
  file:File;
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
  lastName: new FormControl('', Validators.required),
  avatar: new FormControl('')
});


  constructor(    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router:Router,
    private usersService: UsersService,
    private favoritesService: FavoritesService,
    private meetupsService: MeetupsService) {
  }
 

  ngOnInit() {
    console.log("dsaf");
    this.currentUrl = this.activatedRoute.snapshot.params;

    this.favsObs = this.favoritesService.getFavsByUserId(this.currentUrl.id); 
    this.meetupsObs = this.meetupsService.getAllMeetups();

      this.usersService.getAllUsers()
      .subscribe(data => {
        console.log(data);
        data.forEach(user => {
          if( user._id === this.currentUrl.id) {
            this.profile = user;
          }
        });
        console.log(this.profile)
        
    });
    // this.yourfavsObs = this.(this.profile._id); 
    // createUser: req.body.createUser
    // //this.yourfavsObs =  this.favoritesService.getFavsByUserCreate(this.profile._id); 
  }
  editProfile() {
    this.isEdit = true;
  }
  saveProfile(path) {
    
    this.isEdit = false;
    const users = {
      email: this.EditProfileForm.value.email,
      firstName: this.EditProfileForm.value.firstName,
      lastName: this.EditProfileForm.value.lastName,
      image: path   
    };
    let user =  this.authService.isLoggedIn();
    for (var key in user) {
      if (!users[key]) {
        users[key] = user[key];
      }
     }
     console.log(users)
    this.usersService.updateUser(this.profile._id, users).subscribe(
      user => {
          console.log(user);
          this.pictureUrl = user.image
          this.profile = this.authService.isLoggedIn();
          this.router.navigate(['profile']);

        }
    );
    
  }

  blockUser(id) {
    console.log(id);
    this.isEdit = false;
    this.blocked = true;
    // const users = {
    //   email: this.EditProfileForm.value.email,
    //   firstName: this.EditProfileForm.value.firstName,
    //   lastName: this.EditProfileForm.value.lastName,
    //   image: 'Lighthouse.jpg',
    //   isBlock: true   
    // };
    // let user =  this.authService.isLoggedIn();
    // for (var key in user) {
    //   if (!users[key]) {
    //     users[key] = user[key];
    //   }
    //  }

    //  console.log(users)
    // this.usersService.updateUser(this.profile._id, users).subscribe(
    //   user => {
    //       console.log(user);
    //       this.pictureUrl = user.image
    //       this.profile = this.authService.isLoggedIn();
    //       this.router.navigate(['profile']);

    //     }
    // );
  }

  onFileChange(event) {
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file)
      //this.EditProfileForm.get('avatar').setValue(file);
    }
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