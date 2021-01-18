import { AjoutMajFiliereComponent } from './components/fonctionnalites/gerer-filieres/ajout-maj-filiere/ajout-maj-filiere.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HeaderAdminComponent } from './layouts/header/header-admin/header-admin.component';
import { HeaderEnseignantComponent } from './layouts/header/header-enseignant/header-enseignant.component';
import { HeaderChefFiliereComponent } from './layouts/header/header-chef-filiere/header-chef-filiere.component';
import { GererSpecialitesComponent } from './components/fonctionnalites/gerer-specialites/gerer-specialites.component';
import { GererVillesComponent } from './components/fonctionnalites/gerer-villes/gerer-villes.component';
import { GererFilieresComponent } from './components/fonctionnalites/gerer-filieres/gerer-filieres.component';
import { GererEtablissementsComponent } from './components/fonctionnalites/gerer-etablissements/gerer-etablissements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AjoutMajSpecialiteComponent } from './components/fonctionnalites/gerer-specialites/ajout-maj-specialite/ajout-maj-specialite.component';
import { AjoutMajVilleComponent } from './components/fonctionnalites/gerer-villes/ajout-maj-ville/ajout-maj-ville.component';
import { AjoutMajEtablissementComponent } from './components/fonctionnalites/gerer-etablissements/ajout-maj-etablissement/ajout-maj-etablissement.component';
import { HomeComponent } from './pages/home/home.component';
import { ImportExcelComponent } from './pages/import-excel/import-excel.component';
import { SelectionsComponent } from './components/selections/selections.component';
import { FilterRechercheComponent } from './components/selections/filter-recherche/filter-recherche.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailComponent } from './components/selections/detail/detail.component';
import { DialoComponent } from './dialo/dialo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamensComponent } from './components/examens/examens.component';
import { EcritComponent } from './components/examens/ecrit/ecrit.component';
import { OralComponent } from './components/examens/oral/oral.component';
import { GererMatieresComponent } from './components/fonctionnalites/gerer-matieres/gerer-matieres.component';
import { AjoutMajMatiereComponent } from './components/fonctionnalites/gerer-matieres/ajout-maj-matiere/ajout-maj-matiere.component';
import { GererNiveauxComponent } from './components/fonctionnalites/gerer-niveaux/gerer-niveaux.component';
import { AjoutMajNiveauComponent } from './components/fonctionnalites/gerer-niveaux/ajout-maj-niveau/ajout-maj-niveau.component';
import { GererCriteresComponent } from './components/fonctionnalites/gerer-criteres/gerer-criteres.component';
import { AjoutMajCritereComponent } from './components/fonctionnalites/gerer-criteres/ajout-maj-critere/ajout-maj-critere.component';
import { ListCandidatsComponent } from './components/examens/list-candidats/list-candidats.component';
import { MatiereFormComponent } from './components/examens/list-candidats/matiere-form/matiere-form.component';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './pages/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MotDePasseOublierComponent } from './pages/mot-de-passe-oublier/mot-de-passe-oublier.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { GererUtilisateursComponent } from './components/fonctionnalites/gerer-utilisateurs/gerer-utilisateurs.component';
import { AjoutUtilisateurComponent } from './components/fonctionnalites/gerer-utilisateurs/ajout-utilisateur/ajout-utilisateur.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderAdminComponent,
    HeaderEnseignantComponent,
    HeaderChefFiliereComponent,
    GererSpecialitesComponent,
    GererVillesComponent,
    GererFilieresComponent,
    GererEtablissementsComponent,
    AjoutMajFiliereComponent,
    AjoutMajSpecialiteComponent,
    AjoutMajVilleComponent,
    AjoutMajEtablissementComponent,
    HomeComponent,
    ImportExcelComponent,
    SelectionsComponent,
    FilterRechercheComponent,
    DetailComponent,
    DialoComponent,
    ExamensComponent,
    EcritComponent,
    OralComponent,
    GererMatieresComponent,
    AjoutMajMatiereComponent,
    GererNiveauxComponent,
    AjoutMajNiveauComponent,
    GererCriteresComponent,
    AjoutMajCritereComponent,
    ListCandidatsComponent,
    MatiereFormComponent,
    LoginComponent,
    MotDePasseOublierComponent,
    ResetPasswordComponent,
    GererUtilisateursComponent,
    AjoutUtilisateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    MatDialogModule,
    ChartsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
    DialoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
