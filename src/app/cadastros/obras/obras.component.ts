import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {

  public passo = 'opcoes';

  constructor() { }

  ngOnInit() {
  }

  onTypeSelected(tipo: string): void {
    this.passo = tipo;
    console.log ('PASSO', this.passo)
  }

}
