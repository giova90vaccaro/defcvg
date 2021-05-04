import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild,Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { matDrawerAnimations } from '@angular/material/sidenav';
import{ GoogleChartInterface } from 'ng2-google-charts'

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  incasso:any;
  articoli:any;
  categoria:any;
  show:any=true;
  show2:any= true;
  show3:any=true;
  i=0;
  h1:string[]=['Negozio', 'Oggi', 'Pezzi', 'Scontrini'];
  h2:string[]=['codiceArticolo','descrizione', 'TotalQ', 'TotalEu'];
  h3:string[]=['cat', 'qta', 'euro'];

  grincasso: GoogleChartInterface = {
    chartType: 'PieChart',
    //firstRowIsData: true,
    options: {'title': 'Negozio', 'is3D':true, 'align':'left','width':'150%','width_unit':'%', 'height':'400'},
  };
  grarticoli: GoogleChartInterface = {
    chartType: 'PieChart',
    //firstRowIsData: true,
    options: {'title': 'Articoli', 'is3D':true, 'align':'left','width':'150%','width_unit':'%', 'height':'400'},
  };
  grcategoria: GoogleChartInterface = {
    chartType: 'PieChart',
    //firstRowIsData: true,
    options: {'title': 'Articoli', 'is3D':true, 'align':'left','width':'150%','width_unit':'%', 'height':'400'},
  };

  constructor(private api:HttpClient, public detpag:MatDialog, public detart:MatDialog, public detcat:MatDialog) {

    this.api.get("https://cvggold-dash.ns0.it/json/inc_json.php").subscribe(
      data=>{
        this.incasso=data;
        var gr = this.incasso.map(function(aux:any){return [aux.Negozio, parseInt(aux.Oggi)]})
        gr = [['Negozio', 'Oggi']].concat(gr);
        this.grincasso.dataTable=gr;
      }
    );
    this.api.get("https://cvggold-dash.ns0.it/json/art_jsond.php").subscribe(
      art=>{
        this.articoli=art;
        var gra = this.articoli.map(function(aux:any){ return [aux.codiceArticolo, parseInt(aux.TotalQ)] })
        gra = [['Articolo', 'Q.ta']].concat(gra);
        this.grarticoli.dataTable=gra;
      }
    );
    this.api.get("https://cvggold-dash.ns0.it/json/cat_json.php").subscribe(
      cat=>{
        this.categoria=cat;
        var grc = this.categoria.map(function(aux:any){ return [aux.cat,parseInt(aux.qta)] })
        grc = [['Categoria', 'Q.ta']].concat(grc);
        this.grcategoria.dataTable = grc;

      }
    );
   }
   openDialogArt(rxart:string):void{
    const rifDialogArt = this.detart.open(DettPageArt,{
      width:'80%',
      data:rxart
    });
   }
   grafico():void{
      this.show = !this.show;
   }
   grafico2():void{
    this.show2 = !this.show2;
 }
 grafico3():void{
  this.show3 = !this.show3;
}
   openDialog(rx:string):void{
      const rifDialog= this.detpag.open(DettPage,{
        width:'95%',
        data :rx
      });
   }
   openDetCat(rx:string):void{
      console.log("Det Categoria negozio");
      const rifDialogCat = this.detcat.open(DettPageCat,{
        width:'90%',
        data:rx
      })
   }
  ngOnInit(): void {
  }
}
@Component({
  selector: 'dett-pages',
  templateUrl:'dett-pages.html',
  styleUrls: ['./today.component.css']
})
export class DettPage{

  detcat:any;
  detart:any;
  hart:string[]=['cod','cat','qta'];
  constructor( @Inject(MAT_DIALOG_DATA) public data:any, private rapi:HttpClient){

    this.rapi.get("https://cvggold-dash.ns0.it/json/dettagli/detcat_json.php?id="+this.data).subscribe(
      data=>{
        this.detcat = data
      }
    );
    this.rapi.get("https://cvggold-dash.ns0.it/json/dettagli/detart_json.php?id="+this.data).subscribe(
      data=>{
        this.detart = data
      }
    )
  }
}
@Component({
  selector: 'dettart-pages',
  templateUrl:'dettart-pages.html',
  styleUrls: ['./today.component.css']
})
export class DettPageArt{

  detart:any;
  src!:any
  constructor( @Inject(MAT_DIALOG_DATA) public data:any,private rapi2:HttpClient){

    this.rapi2.get("https://cvggold-dash.ns0.it/json/dettagli/det2_json.php?art="+this.data).subscribe(
      data=>{
        this.detart = data;
        this.src = "https://cvggold-dash.ns0.it/json/dettagli/imgjson.php?art="+this.detart[0].codiceArticolo
      }
      )
  }
}
@Component({
  selector: 'dettcat-pages',
  templateUrl:'dettcat-pages.html',
  styleUrls: ['./today.component.css']
})
export class DettPageCat{

  detcat:any;

  constructor( @Inject(MAT_DIALOG_DATA) public data:any,private rapi2:HttpClient){
    this.rapi2.get("https://cvggold-dash.ns0.it/json/dettagli/detvcat_json.php?cat="+this.data).subscribe(
      data=>{
          this.detcat = data
      }
    )
  }
}

