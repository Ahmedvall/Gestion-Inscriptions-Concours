import { RoleModule } from './role.module';
import { AdresseModule } from './adresse.module';
export class UsersModule {

  public id: number;

  public nom: string;

  public prenom: string;

  public numTel: string;

  public dateNaissance: Date;

  public mail: string;

  public motDePass: string;
  
  public sexe: string;

  public adresse: AdresseModule ;

  public role: RoleModule;

  constructor() {}
 }
