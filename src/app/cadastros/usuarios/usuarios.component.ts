import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public maxDate;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    //Mínimo de 16 anos para poder se cadastrar na biblioteca
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 12);
  }

  onSubmit(form: NgForm) {
    console.log(form)
  }


}
