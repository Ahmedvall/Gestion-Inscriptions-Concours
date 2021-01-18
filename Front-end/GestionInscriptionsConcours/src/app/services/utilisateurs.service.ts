import { ChefFiliereModule } from './../models/chef-filiere.module';
import { EnseignantModule } from './../models/enseignant.module';
import { apiRest } from './../constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  constructor(private httpc: HttpClient) { }

  ajoutEnseignant(enseignant: EnseignantModule){
    return this.httpc.post(`${apiRest}/utilisateurs/enseignants/ajout`, enseignant);
  }

  getEnseignants() {
    return this.httpc.get(`${apiRest}/utilisateurs/enseignants`);
  }


  ajoutResponsable(responsable: ChefFiliereModule){
    return this.httpc.post(`${apiRest}/utilisateurs/responsables/ajout`, responsable);
  }

  getResponsables() {
    return this.httpc.get(`${apiRest}/utilisateurs/responsables`);
  }


}
