import { FiliereService } from './../../../services/filiere.service';
import { FiliereModule } from './../../../models/filiere.module';
import { CandidatModule } from 'src/app/models/candidat.module';
import { FilterModule } from './../../../models/filter.module';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SelectionService } from './../../../services/selection.service';
import { DiplomeModule } from './../../../models/diplome.module';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SpecialiteModule } from 'src/app/models/specialite.module';

@Component({
  selector: 'app-filter-recherche',
  templateUrl: './filter-recherche.component.html',
  styleUrls: ['./filter-recherche.component.css']
})
export class FilterRechercheComponent implements OnInit {

  diplomes: DiplomeModule[];
  mentions = new Array<string>();
  filterForm: FormGroup;
  diplomeForm: FormGroup;
  specialiteForm: FormGroup;
  filiereForm: FormGroup;
  mentionForm: FormGroup;
  filters = new Array<FilterModule>();
  filieres = new Array<FiliereModule>();
  filierePrioriter: number = 1;
  @Output() candidatsSelectionner = new EventEmitter<CandidatModule[]>(); 

  constructor(private selectionService: SelectionService,
              private filiereService: FiliereService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDiplomes();
  }

  createMentionForm(mention: string) {
    return this.mentionForm = this.formBuilder.group(
      {
        mention: [mention],
        checked: [false]
      }
    );
  }

  createSpecialiteForm(specialite: SpecialiteModule) {
    return this.specialiteForm = this.formBuilder.group(
      {
        idSpec: [specialite.idSpec],
        nomSpec: [specialite.nom],
        checked: [false]
      }
    );
  }

  createDiplomeForm(diplome: DiplomeModule) {
    return this.diplomeForm = this.formBuilder.group(
      {
        idDiplome: [diplome.idDiplome],
        typeDiplome: [diplome.type],
        moyenne: [''],
        specialites: this.formBuilder.array([this.createSpecialiteForm(new SpecialiteModule())]),
        mentions: this.formBuilder.array([this.createMentionForm("")])
      }
    );
  }

  createFiliereForm(filiere: FiliereModule) {
    return this.filiereForm = this.formBuilder.group(
      {
        idFiliere: [filiere.idFiliere],
        nomFiliere: [filiere.nom],
        checked: [false]
      }
    );
  }

  createFilterForm() {
    return this.filterForm = this.formBuilder.group(
      {
        diplomesList: this.formBuilder.array([this.createDiplomeForm(new DiplomeModule())]),
        filieresList: this.formBuilder.array([this.createFiliereForm(new FiliereModule())])
      }
    );
  }

  get diplomesListCtrl() {	return this.filterForm.get('diplomesList') as FormArray; }

  get filieresListCtrl() {	return this.filterForm.get('filieresList') as FormArray; }


  initFilterForm() {
    
    for (let index = 0; index < this.diplomes.length; index++) {
       this.diplomesListCtrl.push(this.createDiplomeForm(this.diplomes[index]));
       for (let j = 0; j < this.diplomes[index].specialites.length; j++) {
        (this.diplomesListCtrl.at(index+1).get('specialites') as FormArray).push(this.createSpecialiteForm(this.diplomes[index].specialites[j]));
       }
       (this.diplomesListCtrl.at(index+1).get('specialites') as FormArray).removeAt(0);

       for (let k = 0; k < this.mentions.length; k++) {
        (this.diplomesListCtrl.at(index+1).get('mentions') as FormArray).push(this.createMentionForm(this.mentions[k]));
      }
      (this.diplomesListCtrl.at(index+1).get('mentions') as FormArray).removeAt(0);
    }
    this.diplomesListCtrl.removeAt(0);


    for (let index = 0; index < this.filieres.length; index++) {
      this.filieresListCtrl.push(this.createFiliereForm(this.filieres[index]));
    }
    this.filieresListCtrl.removeAt(0);

    //console.log(this.diplomesListCtrl);
  }

  getMentions() {
    this.selectionService.getMentions().subscribe(
      (mentions: Array<string>) => {
        this.mentions = mentions;
        this.createFilterForm();
        this.createDiplomeForm(new DiplomeModule());
        this.createSpecialiteForm(new SpecialiteModule());
        this.createMentionForm("");
        this.initFilterForm();
      },
      (err) =>{
        alert("Probleme rencontrer lors de chargements des mentions ");
      }
    );
  }

  getDiplomes() {
    this.selectionService.getDiplomes().subscribe(
      (diplomes: DiplomeModule[]) => {
        this.diplomes = diplomes;
        //console.log(this.diplomes);
        this.getFilieres();
      },
      (err) => {
        alert("Probleme rencontrer lors du chargement des diplomes");
      }
    );
  }

  getFilieres() {
    this.filiereService.getFilieres().subscribe(
      (filieres: FiliereModule[]) => {
        this.filieres = filieres;
        console.log(this.filieres);
        this.getMentions();
      },
      (err) => {
        alert("Probleme rencontrer lors de chargement des filieres");
      }
    );
  }


  getFilterForm(filterForm) {
    /* console.log("--------------");
    console.log(filterForm.controls.diplomesList.controls); */
    return filterForm.controls.diplomesList.controls;
  }

  getFiliereFilterForm(filterForm) {
    return filterForm.controls.filieresList.controls;
  }

  getSpecialitesForm(filter) {
    return filter.controls.specialites.controls;
  }

  getMentionsForm(filter) {
    return filter.controls.mentions.controls;
  }


