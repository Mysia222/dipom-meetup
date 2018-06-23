
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService} from '../../services/auth.service';
import { UsersService} from '../../services/users.service';
import { MeetupsService} from '../../services/meetups.service';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',  
  styleUrls: ['./navbar.component.css'],
  providers: [MeetupsService]
})

export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router, private meetupsService: MeetupsService, private usersService: UsersService) {
    this.sidenavActions = new EventEmitter<any>();
    this.sidenavParams = [];
    this.menuItems = [
        { name: "Our Story", route: "/our-story" },
        { name: "When & where", route: "/when-where" }
    ];

  }
  meetupsObs;
  event = false;
  isClicked = true;
  meetupsTitle = 'Meetups';
  queryString;
  categories =[
    {
        "category_id": 1,
        "category_name": "Писательство"
    }, 
    {
        "category_id": 2,
        "category_name": "Домашние любимцы"
    }, 
    {
        "category_id": 3,
        "category_name": "Фильмы"
    }, 
    {
        "category_id": 4,
        "category_name": "Хобби и ремёсла"
    }, 
    {
        "category_id": 5,
        "category_name": "Искусство"
    }, 
    /*{
        "category_id": 6,
        "category_name": "Технологии"
    },
    {
        "category_id": 7,
        "category_name": "Мода и красота"
    },
    {
        "category_id": 8,
        "category_name": "Карьера и бизнес"
    },
    {
        "category_id": 9,
        "category_name": "Танцы"
    },
    {
        "category_id": 1,
        "category_name": "Язык и культура"
    }, 
    {
        "category_id": 1,
        "category_name": "Семья"
    }, 
    */

  ]; 
  title = 'app';
  wedding = { name: 'our wedding' };
  menuItems: MenuItem[];

  LogOut() {
    this.authService.setloggedOut();
    localStorage.clear();
    this.router.navigate(['home']);
  }
  isKey() {
      return !this.event;
  }
  makeInvisible(event) {
    document.getElementById("search").setAttribute("value", "");
    this.queryString = "";
    this.isClicked = !this.isClicked;
  }

  ngOnInit() {

    this.meetupsObs = this.meetupsService.getAllMeetups();
  
  }
  close() {
    this.sidenavActions.emit({ action: 'sideNav', params: ['hide'] });
  }

  sidenavActions: EventEmitter<any>;
  sidenavParams: any[];
}

export interface MenuItem {

  name: string;
  route: string;
}

