import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { MeetupsService } from '../../services/meetups.service';
import { AuthService } from '../../services/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',  
  styleUrls: ['./comment.component.css'],
  providers: [MeetupsService]
})

export class CommentComponent  {
  currentUrl;
  meetup;
  statusCode: number;
  meetupObs;
  isDelete = false;
  @Input() isAdmin;
  @Input() comment;

  constructor(
    private meetupsService: MeetupsService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router:Router) {
  }
 

  getMeetupById(meetupId) 
  {
    this.meetupObs = this.meetupsService.getMeetupById(meetupId);
  }

  onUpdateMeetupSubmit() {

}

  ngOnInit() {

    this.currentUrl = this.activatedRoute.snapshot.params;
    this.getMeetupById(this.currentUrl.id);

  }

}