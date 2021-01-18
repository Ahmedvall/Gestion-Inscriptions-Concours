import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mot-de-passe-oublier',
  templateUrl: './mot-de-passe-oublier.component.html',
  styleUrls: ['./mot-de-passe-oublier.component.css']
})
export class MotDePasseOublierComponent implements OnInit {

  forgotPwdForm: FormGroup;
  submitted: boolean;
  emailCorrectError: boolean;
  emailCorrect: boolean;
  idUser: number;
  emailValid: boolean

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initFogotPwdForm();
  }

  get forgotPwdFormControls() { return this.forgotPwdForm.controls; }

  initFogotPwdForm() {
    this.forgotPwdForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]]
      }
    );
  }


  forgotPwd() {

    if(this.forgotPwdForm.valid) {

      var email: string = this.forgotPwdForm.get('email').value;;
      this.authService.forgotPassword(email).subscribe(
        (msg: {message: string}) => {
          if(msg.message == 'invalid'){
            console.log('it is invalid ');
            this.emailCorrectError = true;
            this.submitted = true;
          }else {
            var id: number = + msg.message;
            this.idUser = id;
            console.log(id);
            this.emailCorrect = true;
          }

          console.log(msg);
        },
        (err) => {
          alert("Probleme rencontrer lors de l'execution de l'action");
        }
      );

    }else {
      alert("formulaire invalide !")
    }

  }

}
