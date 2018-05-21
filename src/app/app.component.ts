
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

constructor() {}

ngOnInit() {
  //this._modalService.setModal(this.modal);
}

prepareRouteTransition(outlet) {
  const animation = outlet.activatedRouteData['animation'] || {};
  return animation['value'] || null;
}

}
