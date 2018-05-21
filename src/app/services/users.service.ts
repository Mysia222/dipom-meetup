import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http'
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { url } from 'inspector';

import { User } from '../models/user';

@Injectable()
export class UsersService {

    url = "http://localhost:8000";
    profileUrl = "http://localhost:8000/profile";
    registerUrl = "http://localhost:8000/auth";
    private token = localStorage.getItem('mean-token');
    private userEmail: string;

    constructor (private http: Http, private router: Router) {

    }

    private getToken(): string {

       if (!this.token) {
           this.token = localStorage.getItem('mean-token');
       }
       return this.token;

    }    

    createUser(user: User):Observable<any> {

        return this.http.post(this.registerUrl + "/register", user)
            .map(response => response.json())
            
    } 


    getAllUsers() {

        return this.http.get(this.profileUrl)
             .map(response => console.log(response.json()))

    }

    updateUser(meetup) {

        return this.http.put(this.url +"/"+ meetup.id, meetup)
            .map(response => response.json())

    } 

    deleteUserById(meetupId: string) {

        return this.http.delete(this.url +"/"+ meetupId)
            .map(response => response.json())

    }

}