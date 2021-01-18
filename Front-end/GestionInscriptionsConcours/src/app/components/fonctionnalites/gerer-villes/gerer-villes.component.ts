import { VilleService } from './../../../services/ville.service';
import { VilleModule } from './../../../models/ville.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerer-villes',
  templateUrl: './gerer-villes.component.html',
  styleUrls: ['./gerer-villes.component.css']
})
export class GererVillesComponent implements OnInit {

  villes = new Array<VilleModule>();
  villeEdited: boolean;
  ville: VilleModule;

  constructor(private villeService: VilleService) { }

  ngOnInit(): void {
    this.getVilles();
  }

  getVilles() {
    this.villeService.getVilles().subscribe(
      (villes: VilleModule[]) => {
        this.villes = villes;
        this.villes.sort((a, b)=>(
          a.idVille - b.idVille
        ));
      },
      (err) => {
        alert("Problemme de connexion rencotrer")
      }
    );
  }

  editerVille(ville: VilleModule) {
    this.villeEdited = true;
    this.ville = ville;

  }

  supprimerVille(ville: VilleModule) {
    var answer = window.confirm("Voulez vous Confirmer la Suppression ?");
    if (answer) {
      this.villeService.supprimerVille(ville.idVille).subscribe(
        (succ) => {
          this.getVilles();
        },
        (err) => {
          alert("problemme de connexion rencontrer lors de suppression")
        }
      );
    }

  }

  ajoutEffEvent(state: boolean) {
    this.getVilles();
  }

  annulerEffEvent(state: boolean) {
    this.villeEdited = false;
  }

}
