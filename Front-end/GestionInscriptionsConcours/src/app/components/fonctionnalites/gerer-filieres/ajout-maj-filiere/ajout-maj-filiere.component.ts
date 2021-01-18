import { FiliereService } from './../../../../services/filiere.service';
import { FiliereModule } from './../../../../models/filiere.module';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ajout-maj-filiere',
  templateUrl: './ajout-maj-filiere.component.html',
  styleUrls: ['./ajout-maj-filiere.component.css']
})
export class AjoutMajFiliereComponent implements OnInit {

  filiereForm: FormGroup;
  submitted: boolean = false;
  annuler: boolean;
  @Output() ajoutEffectuer = new EventEmitter<boolean>();
  @Output() majEffectuer = new EventEmitter<boolean>();
  @Output() annulerEffectuer = new EventEmitter<boolean>();
  @Input() filiere: FiliereModule;
  @Input() filiereEdited: boolean;

  ajoutEff: boolean = false; 
  majEff: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private filiereService: FiliereService) { }

  ngOnInit(): void {
    this.initfiliereForm();
  }

  ngOnChanges(){
    if(this.filiereEdited === true){
      this.initfiliereFormWithValues()
    }
  }

  get filiereFormControls() { return this.filiereForm.controls; }

  initfiliereForm() {
    this.filiereForm = this.formBuilder.group(
      {
        nom: ['', Validators.required],
        date: ['', Validators.required],
        description: ['', Validators.required]
      }
    );
  }

  initfiliereFormWithValues() {
    this.filiereForm = this.formBuilder.group(
      {
        nom: [this.filiere.nom, Validators.required],
        date: [formatDate(this.filiere.dateCreation, 'yyyy-MM-dd', 'en'), Validators.required],
        description: [this.filiere.description, Validators.required]
      }
    );
  }

  enregistereFiliere() {
    if(this.filiereForm.valid && !this.annuler) {

      if(!this.filiereEdited) {
        this.ajouterFiliereBDD();
      } else {
        this.majFiliereBDD();
      }
      
    } else {
      if(this.annuler === true){
        this.initfiliereForm();
        this.filiereEdited = false;
        this.annulerEffectuer.emit(false);
        this.submitted = false;
        this.annuler = false;
      }
    }
    
  }


  ajouterFiliereBDD(){
    const filiere = new  FiliereModule();

      filiere.nom = this.filiereForm.get('nom').value;
      filiere.description = this.filiereForm.get('description').value;
      filiere.dateCreation = this.filiereForm.get('date').value;
      console.log(filiere);
      this.filiereService.ajoutFiliere(filiere).subscribe(
        (suc) => {
          console.log('Bien ajouter');
          this.ajoutEffectuer.emit(true);
          this.initfiliereForm();
          this.submitted = false;
        },
        (err) => {
          alert("Probleme renconterer")
        }
      );
  }

  majFiliereBDD() {
      this.filiere.nom = this.filiereForm.get('nom').value;
      this.filiere.description = this.filiereForm.get('description').value;
      this.filiere.dateCreation = this.filiereForm.get('date').value;
      console.log(this.filiere);
      this.filiereService.majFiliere(this.filiere).subscribe(
        (suc) => {
          console.log('Bien Modifier');
          this.ajoutEffectuer.emit(true);
          this.initfiliereForm();
          this.submitted = false;
        },
        (err) => {
          alert("Probleme renconterer")
        }
      );
  }


  

}
