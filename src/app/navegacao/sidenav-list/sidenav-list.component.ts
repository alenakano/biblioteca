import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  @Output() sidenavClose: EventEmitter<void> = new EventEmitter<void>()


  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>
      this.isAuth = authStatus
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onClose(): void {
    this.sidenavClose.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
