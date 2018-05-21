import { Injectable } from '@angular/core';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { url } from 'inspector';

import { Favorite } from '../models/fav';

@Injectable()
export class FavoritesService {

    favUrl = "http://localhost:8000/favorites";

    constructor (private http: Http) {

    }

    public createFav(fav: Favorite):Observable<any> {

        return this.http.post(this.favUrl + "/addfav", fav)
            .map(response => response.json())
    } 

    public getAllUsersFavs(): Observable<Favorite[]>  {

        return this.http.get(this.favUrl)
            .map(response => response.json())
    }

    public getFavsByUserId(userId: string): Observable<any> {
        return this.http.get(this.favUrl +"/user/"+ userId)
            .map(response => response.json())

     } 

/*
     public updateMeetup(meetup, meetupId) {

        return this.http.put(this.meetupUrl +"/" + meetupId, meetup)
            .map(success => success.status)

    }

    public deleteMeetupById(meetupId: string) {

        return this.http.delete(this.meetupUrl +"/"+ meetupId)
            .map(success => success.status)
            
    }
    */

}