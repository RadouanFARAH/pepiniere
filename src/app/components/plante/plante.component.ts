import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-plante',
  templateUrl: './plante.component.html',
  styleUrls: ['./plante.component.scss']
})
export class PlanteComponent implements OnInit {
  change_btn: boolean = false;
  error: boolean = false;
  clicked: boolean = false;
  id_plante: any;
  nom: any;
  prix: any;
  quantity: any;
  data: any;
  plus_vendus: any;
  url = environment.url
  id_plante_required: boolean = false;
  nom_required: boolean = false;
  prix_required: boolean = false;
  quantity_required: boolean = false;
  selectedPlante: any;
  // @ViewChild('accordion') accordion!: ElementRef;
  constructor(private http: HttpClient, private router: Router, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.rechercher(false)
    this.get_plus_vendus()
  }
  gotoCommande() {
    console.log(this.selectedPlante);
    this.router.navigate(['/commande'], { queryParams: { plante_id: this.selectedPlante.ID_PLANTE, plante_nom: this.selectedPlante.NOM } })
  }
  gotoFourniture() {
    this.router.navigate(['/fourniture'], { queryParams: { plante_id: this.selectedPlante.ID_PLANTE, plante_nom: this.selectedPlante.NOM } })
  }
  gotoIntervention() {
    this.router.navigate(['/intervention'], { queryParams: { plante_id: this.selectedPlante.ID_PLANTE, plante_nom: this.selectedPlante.NOM } })
  }
  change(p: any) {
    this.selectedPlante = p
    console.log(p);

    // this.router.navigate(['/plante'], { fragment: 'accordion' }).then(()=>{console.log('navigated')}).catch((e)=>{console.log(e)});
    this.viewportScroller.scrollToAnchor('accordion');
    this.id_plante = p.ID_PLANTE
    this.nom = p.NOM
    this.quantity = p.STOCK
    this.prix = p.PRIX
    this.change_btn = true
  }
  get_plus_vendus() {
    this.http.post(this.url + '/plus_vendus', {}).subscribe((res: any) => {
      this.plus_vendus = res
      this.plus_vendus.forEach((plante: any) => {
        this.http.post(this.url + '/QuantityByPlante', { plante: plante.ID_PLANTE }).subscribe((res: any) => {
          plante.quantite_vendu = res
        })
      });
    }, (err) => {
      console.log(err);
    })
  }
  rechercher(reset: boolean) {
    this.viewportScroller.scrollToAnchor('stock');

    this.change_btn = false

    let data = {
      id_plante: this.id_plante,
      nom: this.nom,
      prix: this.prix,
      quantity: this.quantity
    }
    if (reset) {
      this.get_plus_vendus()

      this.id_plante = undefined
      this.nom = undefined
      this.prix = undefined
      this.quantity = undefined

      this.data = undefined
      data = {
        id_plante: undefined,
        nom: undefined,
        prix: undefined,
        quantity: undefined
      }
    }
    this.http.post(this.url + '/getPlante', data).subscribe((result: any) => {
      // console.log(result);
      this.data = result
      this.data.forEach((plante: any) => {
        this.http.post(this.url + '/QuantityByPlante', { plante: plante.ID_PLANTE }).subscribe((res: any) => {
          plante.quantite_vendu = res
        })
      });
    })
  }

  ajouter() {
    let data = {
      id_plante: this.id_plante,
      nom: this.nom,
      prix: this.prix,
      quantity: this.quantity
    }
    if (!data.id_plante) {
      this.id_plante_required = true; setTimeout(() => {
        this.id_plante_required = false
      }, 1500); return
    }
    if (!data.nom) {
      this.nom_required = true; setTimeout(() => {
        this.nom_required = false
      }, 1500); return
    }
    if (!data.prix) {
      this.prix_required = true; setTimeout(() => {
        this.prix_required = false
      }, 1500); return
    }
    if (!data.quantity) {
      this.quantity_required = true; setTimeout(() => {
        this.quantity_required = false
      }, 1500); return
    }

    this.http.post(this.url + '/addPlante', data).subscribe((res) => {
      this.clicked = true
      this.error = false
      this.id_plante = undefined
      this.nom = undefined
      this.prix = undefined
      this.quantity = undefined
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.data = undefined
      this.rechercher(false)
    }, (err) => {
      this.clicked = true
      this.error = true
      setTimeout(() => {
        this.clicked = false
      }, 5000);
    })
  }


  update() {
    let data = {
      id_plante: this.id_plante,
      nom: this.nom,
      prix: this.prix,
      quantity: this.quantity,
    }
    this.http.post(this.url + '/changePlante', data).subscribe((res) => {
      this.clicked = true
      this.error = false
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.id_plante = undefined
      this.nom = undefined
      this.quantity = undefined
      this.prix = undefined
      this.data = undefined
      this.rechercher(false)
    }, (err) => {
      this.clicked = true

      this.error = true

    })
  }
  delete() {
    let data = {
      id_plante: this.id_plante,
      nom: this.nom,
      prix: this.prix,
      quantity: this.quantity,
    }
    this.http.post(this.url + '/removePersonnel', data).subscribe((res) => {
      this.clicked = true
      this.error = false
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.id_plante = undefined
      this.nom = undefined
      this.prix = undefined
      this.quantity = undefined
      this.data = undefined
      this.rechercher(false)
    }, (err) => {
      this.clicked = true

      this.error = true
      setTimeout(() => {
        this.clicked = false
      }, 5000);

    })
  }

}
