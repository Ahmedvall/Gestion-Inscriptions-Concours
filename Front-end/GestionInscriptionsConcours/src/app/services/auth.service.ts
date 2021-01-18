import { RoleModule } from './../models/role.module';
import { apiRest } from './../constantes';
import { UsersModule } from './../models/users.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public jwt:string;
  public username: string;
  public role:string;
  public idUser: number;

  constructor(private httpClient: HttpClient,
          private router:Router ) { }


  public login(user: UsersModule){
    return this.httpClient.post(`${apiRest}/compte/login`, user);
  }


  saveUserConnected(user: UsersModule) {
    localStorage.setItem('prenom', ''+user.prenom);
    localStorage.setItem('role', ''+user.role.nomRole);
    localStorage.setItem('idUser',''+user.id);

    this.router.navigateByUrl("/accueil");
  }

  getUserConncted(){
    const user = new UsersModule();
    user.prenom = localStorage.getItem('prenom');
    const role = new RoleModule();
    role.nomRole = localStorage.getItem('role');
    user.role = role;
    user.id = + localStorage.getItem('idUser');

    if(user.prenom != ''){
      return user;
    }else{
      return null;
    }
    

  }


  disconnectUserConnected() {
    localStorage.setItem('prenom', '');
    localStorage.setItem('role', '');
    localStorage.setItem('idUser','');
    
  }










  // pour l'enregestrement de TOKEN
  public saveToken(jwt: string, withGoogle: boolean){
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.saveInfoJWT();
  }

  disconnectUser() {
    localStorage.setItem('token', '');
    localStorage.setItem('idUser','');
    localStorage.setItem('firstName','');
    this.jwt = null;
    this.username = null;
    this.role = null;
    this.router.navigateByUrl("/login");
  }

  public loadToken(){
    this.infoJWT();
    if(this.jwt !== '' ){
      if(this.isDoctor()){
        this.router.navigateByUrl("/dashboardDoctor");
      }
  
      if(this.isAdmin()){
        this.router.navigateByUrl("/dashboardAdmin");
      }
  
      if(this.isPatient()){
        this.router.navigateByUrl("/dashboardPatient");
      }
    }
  }

  saveUserId() {
    
    this.getUser(this.username).subscribe(
      ( user: UsersModule ) => {
        if(user !== null) {
          localStorage.setItem('idUser', ''+user.id);
          localStorage.setItem('firstName', user.prenom);
          if(this.jwt !== ''){
 
          }
        } else {
          this.disconnectUser();
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  
  public infoJWT(){
    this.jwt = localStorage.getItem('token');
    if(this.jwt !== ''){
      let jwtHelper = new JwtHelperService();
      let objJWT = jwtHelper.decodeToken(this.jwt);
      this.username = objJWT.sub;
      this.role = objJWT.role;
    }    
  }

  public saveInfoJWT(){
    this.jwt = localStorage.getItem('token');
    if(this.jwt !== ''){
      let jwtHelper = new JwtHelperService();
      let objJWT = jwtHelper.decodeToken(this.jwt);
      this.username = objJWT.sub;
      this.role = objJWT.role;
      this.saveUserId();
    }    
  }

  public isAdmin(){
    return this.role.indexOf('admin') >= 0;
  }

  public isUser(){
    return this.role.indexOf('user') >= 0;
  }

  public isDoctor(){
    return this.role.indexOf('doctor') >= 0;
  }
  public isPatient(){
    return this.role.indexOf('patient') >= 0;
  }

  getUser(userName: string) {
      return this.httpClient.get(`${apiRest}/users/id/${userName}`);
  }

  loadIdUser() {
    const id = + localStorage.getItem('idUser');
    if(localStorage.getItem('idUser') !== ''){
      return id;
    } else {
      return null;
    }
  }

  getUserName() {

    this.jwt = localStorage.getItem('token');
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    console.log(objJWT);
    if(!objJWT.sub.includes('@')){
      this.username = objJWT.sub;
    } else {
      this.username = null;
    }
    

    return this.username;

  }

  getFirstName() {
    const fn = localStorage.getItem('firstName');
    return fn;
  }

  forgotPassword(email){
    return this.httpClient.get(apiRest + `/motdepasse/oublier/${email}`); 
  }

  resetPassword(idUser: number, password: string){
    return this.httpClient.get(apiRest + `/motdepasse/restaurer/${idUser}/${password}`); 
  }


}
