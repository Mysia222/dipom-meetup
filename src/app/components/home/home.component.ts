import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {MeetupsService} from '../../services/meetups.service';
import {AuthService} from '../../services/auth.service';

import { Meetup } from '../../models/meetup';
import { ActivatedRoute, Router } from '@angular/router';
import {trigger, animate, style, state, group, animateChild, query, stagger, transition, keyframes} from '@angular/animations';
@Component({
	selector: 'home',
	templateUrl: './home.component.html',  
	styleUrls: ['./home.component.css'],
	providers: [MeetupsService],
	animations: [
		trigger('flyInOut', [
			 transition('* => *', [

				query(':enter', style({ opacity: 0 }), {optional: true}),

				query(':enter', stagger('300ms', [
					animate('.6s ease-in', keyframes([
						style({opacity: 0, transform: 'translateX(-70%)', offset: 0}),
						style({opacity: .5, transform: 'translateX(-30%)',  offset: 0.3}),
						style({opacity: 1, transform: 'translateX(0)',  offset: 1.0}),
					]))]), {optional: true})
			])
		
	])
]
	
})

export class HomeComponent  {

	public searchableList : any[];
	meetupsObs: Observable<Meetup[]>;
	category;
		items: Array<any> = []
	
	constructor(
		private meetupsService: MeetupsService,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
		
	) {
		this.items = [
			// { 
			// 	name: './assets/img/thumb2.jpg',
			// 	title: "Незабываемый День Влюбленных",
			// 	buttonVal: "Выбрать событие"
			// },
			// { 
			// 	name: './assets/img/thumb1.jpg',
			// 	title: "Развлечения для детей",
			// 	buttonVal: "Выбрать событие"
			// }
			// ,
			// { 
			// 	name: './assets/img/thumb3.jpg',
			// 	title: "Развлечения для детей",
			// 	buttonVal: "Выбрать событие"
			// }
			// ,
			// { 
			// 	name: './assets/img/thumb4.jpg',
			// 	title: "Развлечения для детей",
			// 	buttonVal: "Выбрать событие"
			// }
			// ,
			// { 
			// 	name: './assets/img/thumb5.jpg',
			// 	title: "Лучшие IT-мероприятия",
			// 	buttonVal: "Выбрать событие"
			// }
			// ,
			{ 
				name: './assets/img/thumb6.jpg',
				title: "Лучшие IT-мероприятия",
				buttonVal: "Выбрать событие"
			}
		]
	}
 
	getAllMeetups() {

		this.meetupsObs = this.meetupsService.getAllMeetups();
	}

	 ngOnInit() {

		if (this.activatedRoute.snapshot.params) {
				this.category = this.activatedRoute.snapshot.params;
		}

		this.getAllMeetups();
		console.log(this.authService.getloggedIn());
		
	}
}