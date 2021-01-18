import { TestOralModule } from './test-oral.module';
import { TestEcritModule } from './test-ecrit.module';
export class EvaluationModule { 

  public idEvaluation: number;
 
  public testesEcris: TestEcritModule[];
  public test_oral: TestOralModule;

  constructor() {}
}
