import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{ GoogleChartInterface } from 'ng2-google-charts'


@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  incasso:any;
  h1:string[]=['nome','valore','pezzi','Scontrini'];
  articolo:any;
  h2:string[]=['nome','descrizione','pezzi','valore']
  categoria:any;
  h3:string[]=['cat', 'pezzi' ,'valore'];
  show:any=true;
  bstore:any;
  bcat:any;
  bart:any;
  estore:any;
  ecat:any;
  eart:any;
  show2:any= true;
  show3:any=true;
  disp:boolean=true;

  grincasso: GoogleChartInterface = {
    chartType: 'PieChart',
    //firstRowIsData: true,
    options: {'title': 'Negozio - Mese', 'align':'left','width':'150%','width_unit':'%', 'height':'400'},
  };
  grarticoli: GoogleChartInterface = {
    chartType: 'PieChart',
    //firstRowIsData: true,
    options: {'title': 'Articoli - Mese', 'align':'left','width':'150%','width_unit':'%', 'height':'400'},
  };
  grcategoria: GoogleChartInterface = {
    chartType: 'PieChart',
    //firstRowIsData: true,
    options: {'title': 'Categoria - Mese', 'align':'left','width':'150%','width_unit':'%', 'height':'400'},
  };
  constructor(private api:HttpClient) {}

  ngOnInit(): void {

    this.api.get("https://cvggold-dash.ns0.it/json/dettagli/month1.php").subscribe(
      data=>{
        this.incasso = data;
        var gr = this.incasso.map(function(aux:any){return [aux.nome, parseInt(aux.valore)]})
        gr = [['Negozio', 'Incasso']].concat(gr);
        this.grincasso.dataTable = gr;
        this.bstore = this.incasso[0].nome;
        this.estore = this.incasso[0].valore;
      }
    )
    this.api.get("https://cvggold-dash.ns0.it/json/dettagli/monthart.php").subscribe(
      data=>{
        this.articolo = data
        var gr = this.articolo.map(function(aux:any){return [aux.nome, parseInt(aux.pezzi)]})
        gr = [['Articolo', 'Q.ta']].concat(gr);
        this.grarticoli.dataTable=gr;
        this.bart=this.articolo[0].nome;
        this.eart = this.articolo[0].valore;
      }
    );
    this.api.get("https://cvggold-dash.ns0.it/json/dettagli/monthcat.php").subscribe(
      data=>{
        this.categoria = data
        var gr = this.categoria.map(function(aux:any){return [aux.cat, parseInt(aux.pezzi)]})
        gr = [['Categoria', 'Q.ta']].concat(gr);
        this.grcategoria.dataTable=gr;
        this.bcat=this.categoria[0].cat;
        this.ecat = this.categoria[0].valore;
      }
    );

    if(window.innerWidth>450 && window.innerWidth<900)
      this.disp=true;
    if(window.innerWidth<451)
      this.disp=false;
    else
      this.disp=true;
  }
  grafico():void{
    this.show=!this.show;
  }
  grafico2():void{
    this.show2=!this.show2;
  }
  grafico3():void{
    this.show3=!this.show3;
  }

}
