import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosCadastro } from './usuarios/usuariosCadastro';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.css']
})
export class CadastrosComponent implements OnInit {

  constructor() { }
  userInput: UsuariosCadastro = new UsuariosCadastro();

  @ViewChild('tabs', null) tabs: MatTabGroup;

  ngOnInit() {
  }

  onUserValue(user: UsuariosCadastro) {
    this.userInput = user;
    this.tabs.selectedIndex = 0;
  }

}
