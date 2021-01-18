import { DiplomeSpecialiteModule } from './diplome-specialite.module';
import { AnneeEtudesModule } from './annee-etudes.module';
import { EtablissementModule } from './etablissement.module';
import { CandidatModule } from './candidat.module';
export class ObtenuModule {

  public idOB: number;
  public dateObtention: string;
  public mention: string;


  public candidat: CandidatModule;
  public etablissement: EtablissementModule;
  public diplome_specialite: DiplomeSpecialiteModule;
  public anneesEtudes: AnneeEtudesModule[];

  constructor() {}
 }
