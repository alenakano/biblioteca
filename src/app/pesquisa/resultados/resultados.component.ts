import { Component, OnInit, ViewChild, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

import { PesquisaResponse } from '../nova/pesquisaResponse';
import { Observable } from 'rxjs';
import { Resultados } from '../resultados';
import { ObrasEnum } from 'src/app/util/enums/obras.enum';
import { StatusExemplar } from 'src/app/util/enums/statusDevolucao.enum';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnChanges, OnInit {

  displayedColumns: string[] = ['titulo', 'autor', 'identificador', 'numExemplar', 'local', 'status', 'edit'];
  @Input() pesquisaInput: Resultados[] = [];
  @Output() editarExemplar: EventEmitter<Resultados> = new EventEmitter<Resultados>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource: MatTableDataSource<Resultados>;
  public showTable: boolean;
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
      this.isAuth$ = this.store.select(fromRoot.getIsAuth);
      this.isAuth$.subscribe(
        value => {
          if (value) {
            this.displayedColumns = ['titulo', 'autor', 'identificador', 'numExemplar', 'local', 'status', 'edit'];
          } else {
            this.displayedColumns = ['titulo', 'autor', 'identificador', 'numExemplar', 'local', 'status'];
          }
        }
      );
      this.dataSource = new MatTableDataSource(this.pesquisaInput);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    if (this.pesquisaInput.length > 0) {
      this.dataSource = new MatTableDataSource(this.pesquisaInput);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showTable = true;
    } else {
      this.showTable = false;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onExcluirClick(event): void {
    this.editarExemplar.emit(event);
  }

  isAuth(): any {
    return this.store.select(fromRoot.getIsAuth);
  }

  onIdentificadorName(): string {
    switch (this.pesquisaInput[0].idTipo) {
      case ObrasEnum.LIVROS:
        return'ISBN';
      case ObrasEnum.PERIODICOS:
        return'ISSN';
      case ObrasEnum.MÍDIA:
        return'DOI';
      default:
        return 'Identificador';
    }
  }

  onStatus(): string {
    switch (this.pesquisaInput[0].status) {
      case StatusExemplar.ATIVO:
        return'Disponível';
      case StatusExemplar.EMPRESTADO:
        return'Emprestado';
      case StatusExemplar.PERDIDO:
        return'Inativo por perda';
      case StatusExemplar.DANIFICADO:
        return'Danificado';
      default:
        return 'Identificador';
    }
  }
}
