import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { categorias } from './categorias';

@Component({
  selector: 'app-outras-obras',
  templateUrl: './outras-obras.component.html',
  styleUrls: ['./outras-obras.component.css']
})
export class OutrasObrasComponent implements OnInit {

  @Output() backOptions: EventEmitter<void> = new EventEmitter<void>();

  grupoOutra: FormGroup;
  lista: Array<any>;

  public selected: string;

  constructor(private fb: FormBuilder) {
    this.lista = categorias;
    this.grupoOutra = fb.group({
      nomeOutra: [null, Validators.required],
      nomeAutor: [null, Validators.required],
      cat: [null, Validators.required],
      local: [null, Validators.required],
      data: [null, Validators.required],
      categoria: [null, Validators.required],
      pais: [null, Validators.required],
      obs: [null, null],
    });
   }

  ngOnInit() {
  }

  onFormOpcoesSubmit(cadastro: any) {
    console.log(cadastro);
  }

  voltar(): void {
    this.backOptions.emit();
  }


}
