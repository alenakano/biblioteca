import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-obras-opcoes',
  templateUrl: './obras-opcoes.component.html',
  styleUrls: ['./obras-opcoes.component.css']
})
export class ObrasOpcoesComponent implements OnInit {

  @Output() selection: EventEmitter<string> = new EventEmitter<string>();
  grupo: FormGroup;

  public selected: string;

  constructor(private fb: FormBuilder) {
    this.grupo = fb.group({
      'selecao': [null, Validators.required]
    });
   }

  ngOnInit() {
  }

  onFormOpcoesSubmit(option: any) {
    if (option.selecao) {
      this.selection.emit(option.selecao);
    }
  }

}
