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
    meetupUrl = "http://localhost:8000/meetups";
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

        return this.http.get(this.meetupUrl+'/allusers/admin')
             .map(response => response.json())

    }

    updateUser(userId, user) {

        return this.http.put(this.meetupUrl +"/edit/"+ userId, user)
            .map(response => response.json())

    } 

    deleteUserById(meetupId: string) {

        return this.http.delete(this.url +"/"+ meetupId)
            .map(response => response.json())

    }

}