import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadge } from '@angular/material/badge';



import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';


import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,


    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule,
    MatBadge,

    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,

    MatExpansionModule,
    CdkAccordionModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
    ToastrModule.forRoot(), 

  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule,
    MatBadge,

    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,

    MatExpansionModule,
    CdkAccordionModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatSelectModule,
    


  ]
})
export class MaterialModule { }
