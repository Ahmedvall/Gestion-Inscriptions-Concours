import { EtablissementService } from './../../../../services/etablissement.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtablissementModule } from 'src/app/models/etablissement.module';

@Component({
  selector: 'app-ajout-maj-etablissement',
  templateUrl: './ajout-maj-etablissement.component.html',
  styleUrls: ['./ajout-maj-etablissement.component.css']
})
export class AjoutMajEtablissementComponent implements OnInit {

  etablissementForm: FormGroup;
  submitted: boolean;
  annuler: boolean = false;
  @Output() ajoutEffectuer = new EventEmitter<boolean>();
  @Output() annulerEffectuer = new EventEmitter<boolean>();
  @Input() etablissement: EtablissementModule;
  @Input() etablissementEdited: boolean;

  constructor(private formBuilder: FormBuilder,
              private etablissementService: EtablissementService) { }

  ngOnInit(): void {
    this.initEtablissementForm();
  }

  ngOnChanges() {
    if(this.etablissementEdited === true) {
      this.initEtablissementFormWithValues();
    }
  }

  initEtablissementForm() {
    this.etablissementForm = this.formBuilder.group(
      {
        nom: ['', Validators.required]
      }
    );
  }

  initEtablissementFormWithValues() {
    this.etablissementForm = this.formBuilder.group(
      {
        nom: [this.etablissement.nom, Validators.required]
      }
    );
  }

  get etablissementFormControls() { return this.etablissementForm.controls; }



  enregistereEtab() {
    if(this.etablissementForm.valid && !this.annuler) {
      if(this.etablissementEdited) {
        this.majEtabBDD();
      } else {
        this.ajouterEtabBDD();
      }

    } else {
      if(this.annuler) {
        this.annulerEffectuer.emit(true);
        this.initEtablissementForm();
        this.etablissementEdited = false;
        this.submitted = false;
        this.annuler = false;

      }
    }
  }

  ajouterEtabBDD() {

    const etablissement = new EtablissementModule();
    etablissement.nom = this.etablissementForm.get('nom').value;

    this.etablissementService.ajoutEtablissement(etablissement).subscribe(
      (etablissement: EtablissementModule) => {
        this.ajoutEffectuer.emit(true);
        this.initEtablissementForm();
        this.submitted = false;
      }
    );

  }

  majEtabBDD() {

    this.etablissement.nom = this.etablissementForm.get('nom').value;
    this.etablissementService.majEtablissement(this.etablissement).subscribe(
      (etablissement: EtablissementModule) => {
        this.ajoutEffectuer.emit(true);
        this.initEtablissementForm();
        this.submitted = false;
      }
    );
  }

}
