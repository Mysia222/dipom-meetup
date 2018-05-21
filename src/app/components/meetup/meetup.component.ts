import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { MeetupsService } from '../../services/meetups.service';
import { AuthService } from '../../services/auth.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',  
  styleUrls: ['./meetup.component.css'],
  providers: [MeetupsService]
})

export class MeetupComponent  {
  currentUrl;
  meetup;
  statusCode: number;
  meetupObs;
  comment;
  meetupObj;
  descriptionHTML;
  commentsObs;
  isDelete = false;
  public editorContent: string = 'My Document\'s Title'
  @Input() isAdmin;
  title = 'Crystal Editor';
  editorForm = new FormGroup ({
    editorData: new FormControl()
  });
  EditmeetupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    createdBy: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
});

AddCommentForm = new FormGroup({
  commentsTitle: new FormControl('', Validators.required),
  commentsDescription: new FormControl(''),
  commentsRating: new FormControl('', [
    Validators.required,
    Validators.minLength(0),
    Validators.maxLength(5)
  ])
});

  constructor(
    private meetupsService: MeetupsService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router:Router) {
  }
 

  getMeetupById(meetupId) 
  {
    this.meetupObs = this.meetupsService.getMeetupById(meetupId);
    this.meetupsService.getMeetupObjById(meetupId).subscribe(data => {
      this.meetupObj = new String(data.json().meetupData.description)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');console.log(this.meetupObj, data.json())});
  }

  onSubmit () {
    console.log(this.editorForm.value)
  }
  addCommentSubmit() {

    this.comment = this.AddCommentForm.value;
    console.log(this.comment);
    
    this.meetupsService.addComment(this.comment, this.currentUrl.id)
    .subscribe(data => {
    });
}


  onUpdateMeetupSubmit() {

    const meetups = {
      meetupData: this.EditmeetupForm.value,
      createdBy: this.EditmeetupForm.value.createdBy
    };
    this.meetupsService.getMeetupById(this.currentUrl.id).subscribe(
        meetup => {
            console.log(meetup.meetupData);
            for (var key in meetup.meetupData) {
                if (!meetups.meetupData[key]) {
                  meetups.meetupData[key] = meetup.meetupData[key];
                }
            }
            if(!meetups.createdBy) {
              meetups.createdBy = meetup.createdBy;
            }
            console.log("dwad");
            console.log(meetups);
            this.meetupsService.updateMeetup(meetups, this.currentUrl.id)
                .subscribe(successCode => {
                        this.statusCode = successCode;
                        this.meetupObs = this.meetupsService.getMeetupById(this.currentUrl.id);
                },
                errorCode => this.statusCode = errorCode);

        }
    );
}

deletemeetup() {

    this.isDelete = true
    this.meetupsService.deleteMeetupById(this.currentUrl.id)
        .subscribe(successCode => {
            this.statusCode = 204;
        }, errorCode => this.statusCode = errorCode);
        

}

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.commentsObs = this.meetupsService.getComments(this.currentUrl.id);
    this.getMeetupById(this.currentUrl.id);

  }

}