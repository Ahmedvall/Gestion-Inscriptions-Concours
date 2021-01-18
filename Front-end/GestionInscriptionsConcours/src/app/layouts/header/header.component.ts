import { UsersModule } from './../../models/users.module';
import { AuthService } from './../../services/auth.service';
import { ImportExporeExcelService } from './../../services/import-expore-excel.service';
import { Component, OnInit } from '@angular/core';
import { PrincipalFeuilleModule } from 'src/app/modelsExcel/principal-feuille.module';
import { ExcelService } from 'src/app/services/excel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userConnected: UsersModule;
  userAuthentifier: boolean;

  constructor(private excelService: ExcelService,
              private authService: AuthService,
              private importExporeExcelService: ImportExporeExcelService,
              private router: Router) { }


  ngOnInit(): void {
    this.userConnected = this.authService.getUserConncted();
    if(this.userConnected == null) {
      this.userAuthentifier = false;
    }else {
      this.userAuthentifier = true;
    }
    console.log(this.userConnected);
  }

  getDBExcelFile() {
    //this.excelService.exportDBAsExcel();
    this.getExcelFile();
  }


  deconnecter() {
    this.authService.disconnectUserConnected();
    this.router.navigateByUrl("/login");
  }

  getExcelFile() {
    

    //var p = new PrincipalFeuilleModule();
    //p = this.initPrincipalFeuilleModule();
    //principal.push(p);

    this.importExporeExcelService.exporterDatas().subscribe(
      (datas: PrincipalFeuilleModule[]) => {
        if(datas.length > 0){
          this.excelService.exportAsExcelFile(datas, "myExel");
        } else {
          const principal = new Array<PrincipalFeuilleModule>();
          var p = new PrincipalFeuilleModule();
          p = this.initPrincipalFeuilleModule();
          principal.push(p);
          this.excelService.exportAsExcelFile(principal, "myExel");
        }
        
      },
      (err) => {
        alert(err);
      }
    );


    
  }

  initPrincipalFeuilleModule(): PrincipalFeuilleModule {
    var p = new PrincipalFeuilleModule();

    p.nom_candidat="";
    p.prenom_candidat="";
    p.numTel_candidat = "";
    p.dateNaissance_candidat ="";
    p.email_candidat="";
    p.cin_candidat="";
    p.cne_candidat="";
    p.ville_etablissement= "";
    p.etablissement= "";
  
    p.specialite_diplome_bac="";
    p.date_diplome_bac="";
    p.moyenne_General_bac= 0;
    p.mention_bac="";

    p.specialite_diplome_licence="";
    p.date_diplome_licence="";
    p.mention_licence="";
    p.noteS1= 0;
    p.noteS2= 0;
    p.noteS3= 0;
    p.noteS4= 0;
    p.noteS5= 0;
    p.noteS6= 0;

    p.specialite_diplome_master="";
    p.date_diplome_master="";
    p.mention_master="";
    p.noteS7= 0;
    p.noteS8= 0;
    p.noteS9= 0;
    p.noteS10= 0;

    p.filiere1= "";
    p.filiere2= "";


      return p;
  }

}
