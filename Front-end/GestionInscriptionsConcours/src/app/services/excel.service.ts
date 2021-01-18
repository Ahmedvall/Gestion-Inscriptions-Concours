import { EtablissementModule } from './../models/etablissement.module';
import { VilleModule } from './../models/ville.module';
import { SpecialiteModule } from 'src/app/models/specialite.module';
import { PrincipalFeuilleModule } from 'src/app/modelsExcel/principal-feuille.module';
import { apiRest } from './../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FiliereModule } from '../models/filiere.module';
import { DatePipe } from '@angular/common';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

    principalFeuill = new Array<PrincipalFeuilleModule>();
    principal = new Array<PrincipalFeuilleModule>();

  constructor(private httpc: HttpClient,
              private datePipe: DatePipe) { }

  public exportAsExcelFile(principales: any[], excelFileName: string): void {
    const principalWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(principales);
    /* const specialiteWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(specialites);
    const etablissementWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(etabs);
    const villeWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(villes);
    const filiereWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filieres); */


    //const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    const workbooks = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbooks, principalWorksheet,"Principal");
    /* XLSX.utils.book_append_sheet(workbooks, specialiteWorksheet,"Specialite");
    XLSX.utils.book_append_sheet(workbooks, etablissementWorksheet,"Etablissement");
    XLSX.utils.book_append_sheet(workbooks, villeWorksheet,"Ville");
    XLSX.utils.book_append_sheet(workbooks, filiereWorksheet,"Filiere"); */
    const buffer: any = XLSX.write(workbooks, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(buffer, excelFileName);

    //this.saveAsExcelFile(excelBuffer2, excelFileName);
    
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }  

  public exportDBAsExcel() {
    this.getExcelFile();
  }

  private getVilles() {
    return this.httpc.get(`${apiRest}/ville/tous`);
  }

  private getEtablissements() {
    return this.httpc.get(`${apiRest}/etablissement/tous`);
  }

  private getSpecialites() {
    return this.httpc.get(`${apiRest}/specialite/tous`);
  }

  private getFilieres()  {
    return this.httpc.get(`${apiRest}/filiere/tous`);
  }


  getExcelFile() {

    var p = new PrincipalFeuilleModule();
    p = this.initPrincipalFeuilleModule();
    this.principal.push(p);

    this.exportAsExcelFile(this.principal, "myExel");
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
