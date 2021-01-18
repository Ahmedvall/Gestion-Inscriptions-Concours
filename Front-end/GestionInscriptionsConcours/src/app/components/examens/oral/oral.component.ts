import { CandidatModule } from './../../../models/candidat.module';
import { CritereNiveauModule } from './../../../models/critere-niveau.module';
import { TestOralModule } from './../../../models/test-oral.module';
import { EvaluationModule } from './../../../models/evaluation.module';
import { NiveauModule } from './../../../models/niveau.module';
import { TestEcritModule } from './../../../models/test-ecrit.module';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TestesEcritOralService } from 'src/app/services/testes-ecrit-oral.service';
import { CritereModule } from 'src/app/models/critere.module';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-oral',
  templateUrl: './oral.component.html',
  styleUrls: ['./oral.component.css']
})
export class OralComponent implements OnInit {

  @Input() candidat: CandidatModule;
  oralForm: FormGroup;
  oralLineForm: FormGroup;
  checkedForm: FormGroup;
  niveaux: NiveauModule[];
  criteres: CritereModule[];
  criteresList: FormArray;
  checkedMatrix = new Array<Array<boolean>>();
  t: string ="jokoko";
  submitted: boolean;
  majForm: boolean;
  @Output() fermerOralTestEvent = new EventEmitter<boolean>(); 

  constructor(private testesEcritOralService: TestesEcritOralService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initOralForm();
    this.initDatas();

    console.log(this.candidat);
    
  }

  createCheckedForm(niveau: NiveauModule, value: boolean): FormGroup {
    return this.checkedForm = this.formBuilder.group(
              {
                idNiveau: [niveau.idNiveau],
                checked: [value]
              }
            );
  }

  createOralForm(critere: CritereModule): FormGroup {
    return this.oralLineForm = this.formBuilder.group(
              {
                idCritere: [critere.idCritere],
                critereLibele: [critere.description],
                checkedList: this.formBuilder.array([this.createCheckedForm(new NiveauModule(), false)])
              }
            );
  }

  initOralForm() {
    this.oralForm = this.formBuilder.group(
      {
        noteMember1: ['', Validators.required],
        noteMember2: ['', Validators.required],
        observation: ['', Validators.required],
        criteresList: this.formBuilder.array([this.createOralForm(new CritereModule())])
      }
    );
  }



  initOralFormValues(candidat = new CandidatModule) {
    var pushed: Boolean = false;
    this.initOralForm();
    if(candidat.evaluation && candidat.evaluation.test_oral){
      this.oralForm.get('noteMember1').setValue(candidat.evaluation.test_oral.noteMembre1);
      this.oralForm.get('noteMember2').setValue(candidat.evaluation.test_oral.noteMembre2);
      this.oralForm.get('observation').setValue(candidat.evaluation.test_oral.observation);
    }
    
    this.criteresList = this.oralForm.get('criteresList') as FormArray;

      for (let index = 0; index < this.criteres.length; index++) {
        const newArrayChecked = new Array<boolean>();
        this.criteresList.push(this.createOralForm(this.criteres[index]));
        for (let index2 = 0; index2 < this.niveaux.length; index2++) {
          if(candidat.evaluation && candidat.evaluation.test_oral){
            for (let index3 = 0; index3 < candidat.evaluation.test_oral.critere_niveaux.length; index3++) {
              if(candidat.evaluation.test_oral.critere_niveaux[index3].critere.idCritere ==  this.criteres[index].idCritere
                && candidat.evaluation.test_oral.critere_niveaux[index3].niveau.idNiveau ==  this.niveaux[index2].idNiveau
                && candidat.evaluation.test_oral.critere_niveaux[index3].cocher == true ){
                  (this.criteresList.controls[index+1].get('checkedList') as FormArray).push(this.createCheckedForm(this.niveaux[index2], true));
                  pushed = true;
                  break;
                }
              
            }
          }

          if(!pushed){
            (this.criteresList.controls[index+1].get('checkedList') as FormArray).push(this.createCheckedForm(this.niveaux[index2], false));
          }
          pushed = false;
          
        }
        (this.criteresList.controls[index+1].get('checkedList') as FormArray).removeAt(0);
      }

    this.criteresList.removeAt(0);
    
  }



  // Getters
  get criteresListCtrl() {	return this.oralForm.get('criteresList') as FormArray; }
  get checkedListCtrl() {	return (this.oralForm.get('criteresList')).get('checkedList') as FormArray; }

  get oralFormControls() { return this.oralForm.controls; }

  initDatas() {
    this.initCriteres();
    //this.initNiveaux();
  }

  initNiveaux() {
    this.testesEcritOralService.getNiveaux().subscribe(
      (niveaux: NiveauModule[]) => {
        this.niveaux = niveaux;
        //console.log(niveaux);
        this.initOralFormValues(this.candidat);
      },
      (err) => {
        alert("probleme rencontrer lors de recuperation des Niveaux");
      }
    );
  }

