import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-trackme',
  templateUrl: './trackme.component.html',
  styleUrls: ['./trackme.component.css']
})
export class TrackmeComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  currentLat: number;
  currentLong: number;
  marker: google.maps.Marker;
  isTracking: boolean;
  accuracy: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    
    console.log(this.currentLat, this.currentLong);
    this.authService.getCity(this.currentLat, this.currentLong);
    console.log(this.authService.getCity(this.currentLat, this.currentLong));

    const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you(Tracking)!'
      });
    } else {
      this.marker.setPosition(location);
    }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you(Position)!'
      });
    } else {
      this.marker.setPosition(location);
    }
    this.authService.getCity(this.currentLat, this.currentLong)
  }

  showTrackingPosition(position) {
    // console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    // this.currentLat = position.coords.latitude;
    // this.currentLong = position.coords.longitude;

    // const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    // this.map.panTo(location);

    // if (!this.marker) {
    //   this.marker = new google.maps.Marker({
    //     position: location,
    //     map: this.map,
    //     title: 'Got you(Tracking)!'
    //   });
    // } else {
    //   this.marker.setPosition(location);
    // }
    const icon = {
      // url: '',
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0)
  };
  const myLatLng = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);
  this.marker = new google.maps.Marker({
      position : myLatLng,
      map: this.map,
      icon: icon,
      draggable : false,
      title : 'Mark Home'
  });

  this.map.panTo(myLatLng);
  this.accuracy = position.coords.accuracy;

  google.maps.event.addListener(this.map, 'dragstart', function() {
  });
  google.maps.event.addListener(this.map, 'dragend', function() {
  });
  google.maps.event.addListener(this.map, 'center_changed', function() {
  });
  }
}
