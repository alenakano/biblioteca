import { NgModule } from '@angular/core';
import { 
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatSelectModule,
} from '@angular/material';

import { MatMomentDateModule } from "@angular/material-moment-adapter"

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMomentDateModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule,
        MatSelectModule,

    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMomentDateModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule,
        MatSelectModule,

    ]
})
export class MaterialModule {}