  initCriteres() {
    this.testesEcritOralService.getCriteres().subscribe(
      (criteres: CritereModule[]) => {
        this.criteres = criteres;
        //console.log(criteres);
        this.initNiveaux()
        
      },
      (err) => {
        alert("probleme rencontrer lors de recuperation des Criteres");
      }
    );
  }


  getCritereListCtrl(form) {
    //console.log(form.controls.criteresList.controls);
    return form.controls.criteresList.controls;
  }

  getChechedListCtrl(form) {
    //console.log(form.controls.checkedList.controls);
    return form.controls.checkedList.controls;
  }



  isChecked(i: number, j: number) {
    if((this.criteresListCtrl.at(i).get('checkedList') as FormArray).at(j).value.checked === true) {
      //console.log("yes"+"-> "+i+","+j);
      return true;
    }
    return false;

  }

  changeStatusCheckBox(i: number, j: number, event) {
    if(event.currentTarget.checked === true) {
      for (let index = 0; index < (this.criteresListCtrl.at(i).get('checkedList') as FormArray).length; index++) {
        (this.criteresListCtrl.at(i).get('checkedList') as FormArray).at(index).value.checked = false;
      }
      (this.criteresListCtrl.at(i).get('checkedList') as FormArray).at(j).value.checked = true;
    } else {
      (this.criteresListCtrl.at(i).get('checkedList') as FormArray).at(j).value.checked = false;
    }

  }

  countChekedItem(index, cout) {
    var count : number =0;
    for (let i = 0; i < this.criteresListCtrl.length; i++) {
      if((this.criteresListCtrl.at(i).get('checkedList') as FormArray).at(index).value.checked == true){
        count++;
      }
    }
    return count * cout;
  }

  getMoy(form) {
    //console.log(form.controls.noteMember1)
    const m1 : number = +form.controls.noteMember1.value;
    const m2 : number = +form.controls.noteMember2.value;
    return (m1 + m2)/2;
  }

  getIdNiveauChecked(criteresList: any) {
    var id: number;

    for (let index = 0; index < criteresList.length; index++) {
      if(criteresList.at(index).value.checked == true){
       id = criteresList.at(index).value.idNiveau;
       break;
      }
    }

    return id;

  }


  infosValid() {
    for (let i = 0; i < this.criteresListCtrl.length; i++) {
      if(this.nothingChecked(i)){
        return false;
      }
    }
    return true;
  }

  onSubmit() {

    if(this.oralForm.valid && this.infosValid()){
      var testOral = new TestOralModule();
      if(this.majForm) {
          testOral = this.candidat.evaluation.test_oral;
          testOral.noteMembre1 = this.oralForm.get('noteMember1').value;
          testOral.noteMembre2 = this.oralForm.get('noteMember2').value;
          testOral.observation = this.oralForm.get('observation').value;
      }else {
          testOral.noteMembre1 = this.oralForm.get('noteMember1').value;
          testOral.noteMembre2 = this.oralForm.get('noteMember2').value;
          testOral.observation = this.oralForm.get('observation').value;
      }

      var critere_niveaux = new Array<CritereNiveauModule>();
      

      for (let index = 0; index < this.criteres.length; index++) {
        const critere_niveau = new CritereNiveauModule();
        const critere = new CritereModule();
        critere.idCritere = +this.criteresListCtrl.at(index).get('idCritere').value

        const niveau = new NiveauModule();
        niveau.idNiveau = this.getIdNiveauChecked((this.criteresListCtrl.at(index).get('checkedList') as FormArray));
        
        critere_niveau.cocher = true;
        critere_niveau.critere = critere;
        critere_niveau.niveau = niveau;
        critere_niveaux.push(critere_niveau);
      }

      testOral.critere_niveaux = critere_niveaux;

      if(this.majForm) {
        this.testesEcritOralService.majTestOrale(testOral, this.candidat.id).subscribe(
          (candidat: CandidatModule) => {
            alert("Updated");
          },
          (err) => {
            alert("Probleme rencontrer lors de la MAJ du test orale");
          }
        );

      }else {
        this.testesEcritOralService.ajoutTestOrale(testOral, this.candidat.id).subscribe(
          (candidat: CandidatModule) => {
            alert("Saved");
          },
          (err) => {
            alert("Probleme rencontrer lors de l'enregistrement du test orale");
          }
        );
      }
      


    }else {
      alert('formulaire est invalid');
    }

    this.majForm = false;
  }


  nothingChecked(index) {
    for (let i = 0; i < this.niveaux.length; i++) {
      if((this.criteresListCtrl.at(index).get('checkedList') as FormArray).at(i).value.checked == true){
        return false;
      }
    }
    return true;
  }


  fermerleTest() {
    this.fermerOralTestEvent.emit(true);
  }


}
