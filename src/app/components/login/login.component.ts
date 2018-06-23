import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService} from '../../services/auth.service';
import { UsersService} from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  isBlock = false;
  isLoginError: boolean = false;
  errorMessage: string;
  constructor(private router:Router, private authService: AuthService, private usersService: UsersService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    let fb = this.activatedRoute.snapshot.params;
    let user = {};
    if(window.location.href == "http://localhost:4200/login?fb=true#_=_" || window.location.href == "http://localhost:4200/login?tw=true#_=_") {
      console.log(fb);
      this.authService.logIn(user).subscribe(data => {
        if (data.json().token) {
          this.authService.setloggedIn();
          console.log(data.json().message,"dasd");
          this.authService.isLoggedIn();
          if (this.authService.getloggedAdminIn()) {
              this.router.navigate(['meetups/edit']);
          } else {
              this.router.navigate(['meetups']);
    
          }
        } else {
          this.errorMessage = data.json().message;
          this.isLoginError = true;
        }
    
    });
    } else {
      this.createFormControls();
      this.createForm();
    }

  }

  fbLogin(){
    let user = {};
    this.authService.fbLogIn().subscribe(data => {
        console.log(data);
        
      window.location.href = data; 
       // this.logIn(user);

      // if (data.json().token) {
      //   this.authService.setloggedIn();
      //   this.authService.isLoggedIn();
      //   if (this.authService.getloggedAdminIn()) {
      //       this.router.navigate(['meetups/edit']);
      //   } else {
      //       this.router.navigate(['meetups']);

      //   }
      // } else {
      //   this.errorMessage = data.json().message;
      //   this.isLoginError = true;
      // }
      

  });
  
}


twLogin() {
  let user = {};
  this.authService.twLogIn().subscribe(data => {
    console.log(data);
    console.log("data");
    window.location.href = data; 

});

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

    this.logIn(user);
 }
 logIn(user) {
if(user.email === "q@q") {
this.isBlock = true;
} else {
  this.authService.logIn(user).subscribe(data => {
    if (data.json().token) {
      this.authService.setloggedIn();
      console.log(data.json().message,"dasd");
      this.authService.isLoggedIn();
      if (this.authService.getloggedAdminIn()) {
          this.router.navigate(['meetups/edit']);
      } else {
          this.router.navigate(['meetups']);

      }
    } else {
      this.errorMessage = data.json().message;
      this.isLoginError = true;
    }

});
}


 }
}
