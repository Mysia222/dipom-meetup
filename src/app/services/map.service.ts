import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class MapService {
    currentLat: number;
    currentLong: number;
    marker: google.maps.Marker;
    isTracking: boolean;
    accuracy: any;
    geocoder;
    public city;
    
  constructor( private http: Http) { 
  }

public codeLatLng() {

      if (navigator.geolocation) {
        this.isTracking = true;
        navigator.geolocation.watchPosition((position) => {
            this.currentLat = position.coords.latitude;
            this.currentLong = position.coords.longitude;
            this.geocoder = new google.maps.Geocoder();
            this.getCity(this.currentLat, this.currentLong);
        });
      } else {
        alert('Геолокация не поддерживается вашим браузером');
      }
}

getCity(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    this.geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
            for (var i=0; i<results[0].address_components.length; i++) {
                for (var b=0;b<results[0].address_components[i].types.length;b++) {
                    if (results[0].address_components[i].types[b] == "sublocality_level_1") {
                        this.city= results[0].address_components[i+1];
                        console.log(this.city);
                        break;
                    }
                }
            }
            document.getElementById("city").innerHTML += this.city.short_name;
        } else {
          alert("Город не найден");
        }
      } else {
        alert("Ошибка со статусом: " + status);
      }
    });
  }


}