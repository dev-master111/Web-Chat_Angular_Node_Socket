import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { MessageBoardComponent } from './message-board/message-board.component';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    UsersListComponent,
    MessageBoardComponent,
    MessageComponent
  ],
  exports: [
    UsersListComponent,
    MessageBoardComponent,
    MessageComponent
  ]
})
export class ComponentsModule { }
