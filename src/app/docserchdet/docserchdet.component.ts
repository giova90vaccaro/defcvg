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
  documentiCO!:any;
  documentiBC!:any;
  documentiBF!:any;
  showcat=false;
  intestazione:string[] = ['Data', 'numero', 'identificatore', 'IdCliente', 'IdFornitore', 'serie', 'categoriaMadreLivello1', 'nome', 'descrizione', 'Taglia', 'Colore', 'quantita', 'totaleDiRiga']

  constructor(private msgkBar: MatSnackBar, private api:HttpClient,private api2:HttpClient,private api3:HttpClient) { }

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
      this.api.get("https://cvggold-dash.ns0.it/json/dettagli/documenti.php?"+date+"&tipo=CO").subscribe(
        data=>{
          this.documentiCO = data;
          console.log(data);
          this.bar = false;
          this.showcat=true;
        }
      )
      this.api2.get("https://cvggold-dash.ns0.it/json/dettagli/documenti.php?"+date+"&tipo=BC").subscribe(
        data=>{
          this.documentiBC = data;
          console.log(data);
          this.bar = false;
          this.showcat=true;
        }
      )
      this.api2.get("https://cvggold-dash.ns0.it/json/dettagli/documenti.php?"+date+"&tipo=BF").subscribe(
        data=>{
          this.documentiBF = data;
          console.log(data);
          this.bar = false;
          this.showcat=true;
        }
      )
    }
  }
}
