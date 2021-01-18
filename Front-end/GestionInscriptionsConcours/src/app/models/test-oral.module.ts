import { CritereNiveauModule } from './critere-niveau.module';
import { CritereModule } from './critere.module';
import { EvaluationModule } from './evaluation.module';
export class TestOralModule { 

  public idto: number;

  public noteMembre1: number;
  public noteMembre2: number;
  public observation: string;

  public critere_niveaux: CritereNiveauModule[];

  constructor() {}
}
