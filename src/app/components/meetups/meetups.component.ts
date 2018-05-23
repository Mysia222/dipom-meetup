import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { MeetupsService } from '../../services/meetups.service';
import {FavoritesService} from '../../services/favs.service';
import {AuthService} from '../../services/auth.service';
import { Favorite } from '../../models/fav';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',  
  styleUrls: ['./meetups.component.css'],
  providers: [MeetupsService, AuthService, FavoritesService]
})

export class MeetupsComponent  {

  @Input() meetup;
  @Input() category;
  @Input() isUser;
  profile;
  isFavEdded = false;
  openWindow = false;
  obj: Favorite;

  constructor(private meetupsService: MeetupsService, private favoritesService: FavoritesService, private authService: AuthService) {
  }

  addToFav(meetupId) {
    
   
     this.isFavEdded = true;
     this.openWindow = true;
     this.profile = this.authService.isLoggedIn();
     this.obj = {
     meetupId: meetupId, 
     userId: this.profile._id, 
     count: 1
     }
       this.favoritesService.createFav(this.obj).subscribe(data => {
     });

       this.meetupsService.getMeetupById(meetupId).subscribe(
           meetup => {
               meetup.meetupData.rating = meetup.meetupData.rating + 1;
               this.meetupsService.updateMeetup(meetup, meetupId)
                   .subscribe(successCode => {
                   },
                   errorCode => {});
           }
       );
      setTimeout(function(){ this.openWindow = false; }, 900);
  }


  deleteToFav(meetupId) {
  
    this.isFavEdded = false;
    this.openWindow = false;
    this.profile = this.authService.isLoggedIn();
    this.favoritesService.getFavsByUserId(this.profile._id).subscribe(favs => {
      console.log(favs);
      favs.forEach(element => {
        if(element.meetupId === meetupId) {
          this.favoritesService.deleteFav(element._id).subscribe(data => {
          });
        }
      });
    });
 }


  ngOnInit() {
    
  }
  
}