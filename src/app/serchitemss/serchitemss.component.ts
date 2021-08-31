import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-serchitemss',
  templateUrl: './serchitemss.component.html',
  styleUrls: ['./serchitemss.component.css']
})
export class SerchitemssComponent implements OnInit {

  src="https://cvggold-dash.ns0.it/prodotti/imgdet.php?art="
  foto!:String;
  cod!:String;
  show!:boolean
  articolo:any;
  progressive!:boolean;
  tabella:any;
  documenti:any;
  hdocumenti:string[]=['ragioneSociale', 'data', 'qta', 'numero'];
  header:string[]=['Negozio', 'Consegnato', 'Venduti','Perc','Giacenza'];
  nome:any; descrizione:any;madre:any; barcode:any;prezzo:any;cat:any;media:any;

  constructor(public dialog:MatDialog, private messaggio:MatSnackBar, private api:HttpClient, private dettaglio:HttpClient,private richiesta : HttpClient, private dettart : HttpClient, private doc:HttpClient) { }
  ngOnInit(): void {
  }
  cerca(x:String):void{
    this.show=false;
    if(x){
    this.progressive=true;
    console.log(x);
    this.foto = this.src+x;

    this.cod=x;

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
        this.media = this.articolo.media;
      }
    )
console.log("https://cvggold-dash.ns0.it/prodotti/tabella.php?art="+x);
    this.dettart.get("https://cvggold-dash.ns0.it/prodotti/tabella.php?art="+x).subscribe(
      data=>{
          this.tabella = data;
          console.log(this.tabella);
      })

      this.doc.get("https://cvggold-dash.ns0.it/prodotti/documenti.php?art="+x).subscribe(
        data=>{
            this.documenti = data;
            console.log(this.documenti);
        }
      );

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
