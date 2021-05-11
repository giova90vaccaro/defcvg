import { Component, OnInit } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.css']
})
export class NavHomeComponent implements OnInit {
  showFiller = false;
  tipo!:string;
  constructor() { }

  toggleSidenav(){
    this.showFiller = !this.showFiller
  }

  ngOnInit(): void {

  }

}
