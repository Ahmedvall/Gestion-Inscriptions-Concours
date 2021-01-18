import { TestesEcritOralService } from './../../../services/testes-ecrit-oral.service';
import { MatiereModule } from './../../../models/matiere.module';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerer-matieres',
  templateUrl: './gerer-matieres.component.html',
  styleUrls: ['./gerer-matieres.component.css']
})
export class GererMatieresComponent implements OnInit {

  matieres = new  Array<MatiereModule>();
  ajoutEffectuer: boolean = false; 
  majEffectuer: boolean = false; 
  matiereEdited: boolean = false;
  @Input() matiere: MatiereModule;

  constructor(private testesEcritOralService: TestesEcritOralService) { }

  ngOnInit(): void {
    this.getMatieres();
  }

  getMatieres(){
    this.testesEcritOralService.getMatieres().subscribe(
      (matieres: MatiereModule[]) => {
        this.matieres = matieres;
        this.matieres.sort((a, b)=>(
          a.idMatiere - b.idMatiere
        ));
      },
      (err) => {
        console.log("erreur Get Criteres")
      }
    );
  }


  ajoutEffrctuerEvent(state: boolean){
    this.ajoutEffectuer = state;
    this.getMatieres();
  }

  majEffrctuerEvent(state: boolean){
    this.majEffectuer = state;
  }

  annulerEffEvent(state: boolean) {
    this.matiereEdited = false;
  }


  editerMatiere(matiere: MatiereModule){
    this.matiere = matiere;
    this.matiereEdited = true;   
  }


  supprimerMatiere(matiere: MatiereModule){    
    var answer = window.confirm("Voulez vous Confirmer la Suppression ?");
        if (answer) {
          this.testesEcritOralService.supprimerMatiere(matiere.idMatiere).subscribe(
            (succ) => {
              this.getMatieres();
            }
          );
          
        }
            
  }

}
