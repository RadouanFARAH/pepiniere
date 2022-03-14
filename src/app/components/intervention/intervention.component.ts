import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent implements OnInit {
  plante_id: any;
  plante_nom: any;
  personnel: any;
  personnels: any;
  detail: any;
  id_plante: any;
  personnel_required: boolean = false;
  detail_required: boolean = false;
  clicked: boolean = false;
  error: boolean = false;
  url = environment.url
  data: any;
  change_btn: boolean = false;
  date_intervention: any;
  plante: any;
  order_by: any;
  group_by: any;
  date_intervention_year: any;
  date_intervention_month: any;
  date_intervention_day: any;
  date_intervention_hour: any;
  date_intervention_minute: any;
  total: number=0;
  __personnel: any;
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
    this.getPersonnel()
    this.rechercher(false)
  }
  getPersonnel() {
    this.http.get(this.url + '/getPersonnel').subscribe((res: any) => {
      this.personnels = res
    })
  }
  ajouter() {
    let data = {
      plante: this.plante_id,
      personnel: this.personnel,
      detail: this.detail
    }
    if (!data.personnel) {
      this.personnel_required = true; setTimeout(() => {
        this.personnel_required = false
      }, 1500); return
    }
    if (!data.detail) {
      this.detail_required = true; setTimeout(() => {
        this.detail_required = false
      }, 1500); return
    }

    this.http.post(this.url + '/addIntervention', data).subscribe((res: any) => {
      this.clicked = true
      this.error = false
      this.personnel = undefined
      this.detail = undefined
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
      year: this.date_intervention_year,
      month: this.date_intervention_month,
      day: this.date_intervention_day,
      hour: this.date_intervention_hour,
      minute: this.date_intervention_minute,
      plante: this.plante,
      personnel: this.__personnel,
    }
    if (reset) {
      this.order_by = undefined
      this.group_by = undefined
      this.__personnel = undefined
      this.personnel = undefined
      this.date_intervention_year=undefined,
      this.date_intervention_month=undefined,
      this.date_intervention_day=undefined,
      this.date_intervention_hour=undefined,
      this.date_intervention_minute=undefined,
      this.plante = undefined
      this.detail = undefined
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
        personnel: undefined,
      }
    }
    this.http.post(this.url + '/getIntervention', data).subscribe((result: any) => {
      this.data = result
      let total = 0
    
      for (let i =0; i<this.data.length; i++){
        let plante = this.data[i]
        if (this.group_by) total+=plante.NOMBRE_INTERVENTION;
        else total+=1;
      }
      this.total = total

    })
  }

}



