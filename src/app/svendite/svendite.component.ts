import { HttpClient } from '@angular/common/http';
import { Component, OnInit , AfterViewInit, ViewChild,Inject} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Element {
  a: string;
  cat1: string;
  b: string;
  c: number;
  d:number;
}
@Component({
  selector: 'app-svendite',
  templateUrl: './svendite.component.html',
  styleUrls: ['./svendite.component.css']
})

export class SvenditeComponent implements OnInit {

  aux:any;
  vendite!: MatTableDataSource<Element>;
  show2:boolean=false;
  spinner:boolean=false;
  idArt:any;
  r:any;
  checked=false;
  d_inizio = new Date();
  d_fine = new Date()
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  show:boolean=false;
  header:string[]=['a','cat1', 'b','c', 'd', 'perc','par'];


  @ViewChild(MatSort, { static: false }) set sort(value: MatSort) {
    this.vendite.sort = value;
  }

  constructor(private api:HttpClient, public detart:MatDialog,private rapi:HttpClient) {
    this.show=!this.show;
   }
  applyFilterCat(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vendite.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCod(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vendite.filter = filterValue.trim().toLowerCase();
    console.log(this.vendite.filter);
  }
  ngOnInit(): void {
  }

  rcdata():void{
    console.log("Ricerca Data");
    this.show2 = false;
    this.spinner = true;
      this.d_inizio = this.range.value.start;
      this.d_fine = this.range.value.end;
      var inizio = this.d_inizio.toLocaleDateString("en-US")
      var fine = this.d_fine.toLocaleDateString("en-US")

      const dat="?d1="+inizio+"&d2="+fine;
      console.log(dat)
      this.api.get("https://cvggold-dash.ns0.it/json/venditetd_json.php"+dat).subscribe(
        data=>{
          this.aux = data;
          console.log(this.aux)
          this.vendite = new MatTableDataSource(this.aux);
          this.show2= true;
          this.spinner = false;
        }
      )
  }

  openDialog(risposta:string, tipo:number) {
    this.idArt = risposta;
    let dialogRef;
    switch(tipo){
      case 1:
        dialogRef = this.detart.open(DettArt, {
          width: '100%',
          data : this.idArt
        });
        break;
      case 2:
        dialogRef = this.detart.open(Consegnato, {
          width: '100%',
          data : this.idArt
        });
        break;
      case 3:
        dialogRef = this.detart.open(Venduto, {
          width: '100%',
          data : this.idArt
        });
        break;
    }

  }
}
@Component({
  selector: 'dett-art',
  templateUrl: 'dett-art.html',
  styleUrls: ['./pagedett.css']
})
export class DettArt {

  public darticolo:any;
  public hArt=["nome", "venduto", "consegnato"];
  public show=true;
  art!:any
  src="https://cvggold-dash.ns0.it/json/dettagli/imgjson.php?art="

  constructor( @Inject(MAT_DIALOG_DATA) public data:any, private rapi:HttpClient){
  }

}
@Component({
  selector:'consegnato',
  templateUrl:'consegnato.html',
  styleUrls: ['./pagedett.css']
})

export class Consegnato{

    constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

}

@Component({
  selector:'venduto',
  templateUrl:'venduto.html',
  styleUrls: ['./pagedett.css']
})

export class Venduto{

    constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

}
