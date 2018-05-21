import { Injectable } from '@angular/core';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { url } from 'inspector';

import { Meetup } from '../models/meetup';

@Injectable()
export class MeetupsService {

    meetupUrl = "http://localhost:8000/meetups";

    constructor (private http: Http) {

    }

    public createMeetup(meetup: Meetup):Observable<number> {

        return this.http.post(this.meetupUrl, meetup)
            .map(response => response.json())
    } 

    public getAllMeetups(): Observable<Meetup[]>  {

        return this.http.get(this.meetupUrl)
            .map(response => response.json())
    }

    public getMeetupById(meetupId: string): Observable<Meetup> {

        return this.http.get(this.meetupUrl +"/"+ meetupId)
            .map(response => response.json())

     } 
     public getMeetupObjById(meetupId: string) {

        return this.http.get(this.meetupUrl +"/"+ meetupId)

     } 

     public updateMeetup(meetup, meetupId) {

        return this.http.put(this.meetupUrl +"/" + meetupId, meetup)
            .map(success => success.status)

    }
    
    public addComment(comment, meetupId) {

        return this.http.put(this.meetupUrl +"/comments/" + meetupId, comment)
            .map(success => success.status)

    }

    public getComments(meetupId) {

        return this.http.get(this.meetupUrl +"/allcomments/" + meetupId)
            .map(response => response.json())

    }

    public deleteMeetupById(meetupId: string) {

        return this.http.delete(this.meetupUrl +"/"+ meetupId)
            .map(success => success.status)
            
    }

}