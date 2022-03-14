
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  data: any;
  url = environment.url
  error: boolean = false;
  clicked: boolean = false;
  change_btn: boolean = false;
  order_by: any;
  group_by: any;
  id: any;
  ville: any;
  nom: any;
  id_required: boolean=false;
  ville_required: boolean=false;
  nom_required: boolean = false;
  tel: any;
  tel_required: boolean=false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.rechercher(false)
  }

  rechercher(reset: boolean) {
    this.change_btn = false
    let data = {
      order_by: this.order_by,
      group_by: this.group_by,
      id: this.id,
      nom: this.nom,
      tel: this.tel,
      ville: this.ville
    }
    if (reset) {
      this.id = undefined
      this.nom = undefined
      this.tel = undefined
      this.ville = undefined
      this.order_by = undefined
      this.group_by = undefined
      this.data = undefined
      data = {
        order_by: undefined,
        group_by: undefined,
        id: undefined,
        nom: undefined,
        tel: undefined,
        ville: undefined
      }
    }
    this.http.post(this.url + '/getFournisseur', data).subscribe((result: any) => {
     // console.log(result);
      this.data = result
    })
  }

  change(p: any) {
    this.id = p.ID_FOURNISSEUR
    this.nom = p.NOM
    this.ville = p.VILLE
    this.tel = p.TEL
    this.change_btn = true
  }

  update() {
    let data = {
      id: this.id,
      nom: this.nom,
      tel: this.tel,
      ville: this.ville
    }
    this.http.post(this.url + '/changeFournisseur', data).subscribe((res) => {
    this.clicked = true

      this.error = false
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.id = undefined
      this.nom = undefined
      this.tel = undefined
      this.ville = undefined
      this.data = undefined
      this.rechercher(false)
    }, (err) => {
    this.clicked = true

      this.error = true

    })
  }
  delete() {
    let data = {
      id: this.id,
      nom: this.nom,
      tel: this.nom,
      ville: this.ville
    }
    this.http.post(this.url + '/removeFournisseur', data).subscribe((res) => {
    this.clicked = true

      this.error = false
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.id = undefined
      this.nom = undefined
      this.tel = undefined
      this.ville = undefined
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
      id: this.id,
      nom: this.nom,
      tel: this.tel,
      ville: this.ville
    }
    if (!data.id) {this.id_required=true;setTimeout(() => {
      this.id_required=false
    }, 1500); return}
    if (!data.nom) {this.nom_required=true;setTimeout(() => {
      this.nom_required=false
    }, 1500); return}
    if (!data.tel) {this.tel_required=true;setTimeout(() => {
      this.tel_required=false
    }, 1500); return}
    if (!data.ville) {this.ville_required=true;setTimeout(() => {
      this.ville_required=false
    }, 1500); return}

    this.http.post(this.url + '/addFournisseur', data).subscribe((res) => {
    this.clicked = true

      this.error = false
      this.id = undefined
      this.nom = undefined 
      this.tel = undefined 
      this.ville = undefined
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
