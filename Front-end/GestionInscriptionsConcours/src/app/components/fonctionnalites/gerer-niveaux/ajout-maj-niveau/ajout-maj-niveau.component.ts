import { TestesEcritOralService } from './../../../../services/testes-ecrit-oral.service';
import { NiveauModule } from './../../../../models/niveau.module';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajout-maj-niveau',
  templateUrl: './ajout-maj-niveau.component.html',
  styleUrls: ['./ajout-maj-niveau.component.css']
})
export class AjoutMajNiveauComponent implements OnInit {

  niveauForm: FormGroup;
  submitted: boolean = false;
  annuler: boolean;
  @Output() ajoutEffectuer = new EventEmitter<boolean>();
  @Output() majEffectuer = new EventEmitter<boolean>();
  @Output() annulerEffectuer = new EventEmitter<boolean>();
  @Input() niveau: NiveauModule;
  @Input() niveauEdited: boolean;

  ajoutEff: boolean = false; 
  majEff: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private testesEcritOralService: TestesEcritOralService) { }

  ngOnInit(): void {
    this.initNiveauForm();
  }

  ngOnChanges(){
    if(this.niveauEdited === true){
      this.initNiveauFormWithValues();
    }
  }

  get niveauFormControls() { return this.niveauForm.controls; }

  initNiveauForm() {
    this.niveauForm = this.formBuilder.group(
      {
        libelle: ['', Validators.required],
        cout: ['', Validators.required]
      }
    );
  }

  initNiveauFormWithValues() {
    this.niveauForm = this.formBuilder.group(
      {
        libelle: [this.niveau.libelle, Validators.required],
        cout: [this.niveau.cout, Validators.required]
      }
    );
  }

  enregistereNiveau() {
    if(this.niveauForm.valid && !this.annuler) {

      if(!this.niveauEdited) {
        this.ajouterNiveauBDD();
      } else {
        this.majNiveauBDD();
      }
      
    } else {
      if(this.annuler === true){
        this.initNiveauForm();
        this.niveauEdited = false;
        this.annulerEffectuer.emit(false);
        this.submitted = false;
        this.annuler = false;
      }
    }
    
  }


  ajouterNiveauBDD(){
    const niveau = new  NiveauModule();

    niveau.libelle = this.niveauForm.get('libelle').value;
    niveau.cout = this.niveauForm.get('cout').value;
      
      this.testesEcritOralService.ajoutNiveau(niveau).subscribe(
        (suc) => {
          this.ajoutEffectuer.emit(true);
          this.initNiveauForm();
          this.submitted = false;
        },
        (err) => {
          alert("Probleme renconterer")
        }
      );
  }

  majNiveauBDD() {
      this.niveau.libelle = this.niveauForm.get('libelle').value;
      this.niveau.cout = this.niveauForm.get('cout').value;
      this.testesEcritOralService.majNiveau(this.niveau).subscribe(
        (suc) => {
          this.ajoutEffectuer.emit(true);
          this.initNiveauForm();
          this.submitted = false;
        },
        (err) => {
          alert("Probleme renconterer")
        }
      );
  }

}
