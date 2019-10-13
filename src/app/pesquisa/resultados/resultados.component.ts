import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';

import { mockPesquisa } from './mockPesquisa';
import { PesquisaResponse } from '../nova/pesquisaResponse';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnChanges, OnInit {

  displayedColumns: string[] = ['id', 'title', 'author', 'location'];
  @Input() pesquisaInput: PesquisaResponse[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource: MatTableDataSource<PesquisaResponse>;
  public showTable: boolean;

  constructor() {}

  ngOnInit() {
      this.dataSource = new MatTableDataSource(this.pesquisaInput);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    if (this.pesquisaInput.length > 0) {
      console.log(this.pesquisaInput[0].id)
      this.dataSource = new MatTableDataSource(this.pesquisaInput);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showTable = true;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
