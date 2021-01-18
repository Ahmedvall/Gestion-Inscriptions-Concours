import { MatiereModule } from 'src/app/models/matiere.module';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CandidatModule } from 'src/app/models/candidat.module';
import { CandidatService } from 'src/app/services/candidat.service';
import { MatiereFormComponent } from './matiere-form/matiere-form.component';

@Component({
  selector: 'app-list-candidats',
  templateUrl: './list-candidats.component.html',
  styleUrls: ['./list-candidats.component.css']
})
export class ListCandidatsComponent implements OnInit {

  p:number=1 ;
  candidats = new Array<CandidatModule>();
  candidatSelected: CandidatModule;
  @Input() matiere: MatiereModule;
  @Input() evaluation: any;
  @Input() ecritEvaluationSelected: boolean;
  oralTestSelected: boolean;
  @Output() oralTestEventSelected = new EventEmitter<boolean>(); 

  constructor(private candidatService: CandidatService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCandidats();
  }


  getCandidats() {
    this.candidatService.getCandidats().subscribe(
      (candidats: CandidatModule[]) => {
        this.candidats = candidats;
        this.candidats.sort((a,b)=> a.id-b.id);
      },
      (err) => {
        alert("Erreur de connexion: "+ err);
      }
    );
  }


  openDialog() {
    var mExist: boolean = true;
    if(!this.matiere){
      mExist = false;
    }
    const dialogRef = this.dialog.open(MatiereFormComponent,
      {
        data: {candidat: this.candidatSelected, matiere: this.matiere, mExist: mExist}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getCandidats();
    });

  }


  editerCandidatMatiere(candidat) {
    console.log(candidat);
    this.candidatSelected = candidat;
    this.openDialog();
  }

  editerTestOrale(candidat) {
    this.candidatSelected = candidat;
    this.oralTestSelected = true;
    this.oralTestEventSelected.emit(true);
  }


  fermerOralTestEventFct(state) {
    if(state == true) {
      this.oralTestSelected = false;
      this.oralTestEventSelected.emit(false);
    }
  }


  candidatNoteMatiere(candidat: CandidatModule) {
    if(candidat.evaluation) {
      if(candidat.evaluation.testesEcris.length > 0 && this.matiere){
        for (let index = 0; index < candidat.evaluation.testesEcris.length; index++) {
          if(candidat.evaluation.testesEcris[index].matiere.idMatiere == this.matiere.idMatiere){
            return true;
          }
        }
      }
    }

    return false;
  }

  candidatOraleEvaluee(candidat: CandidatModule) {
    if(candidat.evaluation) {
      if(candidat.evaluation.test_oral){   
            return true;
      }
    }

    return false;
  }


}
