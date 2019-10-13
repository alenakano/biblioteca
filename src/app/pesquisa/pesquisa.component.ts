import { Component, OnInit } from '@angular/core';
import { PesquisaResponse } from './nova/pesquisaResponse';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  public pesquisaResponse: PesquisaResponse = new PesquisaResponse();

  constructor() { }

  ngOnInit() {
  }

  onObraValue(pesquisaValue: PesquisaResponse) {
    this.pesquisaResponse = pesquisaValue;
    console.log('VALOR PESQUISA ', this.pesquisaResponse);
  }

}
