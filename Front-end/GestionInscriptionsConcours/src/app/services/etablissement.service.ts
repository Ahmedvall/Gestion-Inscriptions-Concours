import { apiRest } from './../constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  constructor(private httpc: HttpClient) { }

  ajoutEtablissement(etablissement){
    return this.httpc.post(`${apiRest}/etablissement/ajout`, etablissement);
  }

  getEtablissements() {
    return this.httpc.get(`${apiRest}/etablissement/tous`);
  }

  majEtablissement(etablissement) {
    return this.httpc.put(`${apiRest}/etablissement/maj`, etablissement);
  }

  supprimerEtablissement(id) {
    return this.httpc.delete(`${apiRest}/etablissement/supp/${id}`);
  }
}
