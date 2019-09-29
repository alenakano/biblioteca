import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  @Output() sidenavClose: EventEmitter<void> = new EventEmitter<void>()


  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose(): void {
    this.sidenavClose.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
