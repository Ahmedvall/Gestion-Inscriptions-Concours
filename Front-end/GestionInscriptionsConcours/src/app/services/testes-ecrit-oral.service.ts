import { TestEcritModule } from './../models/test-ecrit.module';
import { TestOralModule } from './../models/test-oral.module';
import { apiRest } from 'src/app/constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestesEcritOralService {

  constructor(private httpc: HttpClient) { }

  ajoutMatiere(matiere){
    return this.httpc.post(`${apiRest}/matiere/ajout`, matiere);
  }

  getMatieres() {
    return this.httpc.get(`${apiRest}/matiere/tous`);
  }

  majMatiere(matiere) {
    return this.httpc.put(`${apiRest}/matiere/maj`, matiere);
  }

  supprimerMatiere(id) {
    return this.httpc.delete(`${apiRest}/matiere/supp/${id}`);
  }


  // gerer Criteres
  ajoutCritere(critere){
    return this.httpc.post(`${apiRest}/critere/ajout`, critere);
  }

  getCriteres() {
    return this.httpc.get(`${apiRest}/critere/tous`);
  }

  majCritere(critere) {
    return this.httpc.put(`${apiRest}/critere/maj`, critere);
  }

  supprimerCritere(id) {
    return this.httpc.delete(`${apiRest}/critere/supp/${id}`);
  }


  // gerer Niveaux
  ajoutNiveau(niveau){
    return this.httpc.post(`${apiRest}/niveau/ajout`, niveau);
  }

  getNiveaux() {
    return this.httpc.get(`${apiRest}/niveau/tous`);
  }

  majNiveau(niveau) {
    return this.httpc.put(`${apiRest}/niveau/maj`, niveau);
  }

  supprimerNiveau(id) {
    return this.httpc.delete(`${apiRest}/niveau/supp/${id}`);
  }




  // Gestion teste orales

  ajoutTestOrale(testOral: TestOralModule, idCandidat: number){
    return this.httpc.post(`${apiRest}/evaluation/orale/ajout/${idCandidat}`, testOral);
  }

  majTestOrale(testOral: TestOralModule, idCandidat: number){
    return this.httpc.put(`${apiRest}/evaluation/orale/maj/${idCandidat}`, testOral);
  }


  // Gestion teste écrits

  ajoutTestEcrit(testEcrits: Array<TestEcritModule>, idCandidat: number){
    return this.httpc.post(`${apiRest}/evaluation/ecrit/ajout/${idCandidat}`, testEcrits);
  }

  ajoutUNTestEcrit(testEcrit: TestEcritModule, idCandidat: number){
    return this.httpc.post(`${apiRest}/evaluation/ecrit/ajoutNoteMatiere/${idCandidat}`, testEcrit);
  }

  majUNTestEcrit(testEcrit: TestEcritModule, idCandidat: number){
    return this.httpc.put(`${apiRest}/evaluation/ecrit/majNoteMatiere/${idCandidat}`, testEcrit);
  }

  majTestErit(testEcrits: Array<TestEcritModule>, idCandidat: number){
    return this.httpc.put(`${apiRest}/evaluation/ecrit/maj/${idCandidat}`, testEcrits);
  }





}
