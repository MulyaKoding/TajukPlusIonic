import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteDataPageRoutingModule } from './complete-data-routing.module';

import { CompleteDataPage } from './complete-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CompleteDataPageRoutingModule
  ],
  declarations: [CompleteDataPage]
})
export class CompleteDataPageModule {}
