import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { CommandeComponent } from './components/commande/commande.component';
import { FournisseurComponent } from './components/fournisseur/fournisseur.component';
import { FournitureComponent } from './components/fourniture/fourniture.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { PlanteComponent } from './components/plante/plante.component';
import { InterventionComponent } from './components/intervention/intervention.component';

const routes: Routes = [
  {
    path:'commande',
    component:CommandeComponent
  },
  {
    path:'intervention',
    component:InterventionComponent
  },
  {
    path:'fourniture',
    component:FournitureComponent
  },
  {
    path:'plante',
    component:PlanteComponent
  },
  {
    path:'fournisseur',
    component:FournisseurComponent
  },
  {
    path:'client',
    component:ClientComponent
  },
  {
    path:'personnel',
    component:PersonnelComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'plante'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
