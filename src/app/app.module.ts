import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHomeComponent } from './nav-home/nav-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { TodayComponent, DettPage,DettPageArt,DettPageCat} from './today/today.component';
import { WeekComponent } from './week/week.component';
import { MonthComponent } from './month/month.component';
import { StartComponent } from './start/start.component';
import { SerchitemssComponent,DialogContentExampleDialog } from './serchitemss/serchitemss.component';
import { SvenditeComponent,DettArt, Consegnato, Venduto, Tagliacolore } from './svendite/svendite.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { VcategoriaComponent } from './vcategoria/vcategoria.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreComponent } from './store/store.component';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavHomeComponent,
    StartComponent,
    TodayComponent,
    WeekComponent,
    MonthComponent,
    SerchitemssComponent,
    SvenditeComponent,
    VcategoriaComponent,
    DettArt,
    Consegnato,
    Venduto,
    Tagliacolore,
    DettPage,
    DettPageArt,
    DettPageCat,
    StoreComponent,
    DialogContentExampleDialog
  ],
  entryComponents: [DettArt,DettPage,DettPageArt,DettPageCat,DialogContentExampleDialog,Consegnato,Venduto, Tagliacolore],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSortModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatProgressBarModule,
    GoogleChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
