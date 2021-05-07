import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import data from './data.json';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css'],
  providers: [DatePipe]
})

export class TrabajadoresComponent implements OnInit {
  id: number | undefined;
  name: String | undefined;
  surname: String | undefined;
  dni: String | undefined;
  mesesTrabajados: number | undefined;
  diasVacaciones: number | undefined;
  restDiasVacaciones: number | undefined;


  today = new Date();
  fechaContrato = new Date();
  

  find: boolean=false;
  add: boolean=true;
  selected: boolean=false;

  none: String | undefined = "";
  search: String | undefined;

  trabajadores: any = data;
  contadorIds: number=this.trabajadores.length + 1;
  diaActual: number | undefined;
  mesActual: number | undefined;
  anoActual: number | undefined;
  anoTrabajador: number | undefined;

  meses: number | undefined;


  constructor(public datePipe: DatePipe) {}

  ngOnInit(): void {
    this.diaActual=this.today.getDate();
    this.mesActual=this.today.getMonth();
    this.anoActual=this.today.getFullYear();
    for(let i=0; i<this.trabajadores.length; i++){
      this.trabajadores[i].mesesTrabajados = this.updateMeses(this.trabajadores[i]);
      this.trabajadores[i].diasVacaciones = this.updateDiasVacaciones(this.trabajadores[i]);
    }
 }

 updateMeses(trabajador:any){
  return this.monthDiff(trabajador.fechaContrato, this.today);
 }
 updateDiasVacaciones(trabajador:any){
  return Math.ceil(this.monthDiff(trabajador.fechaContrato, this.today)*2.5);
 }
 monthDiff(d1t: Date, d2t: Date) {
let d1 = new Date(d1t);
let d2 = new Date(d2t);

  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  //return months <= 0 ? 0 : months; 
  return Math.floor(months);
  
 /*
  return Math.floor((Date.UTC(
    d2.getFullYear(), 
    d2.getMonth(), 
    d2.getDate()) - Date.UTC(d1.getFullYear(), 
    d1.getMonth(), 
    d1.getDate()) ) /(1000 * 60 * 60 * 24));
    */
}

 addTrabajador(id: any, name: any, surname: any, dni: any, fechaContrato: any, mesesTrabajados: any){
   mesesTrabajados = this.monthDiff(fechaContrato, this.today);
   var trabajador = {
     id: this.contadorIds,
     name: name,
     surname: surname,
     dni: dni,
     fechaContrato: fechaContrato, 
     mesesTrabajados: mesesTrabajados
   }
  this.trabajadores.push(trabajador);
  for(let i=0; i<this.trabajadores.length; i++){
    this.trabajadores[i].mesesTrabajados = this.updateMeses(this.trabajadores[i]);
    this.trabajadores[i].diasVacaciones = this.updateDiasVacaciones(this.trabajadores[i]);
  }
 }
 setData(trabajador: any){
   this.id=trabajador.id;
   this.name=trabajador.name;
   this.surname=trabajador.surname;
   this.dni=trabajador.dni;
   this.fechaContrato=trabajador.fechaContrato;
   this.diasVacaciones=trabajador.diasVacaciones;
   this.restDiasVacaciones=0;
   this.add=false;
   this.selected=true;
 }
 modTrabajador(id: any, name: any, surname: any, dni: any, fechaContrato: any, restDiasVacaciones:any){
  for(let i=0; i<this.trabajadores.length; i++){
    if(id == this.trabajadores[i].id){
      this.trabajadores[i].name= name;
      this.trabajadores[i].surname= surname;
      this.trabajadores[i].dni= dni;
      this.trabajadores[i].fechaContrato= fechaContrato;
      if(this.diasVacaciones){
      this.trabajadores[i].diasVacaciones= this.diasVacaciones-restDiasVacaciones;
      }
    }
  }
  this.add=true;
  this.selected=false;
}
 deleteTrabajador(trabajador: String){
  for(let i=0; i<this.trabajadores.length; i++){
    if(trabajador == this.trabajadores[i]){
      this.trabajadores.splice(i, 1);
    }
  }
}
startWith(nombre: String, search: String){
  this.find = false;
  for(let i=0; i<search.length; i++){
    if(nombre.charAt(i)==search.charAt(i)){
      this.find = true;
    }
    else{
      this.find=false;
    }
  }
  return this.find;
}

clean(){
  this.add=true;
  this.selected=false;
}
}
