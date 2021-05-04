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
  header:string[]=['categoria', 'nome', 'qta', 'tot', 'id'];
  constructor(private api:HttpClient, public detart:MatDialog,private rapi:HttpClient) {

    this.api.get("https://cvggold-dash.ns0.it/json/venditetd_json.php").subscribe(
      data=>{
        this.aux = data;
        this.vendite = new MatTableDataSource(this.aux);

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
      const dat="?d1="+this.d_inizio.toISOString()+"&d2="+this.d_fine.toISOString();
      this.api.get("https://cvggold-dash.ns0.it/json/venditetd_json.php"+dat).subscribe(
        data=>{
          this.aux = data;
          this.vendite = new MatTableDataSource(this.aux);
        }
      )
  }

  openDialog(risposta:string) {
    this.idArt = risposta;
      this.rapi.get("https://cvggold-dash.ns0.it/json/setitemes.php?id="+risposta).subscribe(
        data=>{
          this.r = data;
        }
      )
    const dialogRef = this.detart.open(DettArt, {
      width: '95%',
      data : this.r
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
  constructor( @Inject(MAT_DIALOG_DATA) public data:any, private rapi:HttpClient){

    if(data == null)
      this.show=true;
    else
      this.show=false;
  }

}
