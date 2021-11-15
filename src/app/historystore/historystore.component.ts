import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  righealt:any[]=[];
  righe2:any[]=[];
  righealt2:any[]=[];

  tasto = "Pezzi - Scontrini"

  changgra:boolean=false;

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
  data1!:string;
  data22!:string;

  chartWidth = window.innerWidth*0.9

  h1:string[]=['Negozio', 'Oggi', 'Pezzi', 'Scontrini'];
  h2:string[]=['ora', 'Totale', 'Scontrini', 'Pezzi'];
  col:string[]=['Giorno','Incasso'];
  col2:string[]=['ora', 'Totale'];


  constructor(private api:HttpClient, private req:HttpClient, private ora :HttpClient) { }

  ngOnInit(): void {
  }

  rdate():void{
    this.showgr=false
    this.showgr2=false
    this.bar=true;

    this.data1 = this.range.value.start.toLocaleDateString("it-IT")
    this.data22 = this.range.value.end.toLocaleDateString("it-IT")
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
        this.righealt = [];
        this.grincasso=data;
        var i:number
          for(i=0; i<this.grincasso.length; i++){
              var aux = [this.grincasso[i].Giorno, Number(this.grincasso[i].Incasso)];
              var y = [this.grincasso[i].Giorno, Number(this.grincasso[i].Scontrini), Number(this.grincasso[i].Pezzi)];
              this.righealt.push(y)
              this.righe.push(aux);
            }
              this.title = "Andamento Incassi da: "+this.data1+" al:"+this.data22
              this.type = ChartType.ComboChart
              this.columns = this.col
              this.data = this.righe
              this.options= {
                vAxis: { title: '€' },
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
      this.righealt2 = [];
      var i:number
        for(i=0; i<this.orario.length; i++){
          var aux = [this.orario[i].ora+' h', Number(this.orario[i].Totale) ]
          var y = [this.orario[i].ora+' h', Number(this.orario[i].Scontrini), Number(this.orario[i].Pezzi)]
          this.righe2.push(aux)
          this.righealt2.push(y)
        }
        this.title2= 'Fascia Oraria'
        this.type2= ChartType.Bar
        this.columns2 = this.col2

        this.data2 = this.righe2
        this.options2={
          chart: {
            title: "Andamento FasciaOraria da: "+this.data1+" al:"+this.data22,
            subtitle: 'Totale Scontrinato - Numero di Pezzi'
          } // Required for Material Bar Charts.
        }
        this.showgr2=true

    }
    )
  }

  cambioDati():void{

    if(!this.changgra){
      this.data = []
      this.title = "Andamento Pezzi - Scontrini da: "+this.data1+" al:"+this.data22,
      this.columns = ['Giorno','Scontrini', 'Pezzi']
      this.data = this.righealt;
      this.data2 = []
      this.columns2 = ['Ora', 'Scontrini', 'Pezzi']
      this.data2 = this.righealt2
      this.changgra=!this.changgra
      this.tasto = "Importo  €"
    }else{
      this.data = []
      this.title = "Andamento Incassi da: "+this.data1+" al:"+this.data22
      this.data = this.righe;
      this.data2 = []
      this.columns2 = this.col2
      this.data2 = this.righe2
      this.changgra = !this.changgra
      this.columns = this.col
      this.tasto = "Pezzi - Scontrini"
    }
  }

}
