import { HttpClient } from '@angular/common/http';
import { apiRest } from './../constantes';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor(private httpc: HttpClient) { }

  ajoutFiliere(filiere){
    return this.httpc.post(`${apiRest}/filiere/ajout`, filiere);
  }

  getFilieres() {
    return this.httpc.get(`${apiRest}/filiere/tous`);
  }

  majFiliere(filiere) {
    return this.httpc.put(`${apiRest}/filiere/maj`, filiere);
  }

  supprimerFiliere(id) {
    return this.httpc.delete(`${apiRest}/filiere/supp/${id}`);
  }
}
