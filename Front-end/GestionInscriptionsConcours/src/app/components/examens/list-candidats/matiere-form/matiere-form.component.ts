import { TestEcritModule } from './../../../../models/test-ecrit.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestesEcritOralService } from 'src/app/services/testes-ecrit-oral.service';
import { MatiereModule } from 'src/app/models/matiere.module';
import { CandidatModule } from 'src/app/models/candidat.module';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-matiere-form',
  templateUrl: './matiere-form.component.html',
  styleUrls: ['./matiere-form.component.css']
})
export class MatiereFormComponent implements OnInit {

  notesForm: FormGroup;
  submitted: boolean;
  testEcritExist: boolean;
  testEcrit: TestEcritModule;
  nbSansReponseError: boolean;

  constructor(private testesEcritOralService: TestesEcritOralService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MatiereFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {candidat: CandidatModule, matiere: MatiereModule, mExist: boolean}) {}

  ngOnInit(): void {
    this.initForm();
  }

  initNoteForm() {
    this.notesForm = this.formBuilder.group(
      {
        nbFaux: ['', Validators.required],
        nbVrai: ['', Validators.required]
      }
    );
  }

  initNoteFormValues(testEcrit: TestEcritModule) {
    this.notesForm = this.formBuilder.group(
      {
        idTestEcrit: [testEcrit.idte],
        nbFaux: [testEcrit.nbFaux, Validators.required],
        nbVrai: [testEcrit.nbVrai, Validators.required]
      }
    );
  }

  initForm() {
    var testEcrit= new TestEcritModule();
    testEcrit = this.getNotesIfExist();
    if(testEcrit != null){
      this.initNoteFormValues(testEcrit);
    }else {
      this.initNoteForm();
    }
    
  }

  getNotesIfExist() {
    if(this.data.candidat.evaluation){
      if(this.data.candidat.evaluation.testesEcris.length > 0){
        for (let index = 0; index < this.data.candidat.evaluation.testesEcris.length; index++) {
          if(this.data.candidat.evaluation.testesEcris[index].matiere.idMatiere == this.data.matiere.idMatiere){
            this.testEcritExist = true;
            this.testEcrit = this.data.candidat.evaluation.testesEcris[index];
            return this.data.candidat.evaluation.testesEcris[index];
          }
        }
      }
    }

    return null;
  }

  get notesFormControls() { return this.notesForm.controls; }

  SauvegardeTestEcrit() {

    if(this.notesForm.valid) {
      if(this.getNbSansReponse() < 0){
        this.nbSansReponseError = true;
        return null;
      }

      if(!this.testEcritExist){
        var te = new TestEcritModule();
        te.nbFaux = this.notesForm.get('nbFaux').value;
        te.nbVrai = this.notesForm.get('nbVrai').value;
        te.matiere = this.data.matiere;
          this.testesEcritOralService.ajoutUNTestEcrit(te, this.data.candidat.id).subscribe(
            (candidat) => {
              console.log(candidat);
              if(candidat != null){
                this.dialogRef.close();
              }else {
                //warning
              }
            },
            (err) => {
              alert("Probleme rencontrer lors de l'enregistrement des notes");
            });


      }// si le test ecrit existe:
      else {
        var te = new TestEcritModule();
        te.nbFaux = this.notesForm.get('nbFaux').value;
        te.nbVrai = this.notesForm.get('nbVrai').value;
        te.idte = this.notesForm.get('idTestEcrit').value;
        te.matiere = this.data.matiere;
        console.log(te);

        this.testesEcritOralService.majUNTestEcrit(te, this.data.candidat.id).subscribe(
          (candidat) => {
              if(candidat != null){
                this.dialogRef.close();
              }else {
                //warning
              }
          },
          (err) => {
            alert("Probleme rencontrer lors de modification du test ecrit...");
          }
        );

      }

    }else{
      console.log("invalid")
    }

    
  }

  getNbSansReponse() {
    const nbQ: number = this.notesForm.get('nbFaux').value + this.notesForm.get('nbVrai').value;
    return this.data.matiere.nbQuestion - nbQ;
  }


  eventClose() {
    this.dialogRef.close();
  }
}
