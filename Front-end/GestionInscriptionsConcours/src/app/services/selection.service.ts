import { FilterModule } from './../models/filter.module';
import { apiRest } from 'src/app/constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  constructor(private httpc: HttpClient) { }

  getDiplomes() {
    return this.httpc.get(`${apiRest}/selection/diplomes`);
  }

  getMentions() {
    return this.httpc.get(`${apiRest}/selection/mentions`);
  }

  
  selection(filters: FilterModule[], idFiliere: number, priorite: number) {
    return this.httpc.post(`${apiRest}/selection/candidats/${idFiliere}/${priorite}`,filters);
  }


}
