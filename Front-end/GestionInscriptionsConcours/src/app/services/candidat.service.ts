import { apiRest } from './../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private httpc: HttpClient) { }

  getCandidats() {
    return this.httpc.get(`${apiRest}/candidat/tous`);
  }

  getCandidatByCIN(cin: string) {
    return this.httpc.get(`${apiRest}/candidat/cin/${cin}`);
  }


}
