import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { ClientComponent } from './components/client/client.component';
import { CommandeComponent } from './components/commande/commande.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { FournitureComponent } from './components/fourniture/fourniture.component';
import { PlanteComponent } from './components/plante/plante.component';
import { InterventionComponent } from './components/intervention/intervention.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    PersonnelComponent,
    ClientComponent,
    CommandeComponent,
    FournisseurComponent,
    FournitureComponent,
    PlanteComponent,
    InterventionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "en-GB" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
