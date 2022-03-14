import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  data: any;
  url = environment.url
  cin: any;
  nom: any;
  prenom: any;
  tel: any;
  ville: any;
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
  ville_required: boolean = false;

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
      ville: this.ville
    }
    if (reset) {
      this.cin = undefined
      this.nom = undefined
      this.prenom = undefined
      this.tel = undefined
      this.ville = undefined
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
        ville: undefined
      }
    }
    this.http.post(this.url + '/getClient', data).subscribe((result: any) => {
      // console.log(result);
      this.data = result
      this.data.forEach((element:any) => {
        let CIN_CLIENT = element.CIN_CLIENT
        this.http.post(this.url+'/clientStats', { cin: CIN_CLIENT }).subscribe((res: any) => {
          element.NOMBRE_COMMANDE = res.NOMBRE_COMMANDE
          element.TOTAL_PLANTE_ACHETE = res.TOTAL_PLANTE_ACHETE
          element.PLANTE_PLUS_ACHETE = res.PLANTE_PLUS_ACHETE
        }, (err) => {
          element.NOMBRE_COMMANDE = "/!\\"
          element.TOTAL_PLANTE_ACHETE = "/!\\"
          element.PLANTE_PLUS_ACHETE = "/!\\"
        })
      });
    })
  }

  change(p: any) {
    this.cin = p.CIN_CLIENT
    this.nom = p.NOM
    this.prenom = p.PRENOM
    this.tel = p.TEL
    this.ville = p.ACTIVITE
    this.change_btn = true
  }

  update() {
    let data = {
      cin: this.cin,
      nom: this.nom,
      prenom: this.prenom,
      tel: this.tel,
      ville: this.ville
    }
    this.http.post(this.url + '/changeClient', data).subscribe((res) => {
      this.clicked = true

      this.error = false
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.cin = undefined
      this.nom = undefined
      this.prenom = undefined
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
      cin: this.cin,
      nom: this.nom,
      prenom: this.prenom,
      tel: this.tel,
      ville: this.ville
    }
    this.http.post(this.url + '/removeClient', data).subscribe((res) => {
      this.clicked = true

      this.error = false
      setTimeout(() => {
        this.clicked = false
      }, 1500);
      this.cin = undefined
      this.nom = undefined
      this.prenom = undefined
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
      cin: this.cin,
      nom: this.nom,
      prenom: this.prenom,
      tel: this.tel,
      ville: this.ville
    }
    if (!data.cin) {
      this.cin_required = true; setTimeout(() => {
        this.cin_required = false
      }, 1500); return
    }
    if (!data.nom) {
      this.nom_required = true; setTimeout(() => {
        this.nom_required = false
      }, 1500); return
    }
    if (!data.prenom) {
      this.prenom_required = true; setTimeout(() => {
        this.prenom_required = false
      }, 1500); return
    }
    if (!data.tel) {
      this.tel_required = true; setTimeout(() => {
        this.tel_required = false
      }, 1500); return
    }
    if (!data.ville) {
      this.ville_required = true; setTimeout(() => {
        this.ville_required = false
      }, 1500); return
    }

    this.http.post(this.url + '/addClient', data).subscribe((res) => {
      this.clicked = true

      this.error = false
      this.cin = undefined
      this.nom = undefined
      this.prenom = undefined
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
