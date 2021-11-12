import { VcategoriaComponent } from './vcategoria/vcategoria.component';
import { SvenditeComponent } from './svendite/svendite.component';
import { SerchitemssComponent } from './serchitemss/serchitemss.component';
import { StartComponent } from './start/start.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayComponent } from './today/today.component';
import { StoreComponent } from './store/store.component';
import { HistorystoreComponent } from './historystore/historystore.component';


const routes: Routes = [
  {path:"home",  component:StartComponent},
  {path:"store", component:StoreComponent},
  {path:"sritemss", component:SerchitemssComponent},
  {path:"", component:StartComponent},
  {path:"vendite", component:SvenditeComponent},
  {path:"categoria", component:VcategoriaComponent},
  {path:"history", component:HistorystoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
