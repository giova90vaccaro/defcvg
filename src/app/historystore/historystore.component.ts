import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-historystore',
  templateUrl: './historystore.component.html',
  styleUrls: ['./historystore.component.css']
})
export class HistorystoreComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  rdate():void{
    console.log(this.range.value.start.toLocaleDateString())
    console.log(this.range.value.end.toLocaleDateString())
  }

}
