import { TestesEcritOralService } from './../../../services/testes-ecrit-oral.service';
import { Component, Input, OnInit } from '@angular/core';
import { CritereModule } from 'src/app/models/critere.module';

@Component({
  selector: 'app-gerer-criteres',
  templateUrl: './gerer-criteres.component.html',
  styleUrls: ['./gerer-criteres.component.css']
})
export class GererCriteresComponent implements OnInit {

  criteres = new  Array<CritereModule>();
  ajoutEffectuer: boolean = false; 
  majEffectuer: boolean = false; 
  critereEdited: boolean = false;
  @Input() critere: CritereModule;

  constructor(private testesEcritOralService: TestesEcritOralService) { }

  ngOnInit(): void {
    this.getCriteres();
  }

  getCriteres(){
    this.testesEcritOralService.getCriteres().subscribe(
      (criteres: CritereModule[]) => {
        this.criteres = criteres;
        this.criteres.sort((a, b)=>(
          a.idCritere - b.idCritere
        ));
      },
      (err) => {
        console.log("erreur Get Criteres")
      }
    );
  }


  ajoutEffrctuerEvent(state: boolean){
    this.ajoutEffectuer = state;
    this.getCriteres();
  }

  majEffrctuerEvent(state: boolean){
    this.majEffectuer = state;
  }

  annulerEffEvent(state: boolean) {
    this.critereEdited = false;
  }


  editerCritere(critere: CritereModule){
    this.critere = critere;
    this.critereEdited = true;   
  }


  supprimerCritere(critere: CritereModule){    
    var answer = window.confirm("Voulez vous Confirmer la Suppression ?");
        if (answer) {
          this.testesEcritOralService.supprimerCritere(critere.idCritere).subscribe(
            (succ) => {
              this.getCriteres();
            }
          );
          
        }
            
  }

}
