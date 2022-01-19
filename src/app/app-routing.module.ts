import { VcategoriaComponent } from './vcategoria/vcategoria.component';
import { SvenditeComponent } from './svendite/svendite.component';
import { SerchitemssComponent } from './serchitemss/serchitemss.component';
import { StartComponent } from './start/start.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './today/today.component';
import { StoreComponent } from './store/store.component';
import { HistorystoreComponent } from './historystore/historystore.component';
import { DocserchdetComponent } from './docserchdet/docserchdet.component';
import { StockComponent } from './stock/stock.component';


const routes: Routes = [
  {path:"Home",  component:StartComponent},
  {path:"Store", component:StoreComponent},
  {path:"Sritemss", component:SerchitemssComponent},
  {path:"", component:StartComponent},
  {path:"Vendite", component:SvenditeComponent},
  {path:"Categoria", component:VcategoriaComponent},
  {path:"History", component:HistorystoreComponent},
  {path:"Document", component:DocserchdetComponent},
  {path:"Stock", component:StockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
