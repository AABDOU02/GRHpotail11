import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventApi } from '@fullcalendar/core';
import { TokenStorage } from 'src/app/core/services/token-storage.service';
import { EcheanceContratService } from '../../contrat/echeance-contrat.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { ConsltmanagerService } from '../consltmanager.service';

@Component({
  selector: 'app-consltmanager',
  templateUrl: './consltmanager.component.html',
  styleUrls: ['./consltmanager.component.scss']
})
export class ConsltmanagerComponent implements OnInit {
  [x: string]: any;



  ngOnInit(): void {
    this.fectchListCompetence()
  }

 
 

  constructor(
    
    private serv :ConsltmanagerService,
    private token:TokenStorage,
    private datePipe: DatePipe
  ) {

  }
  
  

  columnDefs = [
    {
      headerName: "Matricule",
      field: "mat_pers",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    {
      headerName: "Nom et prénom",
      field: "nom_pers",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    {
      headerName: "Position",
      field: "cod_soc",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    
    {
      headerName: "Affectation",
      field: "lib_serv",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 250,
    },
    {
      headerName: "Emploi",
      field: "lib_post",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
    
    {
      headerName: "Famille",
      field: "cod_metier",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 150,
    },
  
  ];

  listObject:any
  modules: Module[] = [ClientSideRowModelModule];
fectchListCompetence(){
  this.serv.getListCompetenceReq(this.token.getUser().matpers)
    .subscribe(
      (data :any) =>
      {

        this.listObject=data
        console.log("competence"+this.listObject)


      }
    )

}
list :any
listOptionComp :any
listNatComp :any

onCellClicked(event){


  console.log("uuuuuuuuuuuuuuu"+event)
  this.serv.getListCompetenceReqPers(this.token.getUser().matpers,event.value)
  .subscribe(
    (data1 :any) =>
    {

      this.list=data1
      this.listOptionComp=data1
      console.log("competenceuuuuuuuuuuuuuuu"+this.list)


    }
  )


  

  this.serv.getListNatCompetence()
  .subscribe(
    (data2 :any) =>
    {

      this.listNatComp=data2
      
      console.log("naaaaaaaaaaaaaaaaaaaaaattttttttttt"+this.listNatComp)


    }
  )
}



tmpo;
count = 0;
arrayOfObj = [];
onAddRow(){
  
  //this.listObject=null
  this.tmpo=1;
  this.count ++;
  console.log("yytttttttttttt"+this.list)
  
  if(this.count==1){
  this.arrayOfObj.push(this.count);
  
  
  }
  if(this.count>=2){
    this.objectif=''
    this.libele=''
    console.log("init"+this.objectif+"    "+this.libele);
  
  }
  
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  valNatComp :any

  choseNatComp(){
    console.log("init"+this.valNatComp);


  }
}
