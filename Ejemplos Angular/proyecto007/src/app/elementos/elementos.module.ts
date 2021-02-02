import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadoComponent } from './dado/dado.component';



@NgModule({
 
  imports: [
    CommonModule
  ],
  exports: [DadoComponent],
  declarations: [DadoComponent]
})
export class ElementosModule { }
