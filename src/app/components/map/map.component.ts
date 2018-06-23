import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { MeetupsService } from '../../services/meetups.service';
import { AuthService } from '../../services/auth.service';

import { Meetup } from '../../models/meetup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FavoritesService} from '../../services/favs.service';
import { Favorite } from '../../models/fav';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',  
  styleUrls: ['./map.component.css'],
  providers: [MeetupsService]
})

export class MapComponent  {
  title: string = 'Месторасположение';
  lat = 53.9312962;
  lng = 27.6461437;
  @Input() meetup;

  constructor(
    private meetupsService: MeetupsService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router:Router) {
  }
 
  ngOnInit() {
  if (this.meetup._id == "5b297ecebfd52e0f989e1ebc") {
    this.lat = 55.727024;
    this.lng = 37.5796889;
  } 
  if(this.meetup._id == "5b297506bfd52e0f989e1eba") {
    this.lat = 53.8906642;
    this.lng = 27.5373119;
  }
  if(this.meetup._id == "5b2e1f7406669104602ae1de") {
    this.lat = 53.9312962;
    this.lng = 27.6461437;
  }
}
 

}