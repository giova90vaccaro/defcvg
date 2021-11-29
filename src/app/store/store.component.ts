import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ChartErrorEvent,ChartMouseLeaveEvent,
  ChartMouseOverEvent,ChartSelectionChangedEvent,
  ChartType,Column,
  GoogleChartComponent
} from 'angular-google-charts';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  public   title!: string;
  public   type!: ChartType;
  public   data!: any[][];
  public   columns!: Column[];
  public  options!: {};
  public rigaOraria:any[]=[];
  public   title1!: string;
  public   type1!: ChartType;
  public   data1!: any[][];
  public   columns1!: Column[];
  public  options1!: {};
  public rigaIncassi:any[]=[]
  graincasso=false

  show2=false;

  chartHeight = window.innerHeight * 0.3
  chartWidth = window.innerWidth*0.9

  graficoora:boolean=false
  negozio:any
  cat:any;
  iorario:any;
  vendite!:any
  items:any;
  showdate=false
  serie!:string;
  ricerca:boolean=false
  incassi!:any;
  NomeNegozio!:string[];
  panelOpenState = false;
  h3=['cart', 'dart', 'Venduto', 'Consegnato', 'perc'];
  h2=['cat', 'Venduto', 'Consegnato', 'perc'];
  header:string[]=['a','cat1', 'b','c', 'd', 'perc'];
  idNegozio:any;

  @ViewChild(MatPaginator, {static:false}) set paginator (value : MatPaginator){
    this.vendite.paginator = value;
  }

  constructor(private api:HttpClient,public storeselect: MatDialog,private richiesta:HttpClient ,private richiestacat:HttpClient,private router: Router, private apiinc:HttpClient) {


     const dialogRef = this.storeselect.open(SelezioneStore,{width: '25%'})
     dialogRef.afterClosed().subscribe(
       result=>{
            if(result != null){
              this.idNegozio = result
              this.NomeNegozio=this.idNegozio.split(";", 2)
              this.ricerca=!this.ricerca
              this.Orario(this.NomeNegozio[1])
              this.serie = this.NomeNegozio[1]
          }else{
            window.location.reload();
          }
       }
     )

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
    Orario(serie:string):void{
      this.api.get("https://cvggold-dash.ns0.it/json/store/hours.php?serie="+serie).subscribe(
        data=>{
            this.iorario = []
            this.rigaOraria = []
            this.iorario = data
            var i:number
            for(i=0; i<this.iorario.length; i++){
                this.rigaOraria.push([String(this.iorario[i].Ora), Number(this.iorario[i].today), Number(this.iorario[i].Week), Number(this.iorario[i].Mounth)])
            }
            console.log(this.rigaOraria)
            //Creazione Fascia Media Oraria Mese Settimana
            this.title = "Fascia Oraria"
            this.type = ChartType.Bar
            this.columns = ['Ora', 'Oggi', 'Settima', 'Mese']
            this.data = this.rigaOraria
            this.options = {
              title: "Andamento FasciaOraria",
              subtitle: 'Totale Scontrinato - Numero di Pezzi'
            }
            this.graficoora = true;
        }
      )
        //richiesta incasso ultimi7 giorni
        this.apiinc.get("https://cvggold-dash.ns0.it/json/store/hstincDet.php?serie="+serie).subscribe(
          data=>{
            this.incassi = data;
            var i:number
              for(i=0; i < this.incassi.length; i++){
                  this.rigaIncassi.push([this.incassi[i].data,Number(this.incassi[i].TotaleImporto)])
               }
               this.title1 = "Incassi ultimi 7 Giorni"
               this.type1 = ChartType.ComboChart
               this.columns1 = ['Giorno', 'Incasso']
               this.data1 = this.rigaIncassi
               this.options1 = {
                vAxis: { title: '€' },
                hAxis: { title: 'Giorno' }
               }
               this.graincasso = true;


          }
        )

    }
    searchDate():void{
      if(this.range.value.start!=null){
        var aux:any;
        this.showdate=true
        const dat="d1="+this.range.value.start.toLocaleDateString("en-US")+"&d2="+this.range.value.end.toLocaleDateString("en-US");
          this.richiesta.get("https://cvggold-dash.ns0.it/json/store/venditetd_json.php?serie="+this.serie+"&"+dat).subscribe(
            data=>{
              aux=data
              this.vendite = new MatTableDataSource(aux);
              this.show2 = true
            }
          )
          this.richiestacat.get("https://cvggold-dash.ns0.it/json/store/catDate.php?serie="+this.serie+"&"+dat).subscribe(
            data=>{
              console.log(data)
            }
          )

      }else{
        console.log("Nessuna data inserita")
      }

    }

  }

  @Component({
    selector:'SelezioneStore',
    templateUrl:'selezionestore.html',
    styleUrls: ['./store.component.css']
  })
  export class SelezioneStore{

    public store:any;
    public negozio!:any;

    constructor(private api:HttpClient, public dialogRef: MatDialogRef<SelezioneStore>){
      this.api.get("https://cvggold-dash.ns0.it/json/dettagli/store_json.php").subscribe(
        data=>{
          this.store = data;
      })
    }

    refturn():void{
      this.dialogRef.close(this.negozio)
    }

  }

