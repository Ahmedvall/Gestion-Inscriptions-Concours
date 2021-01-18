import { FiliereService } from './../../../services/filiere.service';
import { Component, Input, OnInit } from '@angular/core';
import { FiliereModule } from 'src/app/models/filiere.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gerer-filieres',
  templateUrl: './gerer-filieres.component.html',
  styleUrls: ['./gerer-filieres.component.css'],
  providers: [DatePipe]
})
export class GererFilieresComponent implements OnInit {

  filieres = new  Array<FiliereModule>();
  ajoutEffectuer: boolean = false; 
  majEffectuer: boolean = false; 
  filiereEdited: boolean = false;
  @Input() filiere: FiliereModule;

  constructor(private filiereService: FiliereService,
              public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getFilieres();
  }

  getFilieres(){
    this.filiereService.getFilieres().subscribe(
      (filieres: FiliereModule[]) => {
        this.filieres = filieres;
        this.filieres.sort((a, b)=>(
          a.idFiliere - b.idFiliere
        ));
      },
      (err) => {
        console.log("erreur Get Filieres")
      }
    );
  }


  ajoutEffrctuerEvent(state: boolean){
    this.ajoutEffectuer = state;
    this.getFilieres();
  }

  majEffrctuerEvent(state: boolean){
    this.majEffectuer = state;
  }

  annulerEffEvent(state: boolean) {
    this.filiereEdited = false;
  }


  editerFiliere(filiere: FiliereModule){
    this.filiere = filiere;
    this.filiereEdited = true;   
  }


  supprimerFilier(filiere: FiliereModule){    
    var answer = window.confirm("Voulez vous Confirmer le Suppression ?");
        if (answer) {
          this.filiereService.supprimerFiliere(filiere.idFiliere).subscribe(
            (succ) => {
              this.getFilieres();
            }
          );
          
        }
            
  }

}
