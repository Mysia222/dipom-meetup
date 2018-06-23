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
  geocoder;
  public city;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(53.9170029, 27.584480199999998),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    this.geocoder = new google.maps.Geocoder();

    this.codeLatLng(this.currentLat, this.currentLong);

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


  codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    this.geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         //alert(results[0].formatted_address)
         console.log (results[0]);

        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "sublocality_level_1") {
                    //this is the object you are looking for
                    this.city= results[0].address_components[i+1];
                    console.log(this.city);
                    break;
                }
            }
        }
        //city data
        //alert(this.city.short_name + " " + this.city.long_name)
        console.log(this.city);
        document.getElementById("city").innerHTML = 'Популярные мероприятия в городе Минск';


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
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
