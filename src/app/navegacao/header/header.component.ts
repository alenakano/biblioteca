import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {  } from 'events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

}
