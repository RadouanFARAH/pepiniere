import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {
  data: any;
  url = environment.url
  cin: any;
  nom: any;
  prenom: any;
  tel: any;
  activity: any;
  error: boolean = false;
  clicked: boolean = false;
  change_btn: boolean = false;
  order_by: any;
  group_by: any;
  search_by: any;
  cin_required: boolean = false;
  nom_required: boolean = false;
  prenom_required: boolean = false;
  tel_required: boolean = false;
  activity_required: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.rechercher(false)
  }

  rechercher(reset: boolean) {
    this.change_btn = false

    let data = {
      order_by: this.order_by,
      group_by: this.group_by,
      cin: this.cin,
      nom: this.nom,
      prenom: this.prenom,
      tel: this.tel,
      activity: this.activity
    }
    if (reset) {
      this.cin = undefined
      this.nom = undefined
      this.prenom = undefined
      this.tel = undefined
      this.activity = undefined
      this.order_by = undefined
      this.group_by = undefined
      this.data = undefined
      data = {
        order_by: undefined,
        group_by: undefined,
        cin: undefined,
        nom: undefined,
        prenom: undefined,
        tel: undefined,
        activity: undefined
      }
    }
    this.http.post(this.url + '/getPersonnel', data).subscribe((result: any) => {
     // console.log(result);
      this.data = result
    })
  }

  change(p: any) {
    this.cin = p.CIN_PERSONNEL
    this.nom = p.NOM
    this.prenom = p.PRENOM
    this.tel = p.TEL
    this.activity = p.ACTIVITE
    this.change_btn = true
  }

  update() {
    let data = {
      cin: this.cin,
      nom: this.nom,
      prenom: this.prenom,
      tel: this.tel,
      activity: this.activity
    }
    this.http.post(this.url + '/changePersonnel', data).subscribe((res) => {
    this.clicked = true

      this.error = false
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.cin = undefined
      this.nom = undefined
      this.prenom = undefined
      this.tel = undefined
      this.activity = undefined
      this.data = undefined
      this.rechercher(false)
    }, (err) => {
    this.clicked = true

      this.error = true

    })
  }
  delete() {
    let data = {
      cin: this.cin,
      nom: this.nom,
      prenom: this.prenom,
      tel: this.tel,
      activity: this.activity
    }
    this.http.post(this.url + '/removePersonnel', data).subscribe((res) => {
    this.clicked = true
      this.error = false
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.cin = undefined
      this.nom = undefined
      this.prenom = undefined
      this.tel = undefined
      this.activity = undefined
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
  ajouter() {
    let data = {
      cin: this.cin,
      nom: this.nom,
      prenom: this.prenom,
      tel: this.tel,
      activity: this.activity
    }
    if (!data.cin) {this.cin_required=true;setTimeout(() => {
      this.cin_required=false
    }, 1500); return}
    if (!data.nom) {this.nom_required=true;setTimeout(() => {
      this.nom_required=false
    }, 1500); return}
    if (!data.prenom) {this.prenom_required=true;setTimeout(() => {
      this.prenom_required=false
    }, 1500); return}
    if (!data.tel) {this.tel_required=true;setTimeout(() => {
      this.tel_required=false
    }, 1500); return}
    if (!data.activity) {this.activity_required=true;setTimeout(() => {
      this.activity_required=false
    }, 1500); return}

    this.http.post(this.url + '/addPersonnel', data).subscribe((res) => {
    this.clicked = true

      this.error = false
      this.cin = undefined
      this.nom = undefined
      this.prenom = undefined
      this.tel = undefined
      this.activity = undefined
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

}
