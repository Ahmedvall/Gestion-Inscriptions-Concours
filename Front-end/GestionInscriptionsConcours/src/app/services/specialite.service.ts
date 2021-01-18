import { apiRest } from 'src/app/constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  constructor(private httpc: HttpClient) { }

  ajoutSpecialite(specialite){
    return this.httpc.post(`${apiRest}/specialite/ajout`, specialite);
  }

  getSpecialites() {
    return this.httpc.get(`${apiRest}/specialite/tous`);
  }

  majSpecialite(specialite) {
    return this.httpc.put(`${apiRest}/specialite/maj`, specialite);
  }

  supprimerSpecialite(id) {
    return this.httpc.delete(`${apiRest}/specialite/supp/${id}`);
  }
}
