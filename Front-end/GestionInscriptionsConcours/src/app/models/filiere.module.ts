import { ChefFiliereModule } from './chef-filiere.module';
import { PostulerModule } from './postuler.module';
export class FiliereModule {

  public idFiliere: number;

  public nom: string;

  public dateCreation: Date;

  public description: string;

  public lpostFiliere: PostulerModule[];

  public chefFiliere: ChefFiliereModule;

  constructor() {}
 }
