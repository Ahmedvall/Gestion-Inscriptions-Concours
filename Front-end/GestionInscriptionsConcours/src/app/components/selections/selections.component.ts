import { DetailComponent } from './detail/detail.component';
import { CandidatService } from './../../services/candidat.service';
import { Component, OnInit } from '@angular/core';
import { CandidatModule } from 'src/app/models/candidat.module';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.css']
})
export class SelectionsComponent implements OnInit {

  candidats = new Array<CandidatModule>();
  candidatSelected: CandidatModule;
  afficherFilter: boolean = false;
  p:number=1 ;
  searchTxt: string;
  refresh: boolean = true;

  constructor(private candidatService: CandidatService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCandidats();
  }


  openDialog() {
    const dialogRef = this.dialog.open(DetailComponent,
      {
        data: this.candidatSelected
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  refreshCandd() {
    this.refresh = false;
    this.getCandidats();
  }

  getCandidats() {
    this.candidatService.getCandidats().subscribe(
      (candidats: CandidatModule[]) => {
        this.candidats = candidats;
        this.refresh = true;
      },
      (err) => {
        alert("Erreur de connexion: "+ err);
      }
    );
  }

  editerCandidat(candidat) {
    this.candidatSelected = candidat;
    this.openDialog();
  }

  supprimerCandidat(candidat) {
    //this.openDialog();
  }


  candidatSelectionnerEvent(event) {

    /* console.log("--- ans ---");
    console.log(event); */
    this.candidats = event;
    this.p = 1;

  }

}