import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router'

import { NgModule, Pipe} from '@angular/core';
import { ReactiveFormsModule, FormsModule,FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { UsersService } from '../../services/users.service';

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
  
  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit() {

    this.createFormControls();
    this.createForm();
    
  }
  createFormControls() {
  
    this.firstName = new FormControl('', [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(12)
    ]);
    this.lastName = new FormControl('');
    this.location = new FormControl('', 
    Validators.required
    );
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
    delete user.passwordConfirm;
    this.usersService.createUser(user)
        .subscribe(
            data => {
                this.router.navigate(['/login']);
            });

}
}