import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoomComponent } from './user-room.component';

const routes: Routes = [
  { path: ':username', component: UserRoomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoomRoutingModule { }
