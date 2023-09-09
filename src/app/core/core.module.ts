import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [CommonModule],
  providers: [UsersService, NotificationService],
})
export class CoreModule { }
