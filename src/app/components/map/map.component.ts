import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { MeetupsService } from '../../services/meetups.service';
import { AuthService } from '../../services/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',  
  styleUrls: ['./map.component.css'],
  providers: [MeetupsService]
})

export class MapComponent  {
  title: string = 'Месторасположение';
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    private meetupsService: MeetupsService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router:Router) {
  }
 
  ngOnInit() {


  }

}