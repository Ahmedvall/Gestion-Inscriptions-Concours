import { TestesEcritOralService } from './../../../../services/testes-ecrit-oral.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CritereModule } from 'src/app/models/critere.module';

@Component({
  selector: 'app-ajout-maj-critere',
  templateUrl: './ajout-maj-critere.component.html',
  styleUrls: ['./ajout-maj-critere.component.css']
})
export class AjoutMajCritereComponent implements OnInit {

  critereForm: FormGroup;
  submitted: boolean = false;
  annuler: boolean;
  @Output() ajoutEffectuer = new EventEmitter<boolean>();
  @Output() majEffectuer = new EventEmitter<boolean>();
  @Output() annulerEffectuer = new EventEmitter<boolean>();
  @Input() critere: CritereModule;
  @Input() critereEdited: boolean;

  ajoutEff: boolean = false; 
  majEff: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private testesEcritOralService: TestesEcritOralService) { }

  ngOnInit(): void {
    this.initCritereForm();
  }

  ngOnChanges(){
    if(this.critereEdited === true){
      this.initCritereFormWithValues();
    }
  }

  get critereFormControls() { return this.critereForm.controls; }

  initCritereForm() {
    this.critereForm = this.formBuilder.group(
      {
        description: ['', Validators.required]
      }
    );
  }

  initCritereFormWithValues() {
    this.critereForm = this.formBuilder.group(
      {
        description: [this.critere.description, Validators.required]
      }
    );
  }

  enregistereCritere() {
    if(this.critereForm.valid && !this.annuler) {

      if(!this.critereEdited) {
        this.ajouterCrietereBDD();
      } else {
        this.majCrietereBDD();
      }
      
    } else {
      if(this.annuler === true){
        this.initCritereForm();
        this.critereEdited = false;
        this.annulerEffectuer.emit(false);
        this.submitted = false;
        this.annuler = false;
      }
    }
    
  }


  ajouterCrietereBDD(){
    const critere = new  CritereModule();

      critere.description = this.critereForm.get('description').value;
      
      this.testesEcritOralService.ajoutCritere(critere).subscribe(
        (suc) => {
          this.ajoutEffectuer.emit(true);
          this.initCritereForm();
          this.submitted = false;
        },
        (err) => {
          alert("Probleme renconterer")
        }
      );
  }

  majCrietereBDD() {
      this.critere.description = this.critereForm.get('description').value;
      this.testesEcritOralService.majCritere(this.critere).subscribe(
        (suc) => {
          this.ajoutEffectuer.emit(true);
          this.initCritereForm();
          this.submitted = false;
        },
        (err) => {
          alert("Probleme renconterer")
        }
      );
  }

}