  isCheckedSpecialite(i: number, j: number) {
    if((this.diplomesListCtrl.at(i).get('specialites') as FormArray).at(j).value.checked === true) {
      return true;
    }
    return false;

  }

  changeStatusCheckBoxSpec(i: number, j: number, event) {
    if(event.currentTarget.checked === true) {
      for (let index = 0; index < (this.diplomesListCtrl.at(i).get('specialites') as FormArray).length; index++) {
        (this.diplomesListCtrl.at(i).get('specialites') as FormArray).at(index).value.checked = false;
      }
      (this.diplomesListCtrl.at(i).get('specialites') as FormArray).at(j).value.checked = true;
    } else {
      (this.diplomesListCtrl.at(i).get('specialites') as FormArray).at(j).value.checked = false;
    }

  }


  isCheckedMention(i: number, j: number) {
    if((this.diplomesListCtrl.at(i).get('mentions') as FormArray).at(j).value.checked === true) {
      return true;
    }
    return false;

  }

  changeStatusCheckBoxMention(i: number, j: number, event) {
    if(event.currentTarget.checked === true) {
      for (let index = 0; index < (this.diplomesListCtrl.at(i).get('mentions') as FormArray).length; index++) {
        (this.diplomesListCtrl.at(i).get('mentions') as FormArray).at(index).value.checked = false;
      }
      (this.diplomesListCtrl.at(i).get('mentions') as FormArray).at(j).value.checked = true;
    } else {
      (this.diplomesListCtrl.at(i).get('mentions') as FormArray).at(j).value.checked = false;
    }
  }


  isCheckedFiliere(id) {
    if((this.filieresListCtrl as FormArray).at(id).value.checked === true) {
      return true;
    }
    return false;
  }

  changeStatusCheckBoxFiliere(id ,event) {
    if(event.currentTarget.checked === true) {
      for (let index = 0; index < (this.filieresListCtrl as FormArray).length; index++) {
        (this.filieresListCtrl as FormArray).at(index).value.checked  = false;
      }
      (this.filieresListCtrl as FormArray).at(id).value.checked  = true;
    } else {
      (this.filieresListCtrl as FormArray).at(id).value.checked  = false;
    }
  }

  getIdFiliereSelected() {
    for (let index = 0; index < (this.filieresListCtrl as FormArray).length; index++) {
      if((this.filieresListCtrl as FormArray).at(index).value.checked  == true) {
        return (this.filieresListCtrl as FormArray).at(index).value.idFiliere;
      }
    }

    return -1;
  }



  getSelectedFilters() {
    this.filters = new Array<FilterModule>();

    for (let index = 0; index < this.diplomesListCtrl.length; index++) {
      const filter = new FilterModule();
      for (let j = 0; j < (this.diplomesListCtrl.at(index).get('mentions') as FormArray).length; j++) {
        if ((this.diplomesListCtrl.at(index).get('mentions') as FormArray).at(j).value.checked == true) {
          filter.mention = (this.diplomesListCtrl.at(index).get('mentions') as FormArray).at(j).value.mention;
          //console.log((this.diplomesListCtrl.at(index).get('mentions') as FormArray).at(j));
          break;
        }
      }

      for (let k = 0; k < (this.diplomesListCtrl.at(index).get('specialites') as FormArray).length; k++) {
        if ((this.diplomesListCtrl.at(index).get('specialites') as FormArray).at(k).value.checked == true) {
          filter.idSpecialite = (this.diplomesListCtrl.at(index).get('specialites') as FormArray).at(k).value.idSpec;
          //console.log((this.diplomesListCtrl.at(index).get('specialites') as FormArray).at(k));
          break;
        }
      }

      if(this.diplomesListCtrl.at(index).get('moyenne').value != ''){
        filter.moyenne = this.diplomesListCtrl.at(index).get('moyenne').value;
      }else {
        filter.moyenne = null;
      }


      if(filter.idSpecialite != null || filter.mention != null || filter.moyenne != null) {
        filter.idDiplome = this.diplomesListCtrl.at(index).get('idDiplome').value;
        if(!filter.idSpecialite){   filter.idSpecialite = null    }
        if(!filter.mention){   filter.mention = null;    }
        this.filters.push(filter);
      }
    }

    console.log(this.filters);

    return this.filters;
  }

  saveRadioChecked(value) {
    this.filierePrioriter = value;
  }


  onSubmit() {

    if(this.getSelectedFilters().length > 0){

      const filiereId: number = this.getIdFiliereSelected();
      console.log('id: --> ' + filiereId);

      console.log(this.filters);

      this.selectionService.selection(this.filters, filiereId, this.filierePrioriter ).subscribe(
        (candidats: CandidatModule[]) => {
          //console.log(candidats);
          this.candidatsSelectionner.emit(candidats);
        },
        (err) => {
          alert("Probleme rencontrer lors de faire la selection...");
        }
      );
    }else if(this.getIdFiliereSelected() != -1){
      const filiereId: number = this.getIdFiliereSelected();
      console.log('id: --> ' + filiereId);

      console.log(this.filters);

      this.selectionService.selection(this.filters, filiereId, this.filierePrioriter ).subscribe(
        (candidats: CandidatModule[]) => {
          //console.log(candidats);
          this.candidatsSelectionner.emit(candidats);
        },
        (err) => {
          alert("Probleme rencontrer lors de faire la selection...");
        }
      );
    }


  }

}
