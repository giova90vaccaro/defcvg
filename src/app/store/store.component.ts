import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  store:any;
  negozio:any
  iorario:any;
  panelOpenState = false;
  h1=['Giorno', 'h9', 'h10','h11','h12', 'h13','h14','h15','h16','h17','h19','h20'];
  constructor(private api:HttpClient) {

      this.api.get("https://cvggold-dash.ns0.it/json/dettagli/store_json.php").subscribe(
        data=>{
          this.store = data;
          console.log(this.store.nome)
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
    Orario():void{

      this.api.get("https://cvggold-dash.ns0.it/json/store/hours.php?serie="+this.negozio).subscribe(
        data=>{
            this.iorario = data
            console.log(this.iorario)
        }
      )

    }

  }

