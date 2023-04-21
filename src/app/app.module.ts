import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AvatarComponent} from './avatar/avatar.component';
import {environment} from '../environments/environment';
import {CountdownModule} from "ngx-countdown";
import {registerLocaleData} from '@angular/common';
import km from '@angular/common/locales/km';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AppsComponent} from "./pages/apps/apps.component";
import {JoinComponent} from "./pages/join/join.component";
import {LocationComponent} from "./pages/location/location.component";
import {AgendaComponent} from "./pages/agenda/agenda.component";
import {SupplierComponent} from "./pages/supplier/supplier.component";
import {PaymentComponent} from "./pages/payment/payment.component";
import {WishesComponent} from "./pages/wishes/wishes.component";
import {WishComponent} from "./pages/wish/wish.component";
import {WishDialogComponent} from "./pages/wish-dialog/wish-dialog.component";
import {GroupJoiningComponent} from "./pages/group-joining/group-joining.component";
import {SafePipe} from "./safe.pipe";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule} from "@angular/material/snack-bar";

registerLocaleData(km);
const routes: Routes = [
  {
    path: '',
    redirectTo: 'join',
    pathMatch: 'full'
  },
  {
    path: 'join',
    component: JoinComponent
  },
  {
    path: 'apps',
    component: AppsComponent
  },
  {
    path: 'agenda',
    component: AgendaComponent
  },
  {
    path: 'supplier',
    component: SupplierComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'wishes',
    component: WishesComponent
  },
  {
    path: 'group-joining',
    component: GroupJoiningComponent
  },
  // {
  //   path: '**',
  //   redirectTo: 'join',
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AvatarComponent,
    AppsComponent,
    LocationComponent,
    AgendaComponent,
    SupplierComponent,
    PaymentComponent,
    WishesComponent,
    WishComponent,
    WishDialogComponent,
    GroupJoiningComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CountdownModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'km_KH'},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
      } as MatSnackBarConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
