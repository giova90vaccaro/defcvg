import { HttpClient } from '@angular/common/http';
import { Component, OnInit , AfterViewInit, ViewChild,Inject} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-svendite',
  templateUrl: './svendite.component.html',
  styleUrls: ['./svendite.component.css']
})
export class SvenditeComponent implements OnInit {
  aux:any;
  vendite:any;
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
  header:string[]=['categoria', 'nome', 'qta', 'tot', 'id'];
  constructor(private api:HttpClient, public detart:MatDialog,private rapi:HttpClient) {

    this.api.get("https://cvggold-dash.ns0.it/json/venditetd_json.php").subscribe(
      data=>{
        this.aux = data;
        this.vendite = new MatTableDataSource(this.aux);
        this.show=!this.show;

      }
    );
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vendite.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.toString());
  }
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.vendite.sort = this.sort;
  }
  ngOnInit(): void {
  }
  rcdata():void{
    console.log("Ricerca Data");

      this.d_inizio = this.range.value.start;
      this.d_fine = this.range.value.end;
      var inizio = this.d_inizio.toLocaleDateString("en-US")
      var fine = this.d_fine.toLocaleDateString("en-US")
      console.log(inizio)
      console.log(fine)
     // var fine=this.d_fine.getFullYear()+"-"+(this.d_fine.getMonth()+1).toString()+"-"+(this.d_fine.getDate()-1).toString()

      const dat="?d1="+inizio+"&d2="+fine;
      this.api.get("https://cvggold-dash.ns0.it/json/venditetd_json.php"+dat).subscribe(
        data=>{
          this.aux = data;
          console.log(this.aux)
          this.vendite = new MatTableDataSource(this.aux);
        }
      )
  }

  openDialog(risposta:string) {
    this.idArt = risposta;
    const dialogRef = this.detart.open(DettArt, {
      width: '100%',
      data : this.idArt
    });
  }
}
@Component({
  selector: 'dett-art',
  templateUrl: 'dett-art.html',
})
export class DettArt {

  public darticolo:any;
  public hArt=["nome", "venduto", "consegnato"];
  public show=true;
  art!:any
  src="https://cvggold-dash.ns0.it/json/dettagli/imgjson.php?art="

  constructor( @Inject(MAT_DIALOG_DATA) public data:any, private rapi:HttpClient){

    this.show=true;

    this.rapi.get("https://cvggold-dash.ns0.it/json/setitemes.php?id="+this.data).subscribe(
      rx=>{
        this.art=rx
        this.src = this.src+this.art[0].codiceArticolo;
        this.show=false;

      }
    )
  }

}
