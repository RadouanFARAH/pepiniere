import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  plante_id: any;
  plante_nom: any;
  client: any;
  __client: any;
  clients: any;
  quantity: any;
  id_plante: any;
  client_required: boolean = false;
  quantity_required: boolean = false;
  clicked: boolean = false;
  error: boolean = false;
  url = environment.url
  data: any;
  change_btn: boolean = false;
  date_commande: any;
  plante: any;
  order_by: any;
  group_by: any;
  date_commande_year: any;
  date_commande_month: any;
  date_commande_day: any;
  date_commande_hour: any;
  date_commande_minute: any;
  total: number=0;
  constructor(private http: HttpClient, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe((params) => {
      this.plante_id = params.plante_id
      this.plante_nom = params.plante_nom
      console.log(params);

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
    this.getClient()
    this.rechercher(false)
  }
  getClient() {
    this.http.get(this.url + '/getClient').subscribe((res: any) => {
      this.clients = res
    })
  }
  ajouter() {
    let data = {
      plante: this.plante_id,
      client: this.client,
      quantity: this.quantity
    }
    if (!data.client) {
      this.client_required = true; setTimeout(() => {
        this.client_required = false
      }, 1500); return
    }
    if (!data.quantity) {
      this.quantity_required = true; setTimeout(() => {
        this.quantity_required = false
      }, 1500); return
    }

    this.http.post(this.url + '/addCommande', data).subscribe((res: any) => {
      this.clicked = true
      this.error = false
      this.client = undefined
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
      year: this.date_commande_year,
      month: this.date_commande_month,
      day: this.date_commande_day,
      hour: this.date_commande_hour,
      minute: this.date_commande_minute,
      plante: this.plante,
      client: this.__client,
    }
    if (reset) {
      this.order_by = undefined
      this.group_by = undefined
      this.client = undefined
      this.date_commande_year=undefined,
      this.date_commande_month=undefined,
      this.date_commande_day=undefined,
      this.date_commande_hour=undefined,
      this.date_commande_minute=undefined,
      this.plante = undefined
      this.__client = undefined
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
        client: undefined,
      }
    }
    this.http.post(this.url + '/getCommande', data).subscribe((result: any) => {
      this.data = result
      let total = 0
    
      for (let i =0; i<this.data.length; i++){
        let plante = this.data[i]
        total+=plante.QUANTITE_COMMANDE
      }
      this.total = total

    })
  }

}



