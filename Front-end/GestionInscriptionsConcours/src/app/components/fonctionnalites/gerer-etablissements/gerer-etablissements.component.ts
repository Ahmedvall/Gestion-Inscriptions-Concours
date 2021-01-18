import { EtablissementModule } from 'src/app/models/etablissement.module';
import { EtablissementService } from './../../../services/etablissement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerer-etablissements',
  templateUrl: './gerer-etablissements.component.html',
  styleUrls: ['./gerer-etablissements.component.css']
})
export class GererEtablissementsComponent implements OnInit {

  etablissement: EtablissementModule;
  etablissementEdited: boolean;
  etablissements = new Array<EtablissementModule>();
  p: number = 1;

  constructor(private etablissementService: EtablissementService) { }

  ngOnInit(): void {
    this.getEtablissements();
  }

  getEtablissements() {
    this.etablissementService.getEtablissements().subscribe(
      (etablissements: EtablissementModule[])=> {
        this.etablissements = etablissements;
        this.etablissements.sort((a, b)=>(
          a.idEtab - b.idEtab
        ));
      }
    );
  }

  editerEtab(etab: EtablissementModule) {
    this.etablissementEdited = true;
    this.etablissement = etab;

  }

  supprimerEtab(etab: EtablissementModule) {
    var answer = window.confirm("Voulez vous Confirmer la Suppression ?");
    if (answer) {
      this.etablissementService.supprimerEtablissement(etab.idEtab).subscribe(
        (succ) => {
          this.getEtablissements();
        },
        (err) => {
          alert("problemme de connexion rencontrer lors de suppression")
        }
      );
    }

  }

  ajoutEffEvent(state: boolean) {
    this.getEtablissements();
  }

  annulerEffEvent(state: boolean) {
    this.etablissementEdited = false;
  }



}
