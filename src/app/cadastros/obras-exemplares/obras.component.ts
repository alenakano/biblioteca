import { Component, OnInit } from '@angular/core';
import { ObrasEnum } from './obras.enum';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {

  public passo = 'opcoes';
  public tipoObra: ObrasEnum;

  constructor() { }

  ngOnInit() {
  }

  onBackOptions(): void {
    this.passo = 'opcoes';
  }

  onTypeSelected(tipo: ObrasEnum): void {
    this.tipoObra = tipo;
    this.passo = 'cadastro';
  }

}
