import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vcategoria',
  templateUrl: './vcategoria.component.html',
  styleUrls: ['./vcategoria.component.css']
})
export class VcategoriaComponent implements OnInit {

range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
});

d_inizio = new Date();
d_fine = new Date();
risposta:any;
selezione:boolean=false;
s2:boolean=false;
h2:string[]=['Cat1', 'TotPz', 'Consegnato','TotEu', 'perc'];


constructor(private connessione:HttpClient ) {

  }
  ngOnInit(): void {
  }

  vista():void{

    if(this.range.value.start != null || this.range.value.end != null){
      this.d_inizio = this.range.value.start;
      this.d_fine = this.range.value.end;
      this.s2 = !this.s2
      this.returnConn();
    }else{
      alert("Inserire la data prima di effettura una ricerca")
    }
    }

  returnConn():void{
      const datacomp="d1="+this.d_inizio.toISOString()+"&d2="+this.d_fine.toISOString();
      this.connessione.get("https://cvggold-dash.ns0.it/json/index.php?"+datacomp).subscribe(
        data => {
          this.risposta = data;
          this.selezione = !this.selezione
          this.s2 = !this.s2;
        }
      )
 }




}

