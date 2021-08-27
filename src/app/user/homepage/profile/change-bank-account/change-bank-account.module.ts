import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeBankAccountPageRoutingModule } from './change-bank-account-routing.module';

import { ChangeBankAccountPage } from './change-bank-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChangeBankAccountPageRoutingModule
  ],
  declarations: [ChangeBankAccountPage]
})
export class ChangeBankAccountPageModule {}
