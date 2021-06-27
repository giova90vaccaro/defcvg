import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  store:any;
  negozio:any
  cat:any;
  iorario:any;
  items:any;
  panelOpenState = false;
  h3=['cart', 'dart', 'Venduto', 'Consegnato', 'perc'];
  h2=['cat', 'Venduto', 'Consegnato', 'perc'];
  h1=['Giorno', 'h9', 'h10','h11','h12', 'h13','h14','h15','h16','h17','h19','h20'];
  
  constructor(private api:HttpClient) {

      this.api.get("https://cvggold-dash.ns0.it/json/dettagli/store_json.php").subscribe(
        data=>{
          this.store = data;
      })
  }
  ngOnInit(): void {
  }

  show():boolean{
    var sh=false
    if(this.negozio != null){
      sh=true
      return sh
    }else{
      return sh
    }
  }
  resetList():void{
    console.log("entro nella funzione")
    this.panelOpenState = false
    this.negozio = null;
    this.cat=null;
    this.iorario=null;
  }
    Orario():void{

      this.api.get("https://cvggold-dash.ns0.it/json/store/hours.php?serie="+this.negozio).subscribe(
        data=>{
            this.iorario = data
        }
      )

    }
    Categoria():void{
      this.api.get("http://cvggold-dash.ns0.it/prodotti/vendor.php?serie="+this.negozio).subscribe(
        data=>{
          this.cat = data
          console.log(this.cat);
        }
      )

    }
    Articolo():void{
      this.api.get("http://cvggold-dash.ns0.it/prodotti/itsold.php?serie="+this.negozio).subscribe(
        data=>{
          this.items = data;
        }
      )
    }

  }

