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
  isDialogOpen = false;
  processValidation = false;
  isDelete = false;
  @Input() isAdmin;
  @Input() comment;
  @Input() oncemeetup;
  commentForm: FormGroup;
  answer: FormControl;
  constructor(
    private meetupsService: MeetupsService, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router:Router) {
  }
 
  openModal() {
    this.isDialogOpen = true;

  }
  createForm() {
    this.answer = new FormControl('', 
    Validators.required
    );
    this.commentForm = new FormGroup({
      answer: this.answer
    });
    
    }

  getMeetupById(meetupId) 
  {
    this.meetupObs = this.meetupsService.getMeetupById(meetupId);
  }

  onСommentFormSubmit() {

    // let profile = this.authService.isLoggedIn()
    // let answer = {
    //   answer: this.commentForm.value.answer
    // };
console.log("sd\asd");
console.log(this.oncemeetup)
    // this.meetupsService.updateMeetup(answer)
    //     .subscribe(data => {
    //       console.log(data);
    //       //this.getAllMeetups();
    //     });
    this.isDialogOpen = false;
    //this.router.navigate(['/profile']);
}

  ngOnInit() {

    this.currentUrl = this.activatedRoute.snapshot.params;
    this.getMeetupById(this.currentUrl.id);
    this.createForm();

  }

}