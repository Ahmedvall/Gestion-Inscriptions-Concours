import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  restPwdForm: FormGroup;
  submitted: boolean;
  @Input() idUser: number;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  
  get restPwdFormControls() { return this.restPwdForm.controls; }

  initLoginForm() {
    this.restPwdForm = this.formBuilder.group(
      {
        password1: ['', Validators.required],
        password2: ['', Validators.required]
      }
    );
  }

  pwdsAreSame() {
    if(this.restPwdForm.get('password1').value !== this.restPwdForm.get('password2').value) {
      // false --> not a same
      return false;
    }
    // true --> same
    return true;
  }

  resetPassword() {

    if(this.restPwdForm.valid && this.pwdsAreSame()){
      var password: string = this.restPwdForm.get('password1').value;;

      this.authService.resetPassword(this.idUser, password).subscribe(
        (res: {message: string}) => {
          if(res.message == 'success'){
            alert("Mot de passe a été modifié");
            this.router.navigateByUrl("/login");
          }else {
            alert("Problème rencontré lors du changement de mot de passe");
          }
        },
        (err) => {
          alert("Problème rencontré lors du changement de mot de passe");
        }
      );

    }else {
      this.submitted = true;
      alert("Form Invalid");
    }

  }

}
