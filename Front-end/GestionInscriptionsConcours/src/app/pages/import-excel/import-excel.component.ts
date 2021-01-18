import { ImportExporeExcelService } from './../../services/import-expore-excel.service';
import * as XLSX from 'xlsx';
import { PrincipalFeuilleModule } from './../../modelsExcel/principal-feuille.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {

  infos: PrincipalFeuilleModule[];
  dataUploaded: boolean = false;
  dataInProgress: boolean = false;

  constructor(private importExporeExcelService: ImportExporeExcelService) { }

  ngOnInit(): void {
  }

  getFile(event: any) {
    this.infos = [];
    const file = event.target.files[0];
    const principal = new PrincipalFeuilleModule();
    this.dataInProgress = true;
    this.fileReader(file, principal).then(
      (resp) => {
        this.infos = resp;
        //console.log(this.infos);

        this.importExporeExcelService.importerDatas(this.infos).subscribe(
          (itsOk) => {
            //console.log("Datas bien sauvegarder");
            this.dataUploaded = true;
          },
          (err) => {
            console.log(err);
          }
        );

      }
    );
    
  }

/*   private fileReader(file: any, line: any) {
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      var arrayBuffer: any = fileReader.result;
      const data = new Uint8Array(arrayBuffer);
      const arr = new Array();

      for (let i = 0; i !== data.length; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary', cellDates: true });
      const first_sheet_name = workbook.SheetNames[0];
      console.log("Reading.........");
      const worksheet = workbook.Sheets[first_sheet_name];
      const worksheet2: PrincipalFeuilleModule[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      
      this.infos = worksheet2;
      //console.log(this.infos);

      //this.matchingCell(worksheet2, line);
    };
    fileReader.readAsArrayBuffer(file);
    
  } */


  private fileReader(file: any, line: any) : Promise<any> {
    let fileReader = new FileReader();

    return new Promise(
      (resolve, reject) => {
        fileReader.onload = (e) => {
          var arrayBuffer: any = fileReader.result;
          const data = new Uint8Array(arrayBuffer);
          const arr = new Array();
    
          for (let i = 0; i !== data.length; i++) {
            arr[i] = String.fromCharCode(data[i]);
          }
    
          const bstr = arr.join('');
          const workbook = XLSX.read(bstr, { type: 'binary', cellDates: true });
          const first_sheet_name = workbook.SheetNames[0];
          console.log("Reading.........");
          const worksheet = workbook.Sheets[first_sheet_name];
          //const worksheet2: PrincipalFeuilleModule[] = XLSX.utils.sheet_to_json(worksheet,  { raw: true });
          
          //fixer erreur case vide:
          const worksheet2: PrincipalFeuilleModule[] = XLSX.utils.sheet_to_json(worksheet, {defval:""});


          this.infos = worksheet2;
          resolve(this.infos);
          //return this.infos;
          //console.log(this.infos);
          /**
           * Call matching function
           */
          //this.matchingCell(worksheet2, line);
        };
        fileReader.readAsArrayBuffer(file);
        
      });
    
  }

  

}
