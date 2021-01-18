import { PrincipalFeuilleModule } from './../modelsExcel/principal-feuille.module';
import { apiRest } from './../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportExporeExcelService {

  constructor(private httpc: HttpClient) { }

  importerDatas(listPrincipal: Array<PrincipalFeuilleModule>){
    return this.httpc.post(`${apiRest}/importer`, listPrincipal);
  }

  exporterDatas() {
    return this.httpc.get(`${apiRest}/exporter`);
  }
}
