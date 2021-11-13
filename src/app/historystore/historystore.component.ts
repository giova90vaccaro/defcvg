import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ChartErrorEvent,
  ChartMouseLeaveEvent,
  ChartMouseOverEvent,
  ChartSelectionChangedEvent,
  ChartType,
  Column,
  GoogleChartComponent
} from 'angular-google-charts';

@Component({
  selector: 'app-historystore',
  templateUrl: './historystore.component.html',
  styleUrls: ['./historystore.component.css']
})
export class HistorystoreComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  incasso!:any
  grincasso!:any;
  orario!:any;
  righe:any[]=[];
  righe2:any[]=[];


  public   title!: string;
  public   type!: ChartType;
  public   data!: any[][];
  public   columns!: Column[];
  public  options!: {};

  public  title2!: string;
  public  type2!: ChartType;
  public  data2!: any[][];
  public  columns2!: Column[];
  public  options2!: {};

  showgr:boolean=false
  showgr2:boolean=false

  bar:boolean = false;
  chartHeight = window.innerHeight * 0.3
  chartHeight2 = window.innerHeight * 0.5

  chartWidth = window.innerWidth*0.9

  h1:string[]=['Negozio', 'Oggi', 'Pezzi', 'Scontrini'];
  h2:string[]=['ora', 'Totale', 'Scontrini', 'Pezzi']
  col:string[]=['Giorno','Incasso','Pezzi','Scontrini'];


  constructor(private api:HttpClient, private req:HttpClient, private ora :HttpClient) { }

  ngOnInit(): void {
  }

  rdate():void{
    this.showgr=false
    this.showgr2=false
    this.bar=true;
    console.log(this.range.value.start.toLocaleDateString())
    console.log(this.range.value.end.toLocaleDateString())
    var date = "d1="+this.range.value.start.toLocaleDateString()+"&d2="+this.range.value.end.toLocaleDateString()
    this.api.get("https://cvggold-dash.ns0.it/json/hstinc.php?"+date).subscribe(
      data=>{
        this.incasso = data
      }
    )
    this.req.get("https://cvggold-dash.ns0.it/json/grastoria.php?"+date).subscribe(
      data=>{
        this.grincasso=[]
        this.righe=[];
        this.grincasso=data;
        var i:number
          for(i=0; i<this.grincasso.length; i++){
              var aux = [this.grincasso[i].Giorno+' h', Number(this.grincasso[i].Incasso), this.grincasso[i].Pezzi, this.grincasso[i].Scontrini];
              this.righe.push(aux);
            }
              this.title = "Andamento Incassi - Pezzi - Scontrini"
              this.type = ChartType.ComboChart
              this.columns = this.col
              this.data = this.righe
              this.options= {
                vAxis: { title: '€-Pz-Sc' },
                hAxis: { title: 'Week' }
              }
              this.showgr = true;
              this.bar = false
            }

    )
    this.ora.get("https://cvggold-dash.ns0.it/json/store/hoursavggra.php?"+date).subscribe(
    data=>{
      this.orario = data
      this.righe2=[];
      var i:number
        for(i=0; i<this.orario.length; i++){
          var aux = [this.orario[i].ora, Number(this.orario[i].Totale), Number(this.orario[i].Pezzi), Number(this.orario[i].Scotnrini) ]
          this.righe2.push(aux)
        }
        this.title2= 'Material Bar Chart'
        this.type2= ChartType.Bar
        this.columns2 = ['Ora', 'Incasso', 'Pezzi', 'Scontrini']

        this.data2 = this.righe2
        this.options2={
          chart: {
            title: 'Andamento Fascia Oraria',
            subtitle: 'Totale Scontrinato - Numero di Pezzi - Numero Scontrini'
          } // Required for Material Bar Charts.
        }
        this.showgr2=true

    }
    )
  }

}
