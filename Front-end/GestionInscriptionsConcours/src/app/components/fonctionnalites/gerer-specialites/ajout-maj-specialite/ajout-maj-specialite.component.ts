import { SpecialiteService } from 'src/app/services/specialite.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialiteModule } from 'src/app/models/specialite.module';

@Component({
  selector: 'app-ajout-maj-specialite',
  templateUrl: './ajout-maj-specialite.component.html',
  styleUrls: ['./ajout-maj-specialite.component.css']
})
export class AjoutMajSpecialiteComponent implements OnInit {


  specialiteForm: FormGroup;
  submitted: boolean;
  annuler: boolean= false;

  @Output() ajoutEffectuer = new EventEmitter<boolean>();
  @Output() annulerEffectuer = new EventEmitter<boolean>();
  @Input() specialite: SpecialiteModule;
  @Input() specialiteEdited: boolean;
  
  constructor(private formBuilder: FormBuilder,
              private specialiteService: SpecialiteService) { }

  ngOnInit(): void {
    this.initSpecialiteForm();
  }

  ngOnChanges() {
    if(this.specialiteEdited === true) {
      this.initSpecialiteFormWithValues();
    }
  }

  initSpecialiteForm() {
    this.specialiteForm = this.formBuilder.group(
      {
        libelle: ['', Validators.required]
      }
    );
  }

  initSpecialiteFormWithValues() {
    this.specialiteForm = this.formBuilder.group(
      {
        libelle: [this.specialite.nom , Validators.required]
      }
    );
  }

  get specialiteFormControls() { return this.specialiteForm.controls; }

  enregistereSpecialite() {
    if(this.specialiteForm.valid && !this.annuler) {
      if(this.specialiteEdited) {
        this.majSpecialiteBDD();
      } else {
        this.ajoutSpecialiteBDD();
      }

    } else {
      if(this.annuler){
        this.annulerEffectuer.emit(true);
        this.initSpecialiteForm();
        this.specialiteEdited = false;
        this.submitted = false;
        this.annuler = false;
      }
      
    }

  }

  ajoutSpecialiteBDD() {
    const spec = new SpecialiteModule();
    spec.nom = this.specialiteForm.get('libelle').value;

    this.specialiteService.ajoutSpecialite(spec).subscribe(
      (specialite: SpecialiteModule) => {
        this.ajoutEffectuer.emit(true);
        this.initSpecialiteForm();
        this.submitted = false;
      },
      (err) => {
        alert('Prombleme de connexion rencontrer');
      }
    );
  }

  majSpecialiteBDD() {
    this.specialite.nom = this.specialiteForm.get('libelle').value;
    this.specialiteService.majSpecialite(this.specialite).subscribe(
      (specialite: SpecialiteModule) => {
        this.ajoutEffectuer.emit(true);
        this.initSpecialiteForm();
        this.submitted = false;
      },
      (err) => {
        alert('Prombleme de connexion rencontrer');
      }
    );

  }


}
