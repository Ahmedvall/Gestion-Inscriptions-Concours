import { apiRest } from './../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private httpc: HttpClient) { }

  ajoutVille(ville){
    return this.httpc.post(`${apiRest}/ville/ajout`, ville);
  }

  getVilles() {
    return this.httpc.get(`${apiRest}/ville/tous`);
  }

  majVille(ville) {
    return this.httpc.put(`${apiRest}/ville/maj`, ville);
  }

  supprimerVille(id) {
    return this.httpc.delete(`${apiRest}/ville/supp/${id}`);
  }

}
