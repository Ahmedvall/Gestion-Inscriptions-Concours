import { AuthService } from './../../services/auth.service';
import { UsersModule } from './../../models/users.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  compteNotFound: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  get loginFormControls() { return this.loginForm.controls; }

  initLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }


  connexion() {

    if(this.loginForm.valid){
      const user = new UsersModule();
      user.mail = this.loginForm.get('email').value;
      user.motDePass = this.loginForm.get('password').value;
      console.log(user)
      this.authService.login(user).subscribe(
        (userData: UsersModule) => {
          if(userData != null){
            console.log(userData);
            this.authService.saveUserConnected(userData);
          }else{
            console.log("is null");
            this.compteNotFound = true;
          }
        },
        (err) => {
          alert("Probleme Rencontrer lors de l'authentififcation");
        }
      );

    }else {
      alert("Formulaire est invalide !!!");
    }
    
  }

}
