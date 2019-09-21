import { NgModule } from '@angular/core';
import { 
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';

import { MatMomentDateModule } from "@angular/material-moment-adapter"

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule, 
        MatMomentDateModule,
        MatSidenavModule,
        MatToolbarModule,
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule, 
        MatMomentDateModule,
        MatSidenavModule,
        MatToolbarModule,

    ]
})
export class MaterialModule {}