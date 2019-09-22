import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
} from '@angular/core';
import {  } from 'events';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }


  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>()


  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus =>
      this.isAuth = authStatus
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

}
