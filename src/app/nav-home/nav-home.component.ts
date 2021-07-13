import { Component, OnInit } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.css']
})
export class NavHomeComponent implements OnInit {
  showFiller = false;
  showFiller2 = false;
  tipo=false
  constructor() { }

  toggleSidenav(){
    if(this.tipo)
      this.showFiller = !this.showFiller;
    else
      this.showFiller2 = !this.showFiller2;

  }

  resetshow():void{
    this.showFiller=false;
    this.showFiller2=false
  }

  ngOnInit(): void {
    if(window.innerWidth>450)
      this.tipo=true
    else
      this.tipo=false

  }

}
