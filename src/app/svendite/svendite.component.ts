import { HttpClient } from '@angular/common/http';
import { Component, OnInit , AfterViewInit, ViewChild,Inject} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

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
  @ViewChild(MatPaginator, {static:false}) set paginator (value : MatPaginator){
    this.vendite.paginator = value;
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
          this.vendite = new MatTableDataSource(this.aux);
          console.log(this.vendite)
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
          maxWidth: '90vw',
          maxHeight: '90vh',
          height: '90%',
          width: '90%',
          data : this.idArt
        });
        break;
      case 2:
        dialogRef = this.detart.open(Consegnato, {
          maxWidth: '90vw',
          maxHeight: '90vh',
          height: '90%',
          width: '90%',
          data : this.idArt
        });
        break;
      case 3:
        dialogRef = this.detart.open(Venduto, {
          maxWidth: '90vw',
          maxHeight: '90vh',
          height: '90%',
          width: '90%',
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

  constructor( @Inject(MAT_DIALOG_DATA) public data:any, private api:HttpClient){
  }

}
@Component({
  selector:'consegnato',
  templateUrl:'consegnato.html',
  styleUrls: ['./pagedett.css']
})

export class Consegnato{


    constructor(@Inject(MAT_DIALOG_DATA) public data:any, private api:HttpClient){}

}

@Component({
  selector:'venduto',
  templateUrl:'venduto.html',
  styleUrls: ['./pagedett.css']
})

export class Venduto{

  url= "https://cvggold-dash.ns0.it/json/newdett/reportstoreitems.php?art=";
  progressivbar=true;
  img="https://cvggold-dash.ns0.it/json/newdett/imgjson.php?art="
  header = ['iDNegozio', 'Venduto', 'Ricevuto', 'Reso', 'Inviato', 'Prc', 'Rim']
  negozi:any;
  struttura = 0;
    constructor(@Inject(MAT_DIALOG_DATA) public data:any, private api:HttpClient, public detart:MatDialog){
      this.img = this.img+data;
      this.api.get(this.url+data).subscribe(
        data=>{
          console.log(data)
          this.negozi = data;
          this.struttura = this.negozi[0].tagliacolore;
          this.progressivbar = !this.progressivbar

        }
      )
    }
    openDetTagliacolore(){
      let dialogRef;
      console.log("Tentativo")
      dialogRef = this.detart.open(Tagliacolore, {
        maxWidth: '80vw',
        maxHeight: '80vh',
        height: '98%',
        width: '80%',
        data : this.data
      });
    }

}
@Component({
  selector:'tagliacolore',
  templateUrl:'tagliacolore.html',
  styleUrls: ['./tagliacolore.css']
})

export class Tagliacolore{

  @ViewChild(MatPaginator, {static:false}) set paginator (value : MatPaginator){
    this.tgcl.paginator = value;
  }

  url="https://cvggold-dash.ns0.it/json/newdett/retcolore.php?art=";
  url2="https://cvggold-dash.ns0.it/json/newdett/rettaglia.php?art=";
  urlTagliacolore = "https://cvggold-dash.ns0.it/json/newdett/tagliacolore.php?art=";

  tgcl:any;
  show=false;
  listcolor:any
  listtaglia:any;
  lista:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private api:HttpClient){

    this.api.get(this.url+data).subscribe(
      data=>{
        this.listcolor = data
        console.log(data)
      })
      this.api.get(this.url2+data).subscribe(
        data=>{
          this.listtaglia = data
          console.log(data)
        })
      this.api.get(this.urlTagliacolore+data).subscribe(
        data=>{
          this.lista = data
          console.log(this.lista)
          this.show=true;
        }
      )
  }

  ctrtagliacolore(a:string, b:string, c:string, d:string):boolean{

    //console.log(a)
    //console.log(b)
    //console.log(c)
    //console.log(d)
    if(a == c && b == d)
      return true
    else
      return false
  }


}
