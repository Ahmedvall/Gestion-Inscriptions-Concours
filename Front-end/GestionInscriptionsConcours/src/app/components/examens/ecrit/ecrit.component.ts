import { EvaluationModule } from './../../../models/evaluation.module';
import { TestEcritModule } from './../../../models/test-ecrit.module';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { TestesEcritOralService } from 'src/app/services/testes-ecrit-oral.service';
import { MatiereModule } from 'src/app/models/matiere.module';
import { CandidatModule } from 'src/app/models/candidat.module';

@Component({
  selector: 'app-ecrit',
  templateUrl: './ecrit.component.html',
  styleUrls: ['./ecrit.component.css']
})
export class EcritComponent implements OnInit {


  @Input() candidat: CandidatModule;
  ecritForm: FormGroup;
  fauxVraiForm: FormGroup;
  submitted: boolean;
  majForm: boolean;
  matieres: MatiereModule[];


  constructor(private testesEcritOralService: TestesEcritOralService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initEcritForm();
    this.getAllMatieres();
  }

  createFauxVraiForm(testEcrit: TestEcritModule) {
    return this.fauxVraiForm = this.formBuilder.group(
      {
        idTestEcrit: [testEcrit.idte],
        nbFaux: [testEcrit.nbFaux, Validators.required],
        nbVrai: [testEcrit.nbVrai, Validators.required],
        idMatiere: [testEcrit.matiere.idMatiere],
        nomMatiere: [testEcrit.matiere.nom]
      }
    );
  }

  initEcritForm(/*matiere: MatiereModule*/): FormGroup {
    const te = new TestEcritModule();
    te.matiere = new MatiereModule();
    return this.ecritForm = this.formBuilder.group({
         listNbFauxVraies: this.formBuilder.array([this.createFauxVraiForm(te)])
        });
  }

  initFormWithValues() {

    var testEcrit = new TestEcritModule();
    console.log('here');
    if(!this.candidat.evaluation || this.candidat.evaluation.testesEcris.length <= 0) {
      console.log('if');
      for (let index = 0; index < this.matieres.length; index++) {
        console.log('if');
        testEcrit.matiere = new MatiereModule();
        testEcrit.matiere = this.matieres[index];
        
        (this.ecritForm.get('listNbFauxVraies') as FormArray).push(this.createFauxVraiForm(testEcrit));
      }

    } else {
      
      console.log('else');
      for (let index = 0; index < this.matieres.length; index++) {
        for (let j = 0; j < this.candidat.evaluation.testesEcris.length; j++) {
          if(this.candidat.evaluation.testesEcris[j].matiere.idMatiere == this.matieres[index].idMatiere){
            (this.ecritForm.get('listNbFauxVraies') as FormArray).push(this.createFauxVraiForm(this.candidat.evaluation.testesEcris[j]));
            break;
          }
          
        }
      }
    }

    (this.ecritForm.get('listNbFauxVraies') as FormArray).removeAt(0);
  }

  get ecritFormControls() { return this.ecritForm.controls; }


  getAllMatieres() {
    this.testesEcritOralService.getMatieres().subscribe(
      (matieres: MatiereModule[]) => {
        this.matieres = matieres;
        console.log(matieres);
      this.initFormWithValues();
      },
      (err) => {
        alert("Probleme rencontrer lors de chanrgement des Matieres");
      }
    );
    
  }


  getlistNbFauxVraiesCtrl(form) {
    // console.log(form.controls.listNbFauxVraies.controls);
    return form.controls.listNbFauxVraies.controls;
  }

  gethjh(matiere) {
    console.log(matiere.controls.idTestEcrit.value);
    return matiere.controls;
  }

  onSubmit() {

    if(this.ecritForm.valid) {
      var testEcrits = new Array<TestEcritModule>();
      testEcrits = this.getNouvauxDataTestEcrit();
      if(!this.majForm){
        this.testesEcritOralService.ajoutTestEcrit(testEcrits, this.candidat.id).subscribe(
          (candidat: CandidatModule) => {
            this.candidat.evaluation = candidat.evaluation;
          },
          (err) => {
            alert("Probleme rencontrer lors d'enregistrement du test ecrit..");
          }
        );

      }else{
        console.log("maj");
        console.log(testEcrits);
        /* this.testesEcritOralService.majTestErit(testEcrits, this.candidat.id).subscribe(
          (candidat: CandidatModule) => {
            this.candidat.evaluation = candidat.evaluation;
          },
          (err) => {
            alert("Probleme rencontrer lors de la Modification du test ecrit..");
          }
        ); */

      }

    }else {
      alert("Formulaire est invalide");
    }

  }

  getNouvauxDataTestEcrit() {
    var testEcrits = new Array<TestEcritModule>();
    if(!this.candidat.evaluation || this.candidat.evaluation.testesEcris.length <= 0) {
      for (let index = 0; index < (this.ecritForm.get('listNbFauxVraies') as FormArray).length; index++) {
        const testEcrit = new TestEcritModule();
        testEcrit.nbVrai = (this.ecritForm.get('listNbFauxVraies') as FormArray).at(index).get("nbVrai").value;
        testEcrit.nbFaux = (this.ecritForm.get('listNbFauxVraies') as FormArray).at(index).get("nbFaux").value;
        const matiere = new MatiereModule();
        matiere.idMatiere = (this.ecritForm.get('listNbFauxVraies') as FormArray).at(index).get("idMatiere").value;
        testEcrit.matiere = matiere;
        testEcrits.push(testEcrit);
     }

    }else {
      for (let index = 0; index < (this.ecritForm.get('listNbFauxVraies') as FormArray).length; index++) {
        const testEcrit = new TestEcritModule();
        testEcrit.idte = (this.ecritForm.get('listNbFauxVraies') as FormArray).at(index).get("idTestEcrit").value;
        testEcrit.nbVrai = (this.ecritForm.get('listNbFauxVraies') as FormArray).at(index).get("nbVrai").value;
        testEcrit.nbFaux = (this.ecritForm.get('listNbFauxVraies') as FormArray).at(index).get("nbFaux").value;
        const matiere = new MatiereModule();
        matiere.idMatiere = (this.ecritForm.get('listNbFauxVraies') as FormArray).at(index).get("idMatiere").value;
        testEcrit.matiere = matiere;
        testEcrits.push(testEcrit);
     }
    }

    return testEcrits;
  }

  

}
