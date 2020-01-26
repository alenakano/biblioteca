import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {

    constructor(private snackBar: MatSnackBar) { }

    showSnackbar(message, action, time) {
        this.snackBar.open(message, action, time);
    }
}
