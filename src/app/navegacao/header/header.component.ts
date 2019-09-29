import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
  ) { }


  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onLogout(): void {
    this.authService.logout();
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

}
