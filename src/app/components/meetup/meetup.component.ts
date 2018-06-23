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

import { create } from 'domain';

import { Meetup } from '../../models/meetup';


@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',  
  styleUrls: ['./meetup.component.css'],
  providers: [MeetupsService]
})

export class MeetupComponent   {
  currentUrl;
  oncemeetup;
  statusCode: number;
  meetupObs;
  comment;
  meetupObj;
  descriptionHTML;
  commentsObs;
  profile;
  isFavEdded = false;
  openWindow = false;
  isFav = false;
  obj: Favorite;
  favorites;
  @ViewChild('div') div: ElementRef;
  @ViewChild('textarea1') textarea1: ElementRef;

  isDelete = false;

  @Input() isAdmin;
  @Input() isUser;
  showUsers = false;
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
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
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
      this.commentsObs = this.meetupsService.getComments(this.currentUrl.id);
      this.AddCommentForm.reset();
      this.router.navigate(['meetups/' + this.currentUrl.id]);
    });
}

  onUpdateMeetupSubmit() {

    const meetups = {
      meetupData: this.EditmeetupForm.value,
      createdBy: this.EditmeetupForm.value.createdBy
    };
    meetups.meetupData.image = "book55.jpg"
    this.meetupsService.getMeetupById(this.currentUrl.id).subscribe(
        meetup => {

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

isInFav(meetupId, userId) {

  this.favoritesService.getFavsByUserId(userId).subscribe(favs => {
    favs.forEach(element => {
        if(element.meetupId === meetupId) {
          this.isFav = true;
          console.log(element);
        }
      });
  });
}

addToFav(meetupId) {
  this.isFavEdded = true;
  this.openWindow = true;
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
console.log("sddddddddddddddddd");
  this.isFavEdded = false;
  this.openWindow = false;
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
    if(this.authService.getloggedIn()) {
      this.profile = this.authService.isLoggedIn();
      this.isInFav(this.currentUrl.id, this.profile._id);
    }
    this.meetupsService.getMeetupById(this.currentUrl.id).subscribe(
      meetup => {
        this.oncemeetup = meetup;
      }
  );

    this.getMeetupById(this.currentUrl.id);
    this.meetupsService.getMeetupObjById(this.currentUrl.id).subscribe(data => {
      htmldecs = data.json().meetupData.description;
      //document.getElementById("div-descr").innerHTML=data.json().meetupData.description;
       //console.log(data.json().meetupData.description);
  });
  setTimeout(() => {
    this.div.nativeElement.innerHTML = htmldecs;
 }, 1000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
   }, 1000);
    
}
}
// dar-alex@mail.ru
// dar-alex@mail.ru

// {
//   "_id" : ObjectId("5b0ca73fa4fbdf175cb52aff"),
//   "createdBy" : "WOORI EDUCATION GROUP",
//   "comments" : [],
//   "participants" : [],
//   "meetupData" : {
//       "name" : "Обучение за границей",
//       "description" : "<h3>Время: 31.07.18 (ВТ) - c 18.30 до 21.00</h3><p><strong>Мы ответим на следующие вопросы:</strong></p><ul><li><p>Какие пути иммиграции существуют для студентов?</p></li><li><p class=\"fr-text-gray\">Как переехать в Канаду всей семьей?</p></li><li><p class=\"fr-text-gray\">Как поступить в канадский ВУЗ?</p></li><li><p class=\"fr-text-gray\">Сколько стоит обучение/проживание в Канаде?</p></li><li><p class=\"fr-text-gray\">Где лучше учить язык?</p></li><li><p class=\"fr-text-gray\">Как получить визу в Канаду?</p></li><li><p class=\"fr-text-gray\">Что делать, если мне отказали в визе?</p></li></ul><p class=\"fr-text-spaced\">Участникам семинара будут предоставленны скидки: бесплатная регистрация в Centennial и Georgian.</p><p>Главные спонсоры: Государственный колледж Centennial college (Toronto, Ontario), Государственный колледж Georgian college (Barrie, Ontario).</p><p><span style=\"font-size: 20px; color: red;\">Вход бесплатный, требуется регистрация, места ограничены</span></p>",
//       "image" : "book6.jpg",
//       "price" : 0,
//       "address" : "Минск",
//       "category" : "Карьера и бизнес",
//       "rating" : 1,
//       "eventsDate" : ISODate("2018-05-26T00:00:00.000Z")
//   },
//   "__v" : 0
// }