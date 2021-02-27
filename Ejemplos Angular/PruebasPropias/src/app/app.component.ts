import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@NgModule({
  imports: [FormsModule]
})
export class AppComponent {
  title: String = 'ProyectoBase';
  users: string[] = ['Juan', 'Pepe', 'Maria'];
  hola(){
    alert('Hola!!');
  }
  addUser(newUser: any){
    this.users.push(newUser.value);
    return false;
  }
  deleteUser(user: String){
    for(let i=0; i<this.users.length; i++){
      if(user == this.users[i]){
        this.users.splice(i, 1);
      }
    }
  }
}
