import { ObtenuModule } from './../models/obtenu.module';
import { DiplomeModule } from './../models/diplome.module';
import { EtablissementModule } from 'src/app/models/etablissement.module';
import { SpecialiteModule } from './../models/specialite.module';
import { VilleModule } from './../models/ville.module';
import { PrincipalFeuilleModule } from 'src/app/modelsExcel/principal-feuille.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportExcelService {
  
  obtenus: ObtenuModule[]

  constructor() { }

  enregistrerDatas(principal: PrincipalFeuilleModule[]) {



  }


  initTousLesDonnees(principal: PrincipalFeuilleModule[]) {

    const obtenus = new Array<ObtenuModule>();

    for (let index = 0; index < principal.length; index++) {
      
/*       ajoutVille();
      ajoutEtablissement();
      ajoutSpecialite();
 */

      const obtenu = new ObtenuModule();
      obtenu.dateObtention = principal[index].date_diplome_bac;
      
    }


  }

}
