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
  righe:any[]=[];

  public   title!: string;
  public   type!: ChartType;
  public   data!: any[][];
  public   columns!: Column[];
  public  options!: {};

  showgr:boolean=false

  chartHeight = window.innerHeight * 0.3
  chartWidth = window.innerWidth*0.9

  h1:string[]=['Negozio', 'Oggi', 'Pezzi', 'Scontrini'];
  col:string[]=['Giorno','Incasso','Pezzi','Scontrini']

  constructor(private api:HttpClient, private req:HttpClient) { }

  ngOnInit(): void {
  }

  rdate():void{
    this.showgr=false
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
              var aux = [this.grincasso[i].Giorno.toString(), Number(this.grincasso[i].Incasso), this.grincasso[i].Pezzi, this.grincasso[i].Scontrini];
              this.righe.push(aux);
              this.title = "Andamento Incassi - Pezzi - Scontrini"
              this.type = ChartType.ComboChart
              this.columns = this.col
              this.data = this.righe
              this.options= {
                vAxis: { title: '€-Pz-Sc' },
                hAxis: { title: 'Week' }
              }
              this.showgr = true;
            }
      }
    )
  }

}
