



import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fourniture',
  templateUrl: './fourniture.component.html',
  styleUrls: ['./fourniture.component.scss']
})
export class FournitureComponent implements OnInit {
  plante_id: any;
  plante_nom: any;
  fournisseur: any;
  __fournisseur: any;
  fournisseurs: any;
  quantity: any;
  id_plante: any;
  fournisseur_required: boolean = false;
  quantity_required: boolean = false;
  clicked: boolean = false;
  error: boolean = false;
  url = environment.url
  data: any;
  change_btn: boolean = false;
  date_fourniture: any;
  plante: any;
  order_by: any;
  group_by: any;
  date_fourniture_year: any;
  date_fourniture_month: any;
  date_fourniture_day: any;
  date_fourniture_hour: any;
  date_fourniture_minute: any;
  total: number = 0;
  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe((params) => {
      this.plante_id = params.plante_id
      this.plante_nom = params.plante_nom

    })
  }
  preventCaracters(event: { key: any; }) {

    let regex = /[0-9]/g;
    var k;
    k = event.key;  //         k = event.keyCode;  (Both can be used)
    let isNumeric = regex.test(k);
    return isNumeric
  }
  ngOnInit(): void {
    this.getFournisseur()
    this.rechercher(false)
  }
  getFournisseur() {
    this.http.get(this.url + '/getFournisseur').subscribe((res: any) => {
      this.fournisseurs = res
    })
  }
  ajouter() {
    let data = {
      plante: this.plante_id,
      fournisseur: this.fournisseur,
      quantity: this.quantity
    }
    if (!data.fournisseur) {
      this.fournisseur_required = true; setTimeout(() => {
        this.fournisseur_required = false
      }, 1500); return
    }
    if (!data.quantity) {
      this.quantity_required = true; setTimeout(() => {
        this.quantity_required = false
      }, 1500); return
    }

    this.http.post(this.url + '/addFourniture', data).subscribe((res: any) => {
      this.clicked = true
      this.error = false
      this.fournisseur = undefined
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

  rechercher(reset: boolean) {
    this.change_btn = false

    let data = {
      order_by: this.order_by,
      group_by: this.group_by,
      year: this.date_fourniture_year,
      month: this.date_fourniture_month,
      day: this.date_fourniture_day,
      hour: this.date_fourniture_hour,
      minute: this.date_fourniture_minute,
      plante: this.plante,
      fournisseur: this.__fournisseur,
    }
    if (reset) {
      this.order_by = undefined
      this.group_by = undefined
      this.__fournisseur = undefined
      this.date_fourniture_year = undefined,
        this.date_fourniture_month = undefined,
        this.date_fourniture_day = undefined,
        this.date_fourniture_hour = undefined,
        this.date_fourniture_minute = undefined,
        this.plante = undefined
      this.quantity = undefined
      this.data = undefined
      data = {
        order_by: undefined,
        group_by: undefined,
        year: undefined,
        month: undefined,
        day: undefined,
        hour: undefined,
        minute: undefined,
        plante: undefined,
        fournisseur: undefined,
      }
    }
    this.http.post(this.url + '/getFourniture', data).subscribe((result: any) => {
      this.data = result
      let total = 0

      for (let i = 0; i < this.data.length; i++) {
        let plante = this.data[i]
        total += plante.QUANTITE_FOURNIE
      }
      this.total = total

    })
  }

}



