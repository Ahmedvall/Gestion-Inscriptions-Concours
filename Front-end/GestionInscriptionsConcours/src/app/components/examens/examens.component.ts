import { MatiereModule } from 'src/app/models/matiere.module';
import { TestesEcritOralService } from 'src/app/services/testes-ecrit-oral.service';
import { CandidatService } from './../../services/candidat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CandidatModule } from 'src/app/models/candidat.module';

@Component({
  selector: 'app-examens',
  templateUrl: './examens.component.html',
  styleUrls: ['./examens.component.css']
})
export class ExamensComponent implements OnInit {

  matiereSelectedValue: any = -1;
  evaluationSelectedValue: any = -1;
  ecritEvaluationSelected: boolean = false;
  candidat: CandidatModule;
  cinForm: FormGroup;
  submitted: boolean;
  candidatExist: boolean;
  matieres = new Array<MatiereModule>();
  matiere: MatiereModule;
  oralTestSelected: boolean;

  constructor(private formBuilder: FormBuilder,
              private candidatService: CandidatService,
              private testesEcritOralService: TestesEcritOralService) { }

  ngOnInit(): void {
    this.initCinForm();
    this.getMatieres();
  }

  get cinFormControls() { return this.cinForm.controls; }

  initCinForm() {
    return this.cinForm = this.formBuilder.group(
              {
                cin: ['', Validators.required]
              }
            );
  }


  onSubmitCIN() {
    if(this.cinForm.valid) {
      const cin: string = this.cinForm.get('cin').value;
      this.candidatService.getCandidatByCIN(cin).subscribe(
        (candidat: CandidatModule) => {
          this.candidat = candidat;
          this.candidatExist = true;
        },
        (err) => {
          this.candidatExist = false;
          alert("Problème rencontrer lors du recherche du Candidat Portant le CIN: "+cin);
        }
      );
    } else {
      this.candidatExist = false;
      alert("Veuiller entre un CIN");
    }
  }

  getMatieres() {
    this.testesEcritOralService.getMatieres().subscribe(
      (matieres: MatiereModule[]) => {
        this.matieres = matieres;
      },
      (err) => {
        alert("Probleme rencontrer lors de chargement des Matieres");
      }
    );
  }

  getMatiereSelected(event) {
    if(event != -1) {
      for (let index = 0; index < this.matieres.length; index++) {
        if(this.matieres[index].idMatiere == event){
          this.matiere = this.matieres[index];
          break;
        }
      }
    }else{
      this.matiere = null;
    }

  }

  getEvaluationSelected(event) {
    if(event == 1){
      this.ecritEvaluationSelected = true;
    }else {
      this.ecritEvaluationSelected = false;
    }

  }


  oralTestEventFct(state) {
    this.oralTestSelected = state;
  }
  
}
