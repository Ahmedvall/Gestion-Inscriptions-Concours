import { SpecialiteModule } from './../../../models/specialite.module';
import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from 'src/app/services/specialite.service';

@Component({
  selector: 'app-gerer-specialites',
  templateUrl: './gerer-specialites.component.html',
  styleUrls: ['./gerer-specialites.component.css']
})
export class GererSpecialitesComponent implements OnInit {
  
  specilites = new Array<SpecialiteModule>();
  specialiteEdited: boolean;
  specialite: SpecialiteModule;

  constructor(private specialiteService: SpecialiteService) { }

  ngOnInit(): void {
    this.getSpecialites();
  }


  getSpecialites() {
    this.specialiteService.getSpecialites().subscribe(
      (specilites: SpecialiteModule[]) => {
        this.specilites = specilites;
        this.specilites.sort((a, b)=>(
          a.idSpec - b.idSpec
        ));
      }
    );
  }

  ajoutEffEvent(state : boolean) {
    this.getSpecialites();
  }

  annulerEffEvent(state : boolean) {
    this.specialiteEdited = false;
  }

  editerSpecilite(specialite: SpecialiteModule) {
    this.specialiteEdited = true;
    this.specialite = specialite;
  }

  supprimerSpecilite(specialie: SpecialiteModule) {
    var answer = window.confirm("Voulez vous Confirmer la Suppression ?");
    if (answer) {
      this.specialiteService.supprimerSpecialite(specialie.idSpec).subscribe(
        (succ) => {
          this.getSpecialites();
        }
      );      
    }

  }

}
