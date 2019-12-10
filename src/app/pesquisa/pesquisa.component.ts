import { Component, OnInit } from '@angular/core';
import { PesquisaResponse } from './nova/pesquisaResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIService } from '../util/ui.service';
import { ObrasEnum } from '../cadastros/obras-exemplares/obras.enum';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  public pesquisaResponse: PesquisaResponse = new PesquisaResponse();
  public grupoExemplar: FormGroup;

  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
  ) {
    this.grupoExemplar = this.fb.group({
      identificador: [{value: null, disabled: true}, null],
      titulo: [{value: null, disabled: true}, null],
      autor: [{value: null, disabled: true}, null],
      tomo: [null, null],
      local: [null, Validators.required],
      dataAquisicao: [null, Validators.required],
      numExemplar: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  onIDValue(): void {
    // switch () {
    //   case ObrasEnum.LIVROS : {
    //     return 'Digite o ISBN';
    //     break;
    //   }
    //   case ObrasEnum.MÍDIA: {
    //     return 'Digite o DOI';
    //     break;
    //   }
    //   case ObrasEnum.PERIODICOS: {
    //     return 'Digite o ISSN';
    //     break;
    //   }
    //   default: {
    //     return 'Digite o identificador';
    //     break;
    //   }
    // }
  }

  onObraValue(pesquisaValue: PesquisaResponse) {
    this.pesquisaResponse = pesquisaValue;
  }

}
