import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import { mockPesquisa } from './mockPesquisa';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';

import { PesquisaResponse } from '../nova/pesquisaResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnChanges, OnInit {

  displayedColumns: string[] = ['id', 'title', 'author', 'location', 'exclude'];
  @Input() pesquisaInput: PesquisaResponse[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public dataSource: MatTableDataSource<PesquisaResponse>;
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
            this.displayedColumns = ['id', 'title', 'author', 'location', 'exclude'];
          } else {
            this.displayedColumns = ['id', 'title', 'author', 'location'];
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
    console.log(event);
  }

  isAuth(): any {
    return this.store.select(fromRoot.getIsAuth);
  }

}
