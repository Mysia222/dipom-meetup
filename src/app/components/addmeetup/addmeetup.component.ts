import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Input } from '@angular/core/src/metadata/directives';
import { AuthService } from '../../services/auth.service';
import { MeetupsService } from '../../services/meetups.service'
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { create } from 'domain';
import {Input} from '@angular/core';
@Component({
  selector: 'add-meetup',
  templateUrl: './addmeetup.component.html',  
  styleUrls: ['./addmeetup.component.css'],
  providers: [MeetupsService]
})
export class AddmeetupComponent  {
  processValidation = false;
  statusCode: number;
  meetupsObs;
  isAdmin;
  @Input() isDialogOpen;
  MeetupForm: FormGroup;
  name: FormControl;
  description: FormControl;
  image: FormControl;
  price: FormControl;
  category: FormControl;
  eventsEndDate: FormControl;
  eventsStartDate: FormControl;
  createdBy: FormControl;
  address: FormControl;
  isClicked = false;
  queryString;


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
  locations = [
    {
      meetupData: {
      name: "Магадан,Россия"
      }
    },
    {
      meetupData: {
      name: "Мадурай, Индия"
      }
    },
    {
      meetupData: {
      name: "Майами, США"
      }
    },
    {
      meetupData: {
      name: "Манисалес, Колумбия"
      }
    },  
    {
      meetupData: {
      name: "Мантуя, Италия"
      }
    },
    {
      meetupData: {
        name: "Миасс, Россия"
      }
    },
    {
      meetupData: {
        name: "Мидделбург, Голландия"
      }
    },
    {
      meetupData: {
        name: "Милуоки, США"
      }
    },
    {
      meetupData: {
        name: "Мингечаур, Азербайджан"
      }
    },
    {
      meetupData: {
        name: "Миннеаполис, США"
      }
    },
    {
      meetupData: {
        name: "Минск, Беларусь"
      }
    },
    {
      meetupData: {
        name: "Москва, Россия"
      }
    },
    {
      meetupData: {
      name: "Милан, Италия"
      }
    },
    {
      meetupData: {
      name: "Мюнхен, Бавария"
      }
    }
  ];
  constructor( private meetupsService: MeetupsService, private authService: AuthService, private router: Router) {

   
  }


ngOnInit() {

  this.createFormControls();
  this.createForm();
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
  this.eventsStartDate = new FormControl('', 
  Validators.required
  );
  this.eventsEndDate = new FormControl('', 
  Validators.required
  );
  this.price = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9?]*")
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
makeInvisible(text) {
  
  this.queryString = text;
  this.isClicked = !this.isClicked;
}

createForm() {
  
this.MeetupForm = new FormGroup({
  name: this.name,
  description: this.description,
  price: this.price,
  category: this.category,
  eventsEndDate: this.eventsEndDate,
  eventsStartDate: this.eventsStartDate,
  createdBy: this.createdBy,
  address: this.address
});

}
onMeetupFormSubmit() {

  this.processValidation = true;
  if (this.MeetupForm.invalid) {
      return;
  }
  let profile = this.authService.isLoggedIn()
  let meetup = {
    meetupData: this.MeetupForm.value,
    createdBy: this.MeetupForm.value.createdBy,
    createUser: profile._id
  };
  meetup.meetupData.image = "book22.jpg";
  this.meetupsService.createMeetup(meetup)
      .subscribe(data => {
        this.getAllMeetups();
      });
  this.isDialogOpen = false;
  this.getAllMeetups();
  this.router.navigate(['/profile']);
}

getAllMeetups() {

  this.meetupsObs = this.meetupsService.getAllMeetups();

}
openModal() {
  this.isDialogOpen = true;
  document.getElementById('add-meetup-form');
  this.MeetupForm.reset();
  document.querySelectorAll('input')
  console.log(this.MeetupForm);
}

closeModal() {
  this.isDialogOpen=false;

}

}