import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Input } from '@angular/core/src/metadata/directives';
import { AuthService } from '../../services/auth.service';
import { MeetupsService } from '../../services/meetups.service'

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { create } from 'domain';
import {Input} from '@angular/core';
@Component({
  selector: 'add-meetuplist',
  templateUrl: './meetuplist.component.html',  
  styleUrls: ['./meetuplist.component.css'],
  providers: [MeetupsService]
})
export class MeetuplistComponent  {
  processValidation = false;
  statusCode: number;
  meetupsObs;
  isAdmin;
  queryString = "";
  categories = [
    {
        "category_id": 1,
        "category_name": "Писательство"
    }, 
    {
        "category_id": 2,
        "category_name": "Домашние любимцы"
    }, 
    {
        "category_id": 3,
        "category_name": "Фильмы"
    }, 
    {
        "category_id": 4,
        "category_name": "Хобби и ремёсла"
    }, 
    {
        "category_id": 5,
        "category_name": "Искусство"
    }, 
    {
        "category_id": 6,
        "category_name": "Технологии"
    },
    {
        "category_id": 7,
        "category_name": "Мода и красота"
    },
    {
        "category_id": 8,
        "category_name": "Карьера и бизнес"
    },
    {
        "category_id": 9,
        "category_name": "Танцы"
    },
    {
        "category_id": 1,
        "category_name": "Язык и культура"
    }, 
    {
        "category_id": 1,
        "category_name": "Семья"
    }, 
    
  ]; 

  constructor( private meetupsService: MeetupsService) {

   
  }


  getAllMeetups() {

    this.meetupsObs = this.meetupsService.getAllMeetups();
  
}

ngOnInit() {

  this.getAllMeetups();
  this.isAdmin = true;
  
}


}