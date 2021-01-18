import { EnseignantModule } from './../../../models/enseignant.module';
import { ChefFiliereModule } from './../../../models/chef-filiere.module';
import { UtilisateursService } from './../../../services/utilisateurs.service';
import { Component, OnInit } from '@angular/core';
import { UsersModule } from 'src/app/models/users.module';

@Component({
  selector: 'app-gerer-utilisateurs',
  templateUrl: './gerer-utilisateurs.component.html',
  styleUrls: ['./gerer-utilisateurs.component.css']
})
export class GererUtilisateursComponent implements OnInit {

  utilisateurs= new Array<UsersModule>();
  p: number = 1;
  ad: string = 'prof';
  searchTxt: string;

  constructor(private utilisateursService: UtilisateursService) { }

  ngOnInit(): void {
    this.functionSelectEvent(this.ad);
  }


  utilisateurDetails(user: UsersModule) {

  }

  functionSelectEvent(event) {

    if(event === 'admin'){
      this.getAdmins();
      
    } 
    if (event === 'prof'){
      this.getEnseignants();
    }

  }


  getAdmins() {
    this.utilisateursService.getResponsables().subscribe(
      (admins: ChefFiliereModule[]) => {
        this.utilisateurs = admins;
      },
      (err) => {
        alert('Problème rencontré lors du changement des responsables');
      }
    );

  }


  getEnseignants() {
    this.utilisateursService.getEnseignants().subscribe(
      (ens: EnseignantModule[]) => {
        this.utilisateurs = ens;
        console.log(ens);
      },
      (err) => {
        alert('Problème rencontré lors du changement des enseignants');
      }
    );

  }

}
