import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-serchitemss',
  templateUrl: './serchitemss.component.html',
  styleUrls: ['./serchitemss.component.css']
})
export class SerchitemssComponent implements OnInit {

  src="https://cvggold-dash.ns0.it/prodotti/imgdet.php?art="
  url= "https://cvggold-dash.ns0.it/json/newdett/reportstoreitems.php?art="
  urlvendita= "https://cvggold-dash.ns0.it/json/newdett/valorevendita.php?art="
  foto!:String;
  cod!:String;
  show!:boolean
  articolo:any;
  progressive!:boolean;
  tabella:any;
  documenti:any;
  hdocumenti:string[]=['ragioneSociale', 'data', 'qta', 'numero'];
  header = ['iDNegozio', 'Venduto', 'Ricevuto', 'Reso', 'Inviato', 'Prc', 'Rim']
  nome:any; descrizione:any;madre:any; barcode:any;prezzo:any;cat:any;media:any;
  vvendita!:any;

  public  title2!: string;
  public  type2!: ChartType;
  public  data2!: any[][];
  public  columns2!: Column[];
  public  options2!: {};


  public   title!: string;
  public   type!: ChartType;
  public   data!: any[][];
  public   columns!: Column[];
  public  options!: {};
  count=0;
  cost=0;
  grafico:boolean=false
  grafico2:boolean=false
  righe!:any;
  righe2!:any;
  testrighe:any[]=[]
  testrighe2:any[]=[]
  colonne = ['Week','01 - CVG ASSAGO','02 - CVG GLOBO'	,'03 - CVG PEDRENGO','04 - CVG LIMBIATE','05 - CVG PAVIA','06 - CVG GIUSSANO','07 - CVG AMBIVERE','08 - CVG MAGENTA','09 - CVG VOGHERA','10 - CVG PIACENZA'];
  colonnastor = ['Week', 'Store']
  constructor(public dialog:MatDialog, private vv: HttpClient,private req2:HttpClient,private req3:HttpClient,private messaggio:MatSnackBar, private api:HttpClient, private dettaglio:HttpClient,private richiesta : HttpClient, private dettart : HttpClient, private doc:HttpClient) { }
  ngOnInit(): void {
  }
  cerca(x:String):void{
    this.grafico=false;
    this.grafico2=false;
    this.show=false;
    if(x){
    this.progressive=true;
    console.log(x);
    this.foto = this.src+x;

    this.cod=x
    this.richiesta.get("https://cvggold-dash.ns0.it/prodotti/dettarticolo.php?art="+x).subscribe(
      data=>{
        this.articolo=data;
        this.show=true;
        this.progressive=false;
        this.nome = this.articolo.nome;
        this.descrizione = this.articolo.descrizione;
        this.cat=this.articolo.cat;
        this.barcode = this.articolo.barcode
        this.prezzo = this.articolo.Prezzo;

        this.vv.get(this.urlvendita+this.articolo.nome).subscribe(
          data=>{
              this.vvendita = data;
          }
        )

        this.req2.get("https://cvggold-dash.ns0.it/prodotti/GraficoAndamento.php?id="+this.articolo.id).subscribe(
                data=>{
                  this.testrighe= []
                    this.righe = data;
                    var i:number
                      for( i = 0; i< this.righe.length; i++){
                    var aux=[this.righe[i].Week.toString(), this.righe[i].a, this.righe[i].b, this.righe[i].c, this.righe[i].d, this.righe[i].e, this.righe[i].f, this.righe[i].g, this.righe[i].h, this.righe[i].i, this.righe[i].l];
                      this.testrighe.push(aux)
                      }
                      this.title2= 'AndamentoPerNegozio',
                      this.type2= ChartType.ComboChart,
                      this.columns2= this.colonne,
                      this.data2= this.testrighe,
                      this.options2= {
                        vAxis: { title: 'Pz' },
                        hAxis: { title: 'Week' },
		                    width: 700
                      }

                    this.grafico = true;
                }
              )
              this.req3.get("https://cvggold-dash.ns0.it/prodotti/GraficoAndamentoSingolo.php?id="+this.articolo.id).subscribe(
                data=>{
                  this.testrighe2=[]
                    this.righe2 = data;
                    console.log(this.righe2.length)
                    var i:number
                      for( i = 0; i< this.righe2.length; i++){
                    var aux=[this.righe2[i].Week.toString(), this.righe2[i].store];
                      this.testrighe2.push(aux)
                      }
                   this.title = "AndamentoGenerale"
                    this.type= ChartType.ComboChart
                    this.columns= this.colonnastor
                    this.data=this.testrighe2
                    this.options= {
                        vAxis: { title: 'Pz2' },
                        hAxis: { title: 'Week2' },
		                    width: 700
                      };
                    this.grafico2 = true;

                }
              )
              this.doc.get("https://cvggold-dash.ns0.it/prodotti/documenti.php?art="+this.articolo.id).subscribe(
                data=>{
                  this.documenti =[]
                  this.documenti = data;
                  var i: number
                  this.count = 0
                  for(i = 0; i<this.documenti.length; i++){
                      this.count = Number(this.documenti[i].qta)+this.count
                  }
        }
      );


        this.media = this.articolo.media;
        this.dettart.get(this.url+this.articolo.nome).subscribe(
      data=>{
        this.tabella=[];
        this.cost = 0;
          this.tabella = data;
          var i:number
          var aux:number
          this.cost = 0;
            for(i = 0; i<this.tabella.length; i++){
              aux = Number(((this.tabella[i].Ricevuto-this.tabella[i].VeNduto)+this.tabella[i].Reso)-this.tabella[i].Inviato)
              this.cost = aux + this.cost
            }
      })
      },
      error=>{this.messaggio.open('Errore Connessione Controllare i Dati inseriti', 'X'), this.progressive=false}

    )

    }else{
        this.messaggio.open('Nessun Articolo Inserito', 'X')
    }
  }
  openDialog(par:string) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      width:'95%',
      data:par
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./serchitemss.component.css']
})
export class DialogContentExampleDialog {

  det:any;
  itemss:any;
  src="https://cvggold-dash.ns0.it/json/dettagli/imgjson.php?art="
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private risposta:HttpClient, private ana:HttpClient){

    risposta.get("https://cvggold-dash.ns0.it/json/store/store.php?art="+this.data).subscribe(
      x=>{
        this.det = x
        console.log(this.det)
    })

    ana.get("https://cvggold-dash.ns0.it/json/dettagli/item_json.php?x="+data).subscribe(
      fg=>{
        this.itemss=fg;
        this.src = this.src+this.itemss[0].articolo;
        console.log(this.src)
      }
    )

  }
}
@Component({
  selector: 'MessaggioComponent',
  templateUrl: 'messaggio.html',
  styleUrls: ['./serchitemss.component.css']
})
export class MessaggioComponent {}
