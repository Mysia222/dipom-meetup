import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import {MeetupsService} from '../../services/meetups.service';
import {FavoritesService} from '../../services/favs.service';
import {AuthService} from '../../services/auth.service';
import { Favorite } from '../../models/fav';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',  
  styleUrls: ['./favs.component.css'],
  providers: [MeetupsService, AuthService, FavoritesService]
})

export class FavsComponent  {

  @Input() fav;
  profile;
  idMeetup;
  meetupObs

  constructor(private meetupsService: MeetupsService, private favoritesService: FavoritesService, private authService: AuthService) {
  }

 
  ngOnInit() {
    this.idMeetup = this.fav.meetupId;
    this.meetupObs = this.meetupsService.getMeetupById(this.idMeetup);
    
}
  
}