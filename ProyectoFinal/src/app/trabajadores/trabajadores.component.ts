import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import data from './data.json';
import { findLast } from '@angular/compiler/src/directive_resolver';

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

  today = new Date();
  fechaContrato = new Date();

  

  find: boolean=false;
  add: boolean=true;
  selected: boolean=false;

  none: String | undefined = "";
  search: String | undefined;

  trabajadores: any = data;
  contadorIds: number=this.trabajadores.length + 1;
  anoActual: number | undefined;
  anoTrabajador: number | undefined;


  constructor() {}

  ngOnInit(): void {
    for(let i=0; i<this.trabajadores.length; i++){
      this.fechaContrato=this.trabajadores[i].fechaContrato;
      this.trabajadores[i].mesesTrabajados=this.updateMeses();
    }
    this.setAno();
 }

  setAno(){
    this.anoActual = this.today.getFullYear();
    this.anoTrabajador = this.fechaContrato.getFullYear();
  }

 updateMeses(){
  this.mesesTrabajados = this.monthDiff(this.fechaContrato, this.today);
 }
 monthDiff(d1: any, d2: any) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

 addTrabajador(id: any, name: any, surname: any, dni: any, fechaContrato: any){
   var trabajador = {
     id: this.contadorIds,
     name: name,
     surname: surname,
     dni: dni,
     fechaContrato: fechaContrato
   }
  this.trabajadores.push(trabajador);
  this.mesesTrabajados=this.monthDiff(fechaContrato, this.today);
 }
 setData(trabajador: any){
   this.id=trabajador.id;
   this.name=trabajador.name;
   this.surname=trabajador.surname;
   this.dni=trabajador.dni;
   this.fechaContrato=trabajador.fechaContrato;
   this.add=false;
   this.selected=true;
 }
 modTrabajador(id: any, name: any, surname: any, dni: any, fechaContrato: any){
  for(let i=0; i<this.trabajadores.length; i++){
    if(id == this.trabajadores[i].id){
      this.trabajadores[i].name= name;
      this.trabajadores[i].surname= surname;
      this.trabajadores[i].dni= dni;
      this.trabajadores[i].fechaContrato= fechaContrato;
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
}
