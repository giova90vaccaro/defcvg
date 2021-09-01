import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
show:boolean=true;

incasso:any;
h1:string[]=['nome', 'valore', 'pezzi', 'Scontrini'];
articoli:any;
h2:string[]=['nome', 'descrizione', 'pezzi','valore'];
categoria:any;
h3:string[]=['cat', 'pezzi' ,'valore'];
bstore:any;
bcat:any;
bart:any;
  constructor(private api:HttpClient) {}

  ngOnInit(): void {

    this.api.get("https://cvggold-dash.ns0.it/json/dettagli/week1.php").subscribe(
      data=>{
        this.incasso=data;
        this.bstore=this.incasso[0].nome;
        //grafico Incassi - Settimana
      });
      this.api.get("https://cvggold-dash.ns0.it/json/dettagli/weekcat.php").subscribe(
      data=>{
        this.categoria = data
        this.bcat = this.categoria[0].nome;
        //Grafico Categoria - Settimana
      });
      this.api.get("https://cvggold-dash.ns0.it/json/dettagli/weekart.php").subscribe(
        data=>{
          this.articoli=data;
          this.bart = this.articoli[0].nome;
          //Grafico Articoli - Settimana
        });


      if(window.innerWidth>450 && window.innerWidth<900)
        this.show=true;
      if(window.innerWidth<451)
        this.show=false;
      else
        this.show=true;
  }

}
