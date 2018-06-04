import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Input } from '@angular/core/src/metadata/directives';
import { AuthService } from '../../services/auth.service';
import { MeetupsService } from '../../services/meetups.service'
import {Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { create } from 'domain';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',  
  styleUrls: ['./edit.component.css'],
  providers: [MeetupsService]
})
export class EditComponent  {
  public meetups=[];
  public searchableList: any[];
  processValidation = false;
  statusCode: number;
  meetupsObs;
  isAdmin;
  isDialogOpen = false;
  MeetupForm: FormGroup;

  name: FormControl;
  description: FormControl;
  image: FormControl;
  price: FormControl;
  category: FormControl;
  eventsDate: FormControl;
  createdBy: FormControl;
  address: FormControl;


  constructor( private meetupsService: MeetupsService, private authService: AuthService) {

    this.searchableList = ['title'];
   
  }

  getAllMeetups() {

    this.meetupsObs = this.meetupsService.getAllMeetups();
  
}

ngOnInit() {

  this.createFormControls();
  this.createForm();
  this.getAllMeetups();
  this.isAdmin = true;
  
}
createFormControls() {

  this.name = new FormControl('', 
  Validators.required
  );
  this.address = new FormControl('', 
  Validators.required
  );
  this.description = new FormControl('', 
  Validators.required
  );
  this.eventsDate = new FormControl('', 
  Validators.required
  );
  this.price = new FormControl('', [
    Validators.required,
    Validators.pattern("[1-9?]*")
  ]);
  this.image = new FormControl('', [
    Validators.required
  ]);
  this.createdBy = new FormControl('', [
    Validators.required
  ]);
  this.category = new FormControl('',[
    Validators.required
  ]);
}


createForm() {
  
this.MeetupForm = new FormGroup({
  name: this.name,
  description: this.description,
  image: this.image,
  price: this.price,
  category: this.category,
  eventsDate: this.eventsDate,
  createdBy: this.createdBy,
  address: this.address
});

}
onMeetupFormSubmit() {

  this.processValidation = true;
  if (this.MeetupForm.invalid) {
      return;
  }
  let profile = this.authService.isLoggedIn();
  console.log(profile);
  let meetup = {
    meetupData: this.MeetupForm.value,
    createdBy: this.MeetupForm.value.createdBy,
    createUser: profile._id
  };
  console.log(meetup);
  this.meetupsService.createMeetup(meetup)
      .subscribe(data => {
          this.getAllMeetups();
      });
  this.isDialogOpen = false;

}
openModal() {
  this.isDialogOpen = true;
  document.getElementById('add-meetup-form');
  this.MeetupForm.reset();
  document.querySelectorAll('input')
  console.log(this.MeetupForm);
}

deleteMeetup(meetupId) {

  this.meetupsService.deleteMeetupById(meetupId)
     .subscribe(successCode => {
         this.statusCode = 204;
         this.getAllMeetups();
     }, errorCode => this.statusCode = errorCode);

}

}