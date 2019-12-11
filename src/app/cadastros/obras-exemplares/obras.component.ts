import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {

  public passo = 'opcoes';
  public tipoObra: number;

  constructor() { }

  ngOnInit() {
  }

  onBackOptions(): void {
    this.passo = 'opcoes';
  }

  onTypeSelected(tipo: number): void {
    this.tipoObra = tipo;
    this.passo = 'cadastro';
  }

}
