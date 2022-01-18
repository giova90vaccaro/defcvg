import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-docserchdet',
  templateUrl: './docserchdet.component.html',
  styleUrls: ['./docserchdet.component.css']
})
export class DocserchdetComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

}
