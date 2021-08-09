import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowedGroupsPageRoutingModule } from './followed-groups-routing.module';

import { FollowedGroupsPage } from './followed-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowedGroupsPageRoutingModule
  ],
  declarations: [FollowedGroupsPage]
})
export class FollowedGroupsPageModule {}
