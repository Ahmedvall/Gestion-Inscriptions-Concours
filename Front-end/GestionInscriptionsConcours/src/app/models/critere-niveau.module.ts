import { NiveauModule } from './niveau.module';
import { CritereModule } from './critere.module';
export class CritereNiveauModule { 

  public idcn: number;
  public cocher: boolean;

  public critere: CritereModule;
  public niveau: NiveauModule;

  constructor() {}
}
