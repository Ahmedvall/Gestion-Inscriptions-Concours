import { CritereNiveauModule } from './critere-niveau.module';
export class CritereModule {

  public idCritere: number;
  public description: string;

  public critere_niveaux: CritereNiveauModule[];

  constructor() {}
 }
