import { VilleService } from './../../../../services/ville.service';
import { VilleModule } from './../../../../models/ville.module';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajout-maj-ville',
  templateUrl: './ajout-maj-ville.component.html',
  styleUrls: ['./ajout-maj-ville.component.css']
})
export class AjoutMajVilleComponent implements OnInit {

  villeForm: FormGroup;
  submitted: boolean;
  annuler: boolean = false;
  @Output() ajoutEffectuer = new EventEmitter<boolean>();
  @Output() annulerEffectuer = new EventEmitter<boolean>();
  @Input() ville: VilleModule;
  @Input() villeEdited: boolean;


  constructor(private formBuilder: FormBuilder,
              private villeService: VilleService) { }

  ngOnInit(): void {
    this.initVilleForm();
  }

  ngOnChanges() {
    if(this.villeEdited === true) {
      this.initVilleFormWithValues();
    }
  }

  initVilleForm() {
    this.villeForm = this.formBuilder.group(
      {
        nom: ['', Validators.required]
      }
    );
  }

  initVilleFormWithValues() {
    this.villeForm = this.formBuilder.group(
      {
        nom: [this.ville.nom, Validators.required]
      }
    );
  }

  get villeFormControls() { return this.villeForm.controls; }

  enregistereVille() {
    if(this.villeForm.valid && !this.annuler){

      if(this.villeEdited) {
        this.majVilleBDD();
      } else {
        this.ajouterVilleBDD();
      }
     
      
    }else{
      if(this.annuler) {
        this.annulerEffectuer.emit(true);
        this.initVilleForm();
        this.villeEdited = false;
        this.submitted = false;
        this.annuler = false;
     }
    } 

  }

  ajouterVilleBDD() {
    const ville = new VilleModule();
    ville.nom = this.villeForm.get('nom').value;
    this.villeService.ajoutVille(ville).subscribe(
      (ville: VilleModule) => {
        this.ajoutEffectuer.emit(true);
        this.initVilleForm();
        this.submitted = false;
      },
      (err) => {
        alert("problemme de connexion renconterer");
      }
    );

  }

  majVilleBDD() {

    this.ville.nom = this.villeForm.get('nom').value;

    this.villeService.majVille(this.ville).subscribe(
      (ville: VilleModule) => {
        this.ajoutEffectuer.emit(true);
        this.initVilleForm();
        this.submitted = false;
      }
    );

  }

}
