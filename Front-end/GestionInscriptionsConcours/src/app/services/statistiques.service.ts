import { apiRest } from './../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

  constructor(private httpc: HttpClient) { }

  getCandidatsParRegions() {
    return this.httpc.get(`${apiRest}/statistique/candidatParRegions`);
  }

  getCandidatsParEtablissement() {
    return this.httpc.get(`${apiRest}/statistique/candidatParEtablissement`);
  }

  getFiliereParPriorite(priorite: number) {
    return this.httpc.get(`${apiRest}/statistique/filierePriorite/${priorite}`);
  }
  
}
