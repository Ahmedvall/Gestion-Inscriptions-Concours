import { TestesEcritOralService } from './../../../../services/testes-ecrit-oral.service';
import { MatiereModule } from './../../../../models/matiere.module';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajout-maj-matiere',
  templateUrl: './ajout-maj-matiere.component.html',
  styleUrls: ['./ajout-maj-matiere.component.css']
})
export class AjoutMajMatiereComponent implements OnInit {

  matiereForm: FormGroup;
  submitted: boolean = false;
  annuler: boolean;
  @Output() ajoutEffectuer = new EventEmitter<boolean>();
  @Output() majEffectuer = new EventEmitter<boolean>();
  @Output() annulerEffectuer = new EventEmitter<boolean>();
  @Input() matiere: MatiereModule;
  @Input() matiereEdited: boolean;

  ajoutEff: boolean = false; 
  majEff: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private testesEcritOralService: TestesEcritOralService) { }

  ngOnInit(): void {
    this.initMatiereForm();
  }

  ngOnChanges(){
    if(this.matiereEdited === true){
      this.initMatiereFormWithValues();
    }
  }

  get matiereFormControls() { return this.matiereForm.controls; }

  initMatiereForm() {
    this.matiereForm = this.formBuilder.group(
      {
        nom: ['', Validators.required],
        nbQuestion: ['', Validators.required]
      }
    );
  }

  initMatiereFormWithValues() {
    this.matiereForm = this.formBuilder.group(
      {
        nom: [this.matiere.nom, Validators.required],
        nbQuestion: [this.matiere.nbQuestion, Validators.required]
      }
    );
  }

  enregistereMatiere() {
    if(this.matiereForm.valid && !this.annuler) {

      if(!this.matiereEdited) {
        this.ajouterMatiereBDD();
      } else {
        this.majMatiereBDD();
      }
      
    } else {
      if(this.annuler === true){
        this.initMatiereForm();
        this.matiereEdited = false;
        this.annulerEffectuer.emit(false);
        this.submitted = false;
        this.annuler = false;
      }
    }
    
  }


  ajouterMatiereBDD(){
    const matiere = new  MatiereModule();

    matiere.nom = this.matiereForm.get('nom').value;
    matiere.nbQuestion = this.matiereForm.get('nbQuestion').value;
      
      this.testesEcritOralService.ajoutMatiere(matiere).subscribe(
        (suc) => {
          this.ajoutEffectuer.emit(true);
          this.initMatiereForm();
          this.submitted = false;
        },
        (err) => {
          alert("Probleme renconterer")
        }
      );
  }

  majMatiereBDD() {
      this.matiere.nom = this.matiereForm.get('nom').value;
      this.matiere.nbQuestion = this.matiereForm.get('nbQuestion').value;

      this.testesEcritOralService.majMatiere(this.matiere).subscribe(
        (suc) => {
          this.ajoutEffectuer.emit(true);
          this.initMatiereForm();
          this.submitted = false;
        },
        (err) => {
          alert("Probleme renconterer")
        }
      );
  }

}
