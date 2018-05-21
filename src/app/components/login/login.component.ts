import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService} from '../../services/auth.service';
import { UsersService} from '../../services/users.service';
import { Router } from '@angular/router'
import { ReactiveFormsModule, FormsModule,FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message: string;
  profile;
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private router:Router, private authService: AuthService, private usersService: UsersService) {}

  ngOnInit() {

    this.createFormControls();
    this.createForm();

  }

  createFormControls() {
  
    this.email = new FormControl('', [
      Validators.required, 
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required
    ]);

  }

  createForm() {
  
  this.loginForm = new FormGroup({	 
    email: this.email,
    password: this.password

  });

  }
  
  loginUser(e) {

    e.preventDefault();

    let user = {
        email: e.target.elements[0].value,
        password: e.target.elements[1].value
    };

    this.authService.logIn(user).subscribe(data => {
        console.log(data);
        this.authService.setloggedIn();
        this.authService.isLoggedIn();
        if (this.authService.getloggedAdminIn()) {
            this.router.navigate(['meetups/edit']);
        } else {
            this.router.navigate(['profile']);

        }

    });
 }
}
