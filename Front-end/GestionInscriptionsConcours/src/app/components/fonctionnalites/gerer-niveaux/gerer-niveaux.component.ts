import { TestesEcritOralService } from './../../../services/testes-ecrit-oral.service';
import { NiveauModule } from './../../../models/niveau.module';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerer-niveaux',
  templateUrl: './gerer-niveaux.component.html',
  styleUrls: ['./gerer-niveaux.component.css']
})
export class GererNiveauxComponent implements OnInit {

  niveaux = new  Array<NiveauModule>();
  ajoutEffectuer: boolean = false; 
  majEffectuer: boolean = false; 
  niveauEdited: boolean = false;
  @Input() niveau: NiveauModule;

  constructor(private testesEcritOralService: TestesEcritOralService) { }

  ngOnInit(): void {
    this.getNiveaux();
  }

  getNiveaux(){
    this.testesEcritOralService.getNiveaux().subscribe(
      (niveaux: NiveauModule[]) => {
        this.niveaux = niveaux;
        this.niveaux.sort((a, b)=>(
          a.idNiveau - b.idNiveau
        ));
      },
      (err) => {
        console.log("erreur Get Criteres")
      }
    );
  }


  ajoutEffrctuerEvent(state: boolean){
    this.ajoutEffectuer = state;
    this.getNiveaux();
  }

  majEffrctuerEvent(state: boolean){
    this.majEffectuer = state;
  }

  annulerEffEvent(state: boolean) {
    this.niveauEdited = false;
  }


  editerNiveau(niveau: NiveauModule){
    this.niveau = niveau;
    this.niveauEdited = true;   
  }


  supprimerNiveau(niveau: NiveauModule){    
    var answer = window.confirm("Voulez vous Confirmer la Suppression ?");
        if (answer) {
          this.testesEcritOralService.supprimerNiveau(niveau.idNiveau).subscribe(
            (succ) => {
              this.getNiveaux();
            }
          );
          
        }
            
  }

}
