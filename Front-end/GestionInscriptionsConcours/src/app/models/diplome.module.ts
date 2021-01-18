import { DiplomeSpecialiteModule } from './diplome-specialite.module';
import { SpecialiteModule } from './specialite.module';
export class DiplomeModule { 

  public idDiplome: number;
  public type: string;

  public dspecialites: DiplomeSpecialiteModule[];
  
  public specialites: SpecialiteModule[];

  constructor() {}

}
