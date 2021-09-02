import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsSearchPageRoutingModule } from './news-search-routing.module';

import { NewsSearchPage } from './news-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsSearchPageRoutingModule
  ],
  declarations: [NewsSearchPage]
})
export class NewsSearchPageModule {}
