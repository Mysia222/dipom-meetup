import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import {MeetupsService} from '../../services/meetups.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',  
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})

export class UsersComponent  {

  usersObs;

  constructor( private usersService: UsersService) {
  }
 
  ngOnInit() {

    this.usersObs = this.usersService.getAllUsers();
    console.log(this.usersObs);

  }
  
}