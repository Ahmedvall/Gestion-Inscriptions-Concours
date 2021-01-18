import { StatistiquesService } from './../../services/statistiques.service';
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  canvas: any;
  ctx: any;
  dataLoaded: boolean = false;

  doughnutChartLabels: Label[]; // = ['BMWaaaaaaaaaaaaaaaaaaaaaaaa', 'Ford', 'Tesla','BMWaaaaaaaaaaaaaaaaaaaaaaaa', 'Ford', 'Tesla','BMWaaaaaaaaaaaaaaaaaaaaaaaa', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet;// = [55, 25, 20,55, 25, 20,55, 25, 20];
  doughnutChartType: ChartType = 'doughnut';

  constructor(private statistiquesService: StatistiquesService) {}


 /*  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
    'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];

  public radarChartData: ChartDataSets[] = [
    { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
  ];
  public radarChartType: ChartType = 'radar'; */
  
  ngOnInit(): void {

    this.getCandidatParRegions();
    this.getFiliereParPriorite(1);
    this.getCandidatParEtablissement();
    
  }

  getCandidatParEtablissement() {
    this.statistiquesService.getCandidatsParEtablissement().subscribe(
      (datas: Array<Array<any>>) => {
        console.log(datas);
        this.initCandidatParEtablissement(datas);
      },
      (err) => {
        alert("Probleme Statistique <<CandidatsParEtablissement>>");
      }
    );
  }


  initCandidatParEtablissement(datas: Array<Array<any>>){
    var labelsList: Label[] = [];
    var nombres: MultiDataSet = [];
    for (let index = 0; index < datas.length; index++) {
      labelsList.push(datas[index][0]);
      nombres.push(datas[index][1]);
    }
    this.dataLoaded = true;
    this.doughnutChartLabels = labelsList;
    this.doughnutChartData = nombres;
    console.log(this.doughnutChartLabels);
    console.log(this.doughnutChartData);

  }


  getCandidatParRegions(){
    this.statistiquesService.getCandidatsParRegions().subscribe(
      (datas: Array<Array<any>>) => {
        this.initDatasCandidatParRegions(datas);
      },
      (err) => {
        alert("Probleme Statistique <<CandidatParRegions>>");
      }
    );
  }
  


  initDatasCandidatParRegions(datas: Array<Array<any>>) {
    this.canvas = document.getElementById('cddParRegion');
    this.ctx = this.canvas.getContext('2d');
    var labelsList = new Array<string>();
    var nombres = new Array<number>();
    for (let index = 0; index < datas.length; index++) {
      labelsList.push(datas[index][0]);
      nombres.push(datas[index][1]);
    }
    nombres.push(0);

    const myChart = new Chart(this.ctx, {
    type: 'bar',
          data: {
          labels: labelsList /*['USA', 'Spain', 'Italy', 'France', 'Germany', 'UK', 'Turkey', 'Iran', 'China', 'Russia', 'Brazil', 'Belgium', 'Canada', 'Netherlands', 'Switzerland', 'India', 'Portugal', 'Peru', 'Ireland', 'Sweden']*/,
          datasets: [{
          label: 'Total Candidats.',
          data:  nombres /*[886789, 213024, 189973, 158183, 153129, 138078, 101790, 87026, 82804, 62773, 50036, 42797, 42110, 35729, 28496, 23502, 22353, 20914, 17607, 16755]*/,
          backgroundColor: ['red', , , , , , , , 'orange'],
          borderWidth: 1
          }]
          },
          options: {
          legend: {
          display: false
          },
          responsive: false/* ,
          display: true */
          }
          });
  }


  getFiliereParPriorite(priorite: number){
    this.statistiquesService.getFiliereParPriorite(priorite).subscribe(
      (datas: Array<Array<any>>) => {
        this.initDatasFiliereParPriorite(datas);
      },
      (err) => {
        alert("Probleme Statistique <<FiliereParPriorite>>");
      }
    );
  }

  initDatasFiliereParPriorite(datas: Array<Array<any>>) {
    this.canvas = document.getElementById('filiereParPriorite');
    this.ctx = this.canvas.getContext('2d');
    var labelsList = new Array<string>();
    var nombres = new Array<number>();
    for (let index = 0; index < datas.length; index++) {
      labelsList.push(datas[index][0]);
      nombres.push(datas[index][1]);
    }

    nombres.push(0);
    const myChart = new Chart(this.ctx, {
    type: 'bar',
          data: {
          labels: labelsList /*['USA', 'Spain', 'Italy', 'France', 'Germany', 'UK', 'Turkey', 'Iran', 'China', 'Russia', 'Brazil', 'Belgium', 'Canada', 'Netherlands', 'Switzerland', 'India', 'Portugal', 'Peru', 'Ireland', 'Sweden']*/,
          datasets: [{
          label: 'Total Postuler.',
          data:  nombres /*[886789, 213024, 189973, 158183, 153129, 138078, 101790, 87026, 82804, 62773, 50036, 42797, 42110, 35729, 28496, 23502, 22353, 20914, 17607, 16755]*/,
          backgroundColor: ['red', , , , , , , , 'orange'],
          borderWidth: 1
          }]
          },
          options: {
          legend: {
          display: false
          },
          responsive: false/* ,
          display: true */
          }
          });
  }


  saveRadioChecked(event) {
    this.getFiliereParPriorite(event);
  }


}
