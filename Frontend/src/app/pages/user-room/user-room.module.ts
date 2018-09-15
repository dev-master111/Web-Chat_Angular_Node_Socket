import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoomRoutingModule } from './user-room-routing.module';
import { UserRoomComponent } from './user-room.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoomRoutingModule,
    SharedModule
  ],
  declarations: [
    UserRoomComponent
  ]
})

export class UserRoomModule { }
