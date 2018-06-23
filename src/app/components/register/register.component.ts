import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router'

import { NgModule, Pipe} from '@angular/core';
import { ReactiveFormsModule, FormsModule,FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { UsersService } from '../../services/users.service';
import { MapService } from '../../services/map.service';
@Component({
  selector: 'register',
  templateUrl: './register.component.html',  
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  userForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
  location: FormControl;
  address: FormControl;
  isChangeLoc = false;

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

isClicked = false;
queryString;
  constructor(private router: Router, private usersService: UsersService, private mapService: MapService) {}

  ngOnInit() {
    //this.mapService.codeLatLng();
    this.createFormControls();
    this.createForm();
    // let cities = this.mapService.getAddress().subscribe(data => {
    //   console.log(data);
    // });
    // console.log(cities);
  }
  createFormControls() {
  
    this.firstName = new FormControl('', [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(12)
    ]);
    this.lastName = new FormControl('');
    this.location = new FormControl('');
    this.email = new FormControl('', [
      Validators.required, 
      Validators.email,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.passwordConfirm = new FormControl('',[
      Validators.required
    ]);
    this.address = new FormControl('',[
     
    ]);
  }

  createForm() {
    
    function passwordMatchValidator(g: FormGroup) {
      return g.get('password').value === g.get('passwordConfirm').value
         ? null : {'mismatch': true};
   }
  
  this.userForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,	 
    email: this.email,
    location: this.location,
    password: this.password,
    passwordConfirm: this.passwordConfirm
}, {validators: passwordMatchValidator});

  }
  registerUser() {

    let user = this.userForm.value;
    if(user.address) {
     user.location = user.location + user.address;
    } else {
      delete user.address;
    }
    user.location = this.userForm.value.location || document.getElementById("city").innerHTML;
    delete user.passwordConfirm;
    this.usersService.createUser(user)
        .subscribe(
            data => {
                this.router.navigate(['/login']);
            });

}
makeInvisible(text) {
  
  this.queryString = text;
  this.isClicked = !this.isClicked;
}
}