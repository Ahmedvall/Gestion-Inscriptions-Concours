import { EvaluationModule } from './evaluation.module';
import { ObtenuModule } from './obtenu.module';
import { PostulerModule } from './postuler.module';
import { UsersModule } from './users.module';
export class CandidatModule extends UsersModule {
  public cin: string;
  public cne: string;

  public listpost: PostulerModule[];
  public obtenues: ObtenuModule[];
  public evaluation: EvaluationModule;
  
 }
