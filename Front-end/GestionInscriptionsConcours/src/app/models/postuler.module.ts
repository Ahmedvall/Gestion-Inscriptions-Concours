import { FiliereModule } from './filiere.module';
import { CandidatModule } from './candidat.module';
export class PostulerModule {

  public idPostuler: number;
  public dateP: Date;
  public priorite: number;

  public candidat: CandidatModule;
  public filiere: FiliereModule;

  constructor() {}
 }
