import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  bar:boolean=false;
  documenti!:any;
  showcat=false;
  intestazione:string[] = ['Data', 'numero', 'identificatore', 'IdCliente', 'IdFornitore', 'serie', 'categoriaMadreLivello1', 'nome', 'descrizione', 'Taglia', 'Colore', 'quantita', 'totaleDiRiga']

  constructor(private msgkBar: MatSnackBar, private api:HttpClient) { }

  ngOnInit(): void {
  }

  controllo(){
    if(this.range.value.start == null && this.range.value.end == null){
      //console.log("Error Data")
      this.msgkBar.open("Data Non Inserita", "x")
    }else{
       var date = "d1="+this.range.value.start.toLocaleDateString("it-IT")+"&d2="+this.range.value.end.toLocaleDateString("it-IT");
      console.log(this.range.value.start.toLocaleDateString("it-IT"))
      this.bar=true;
      this.api.get("https://cvggold-dash.ns0.it/json/dettagli/documenti.php?"+date).subscribe(
        data=>{
          this.documenti = data;
          console.log(data);
          this.bar = false;
          this.showcat=true;
        }
      )
    }
  }
}
