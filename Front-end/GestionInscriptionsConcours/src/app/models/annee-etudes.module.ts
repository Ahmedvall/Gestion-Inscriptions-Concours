import { ObtenuModule } from './obtenu.module';
import { DiplomeModule } from './diplome.module';
export class AnneeEtudesModule { 
  public idae: number;

  public anneeScolaire: number;

  public noteSemester1: number;

  public noteSemester2: number;

  public moyGeneral: number;

  public obtenu: ObtenuModule;


  constructor() {}
}
