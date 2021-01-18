import { MatiereModule } from './matiere.module';
import { EvaluationModule } from './evaluation.module';

export class TestEcritModule { 

  public idte: number;
  public nbVrai: number;
  public nbFaux: number;

  public evaluation: EvaluationModule;
  public matiere: MatiereModule;

  constructor() {}
}
