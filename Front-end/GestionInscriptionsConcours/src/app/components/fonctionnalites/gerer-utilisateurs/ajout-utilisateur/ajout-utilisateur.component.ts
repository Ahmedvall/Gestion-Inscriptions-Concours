import { UsersModule } from 'src/app/models/users.module';
import { UtilisateursService } from './../../../../services/utilisateurs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css']
})
export class AjoutUtilisateurComponent implements OnInit {

  submitted: boolean;
  viderForm: boolean;
  ajoutCompteForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private utilisateursService: UtilisateursService) { }

  ngOnInit(): void {
    this.initAjoutCompteForm();
  }

  
  get ajoutCompteFormControls() { return this.ajoutCompteForm.controls; }

  initAjoutCompteForm() {
    this.ajoutCompteForm = this.formBuilder.group(
      {
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        numTel: ['', Validators.required],
        date: ['', Validators.required],
        profil: ['prof', Validators.required],
        pwd1: ['', Validators.required],
        pwd2: ['', Validators.required]
      }
    );
  }


  pwdsAreSame() {
    if(this.ajoutCompteForm.get('pwd1').value !== this.ajoutCompteForm.get('pwd2').value) {
      // false --> not a same
      return false;
    }
    // true --> same
    return true;
  }

  onSubmit() {

    if(this.viderForm) {
      this.initAjoutCompteForm();
      this.viderForm = false;
      this.submitted = false;
      return 0;
    }

    if(this.ajoutCompteForm.valid && this.pwdsAreSame()) {
      var utilisateur = new UsersModule();
      utilisateur.nom = this.ajoutCompteForm.get('nom').value;
      utilisateur.prenom = this.ajoutCompteForm.get('prenom').value;
      utilisateur.mail = this.ajoutCompteForm.get('mail').value;
      utilisateur.numTel = this.ajoutCompteForm.get('numTel').value;
      utilisateur.dateNaissance = this.ajoutCompteForm.get('date').value;
      utilisateur.motDePass = this.ajoutCompteForm.get('pwd1').value;

      const profil = this.ajoutCompteForm.get('profil').value;

      if(profil == 'prof'){

        this.utilisateursService.ajoutEnseignant(utilisateur).subscribe(
          (user: UsersModule) => {
            alert("L'enseignant(e) "+ user.prenom +" a bien été ajouter");
            this.initAjoutCompteForm();
            this.submitted = false;
          },
          (err) => {
            alert("Problème rencontré lors de l'ajout de l'enseignant");
          }
        );

      }else if(profil == 'admin'){

        this.utilisateursService.ajoutResponsable(utilisateur).subscribe(
          (user: UsersModule) => {
            alert("Le/La responsable "+ user.prenom +" a bien été ajouter");
            this.initAjoutCompteForm();
            this.submitted = false;
          },
          (err) => {
            alert("Problème rencontré lors de l'ajout du responsable");
          }
        );

      }

      
    }else {
      alert("Formulaire invalide !");
    }
    
  }

}
