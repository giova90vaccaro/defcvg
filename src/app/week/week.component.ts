import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
incasso:any;
h1:string[]=['nome', 'valore', 'pezzi', 'Scontrini'];
articoli:any;
h2:string[]=['nome', 'descrizione', 'pezzi','valore'];
categoria:any;
h3:string[]=['cat', 'pezzi' ,'valore'];
  constructor(private api:HttpClient) {
    this.api.get("https://cvggold-dash.ns0.it/json/dettagli/week1.php").subscribe(
      data=>{
        this.incasso=data;
        //grafico Incassi - Settimana
      }
    );
    this.api.get("https://cvggold-dash.ns0.it/json/dettagli/weekart.php").subscribe(
      data=>{
        this.articoli=data;
        //Grafico Articoli - Settimana
      }
    );
    this.api.get("https://cvggold-dash.ns0.it/json/dettagli/weekcat.php").subscribe(
      data=>{
        this.categoria = data
        //Grafico Categoria - Settimana
      }
    );
   }

  ngOnInit(): void {
  }

}
