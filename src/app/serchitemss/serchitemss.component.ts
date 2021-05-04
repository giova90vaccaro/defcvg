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

  itemss:any;
  shop:any;
  urlimg!:string;
  s=false;
  m=false
  src="https://cvggold-dash.ns0.it/json/dettagli/imgjson.php?art="
  h1=['categoeria','articolo','prezzo','id']
  constructor(public dialog:MatDialog, private messaggio:MatSnackBar, private api:HttpClient, private dettaglio:HttpClient) { }
  ngOnInit(): void {
  }

  rit(item:String):void{
    var dim:number;
    if(!item){
      this.messaggio.open("Errore Codice Non inserito", "X")
    }else{
      this.api.get("https://cvggold-dash.ns0.it/json/dettagli/item_json.php?x="+item).subscribe(
        data=>{
            this.itemss = data
            console.log(data)
            dim = this.itemss.length;
            if(dim>1){
              this.m=true
              this.s=false
            }else{
              //entro nella tabella singola
              this.dettaglio.get("https://cvggold-dash.ns0.it/json/store/store.php?art="+this.itemss[0].articolo).subscribe(
                data=>{
                  this.shop = data;
                  console.log(this.shop)
                }
              )
              this.m=false
              this.s=true
            }

        },
        error=>{
          console.log("errore della pagina")
        }
      )
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
