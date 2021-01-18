import { AjoutUtilisateurComponent } from './components/fonctionnalites/gerer-utilisateurs/ajout-utilisateur/ajout-utilisateur.component';
import { GererUtilisateursComponent } from './components/fonctionnalites/gerer-utilisateurs/gerer-utilisateurs.component';
import { MotDePasseOublierComponent } from './pages/mot-de-passe-oublier/mot-de-passe-oublier.component';
import { LoginComponent } from './pages/login/login.component';
import { OralComponent } from './components/examens/oral/oral.component';
import { ExamensComponent } from './components/examens/examens.component';
import { GererCriteresComponent } from './components/fonctionnalites/gerer-criteres/gerer-criteres.component';
import { GererNiveauxComponent } from './components/fonctionnalites/gerer-niveaux/gerer-niveaux.component';
import { SelectionsComponent } from './components/selections/selections.component';
import { ImportExcelComponent } from './pages/import-excel/import-excel.component';
import { GererSpecialitesComponent } from './components/fonctionnalites/gerer-specialites/gerer-specialites.component';
import { GererFilieresComponent } from './components/fonctionnalites/gerer-filieres/gerer-filieres.component';
import { HomeComponent } from './pages/home/home.component';
import { GererVillesComponent } from './components/fonctionnalites/gerer-villes/gerer-villes.component';
import { GererEtablissementsComponent } from './components/fonctionnalites/gerer-etablissements/gerer-etablissements.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GererMatieresComponent } from './components/fonctionnalites/gerer-matieres/gerer-matieres.component';


const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  {path: 'motdepasseoublier', component: MotDePasseOublierComponent },
  {path: 'accueil', component: HomeComponent },
  {path: 'etablissements', component: GererEtablissementsComponent },
  {path: 'specialites', component: GererSpecialitesComponent },
  {path: 'filieres', component: GererFilieresComponent },
  {path: 'villes', component: GererVillesComponent },
  {path: 'matieres', component: GererMatieresComponent},
  {path: 'niveaux', component: GererNiveauxComponent},
  {path: 'criteres', component: GererCriteresComponent},
  {path: 'import', component: ImportExcelComponent },
  {path: 'selection', component: SelectionsComponent },
  {path: 'examens', component: ExamensComponent },
  {path: 'utilisateurs', component: GererUtilisateursComponent },
  {path: 'ajouterUtilisateur', component: AjoutUtilisateurComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
