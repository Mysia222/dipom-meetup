import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { MeetupsService } from '../../services/meetups.service';
import {FavoritesService} from '../../services/favs.service';
import {AuthService} from '../../services/auth.service';
import { Favorite } from '../../models/fav';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { Inject }  from '@angular/core';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',  
  styleUrls: ['./meetup.component.css'],
  providers: [MeetupsService]
})

export class MeetupComponent   {
  currentUrl;
  meetup;
  statusCode: number;
  meetupObs;
  comment;
  meetupObj;
  descriptionHTML;
  commentsObs;
  profile;
  isFavEdded = false;
  openWindow = false;
  obj: Favorite;
  favorites;
  @ViewChild('div') div: ElementRef;
  @ViewChild('textarea1') textarea1: ElementRef;

  isDelete = false;
  public editorContent: string = 'My Document\'s Title'
  @Input() isAdmin;
  @Input() isUser;
  title = 'Crystal Editor';
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
    private router:Router,
    private favoritesService: FavoritesService) {
    
  }
 

  getMeetupById(meetupId) 
  {
    this.meetupObs = this.meetupsService.getMeetupById(meetupId);
}

  onSubmit () {
    console.log(this.editorForm.value)
  }
  addCommentSubmit() {

    this.comment = this.AddCommentForm.value;
    
    this.meetupsService.addComment(this.comment, this.currentUrl.id)
    .subscribe(data => {
      this.router.navigate(['meetups/' + this.currentUrl.id]);
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
    favs.forEach(element => {
      if(element.meetupId === meetupId) {
        this.favoritesService.deleteFav(element._id).subscribe(data => {
          console.log(data);
        });
      }
    });
    console.log(favs);
  });
  
}

  ngOnInit() {
    let htmldecs;
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.commentsObs = this.meetupsService.getComments(this.currentUrl.id);
    this.getMeetupById(this.currentUrl.id);
    this.meetupsService.getMeetupObjById(this.currentUrl.id).subscribe(data => {
      htmldecs = data.json().meetupData.description;
      //document.getElementById("div-descr").innerHTML=data.json().meetupData.description;
       //console.log(data.json().meetupData.description);
  });
  setTimeout(() => {
    this.div.nativeElement.innerHTML = htmldecs;
    console.log(this.div.nativeElement.innerHTML);
 }, 1000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.div.nativeElement.innerHTML);
   }, 1000);
    
}
}