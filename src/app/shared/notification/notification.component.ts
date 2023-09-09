import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  type: 'error' | 'success' = 'success';
  message = 'Message';
  show = false;
  timeout!: any;

  constructor(private notifiService: NotificationService) { }

  ngOnInit() {
    this.notifiService.isEnabled.subscribe({
      next: (c) => {
        if (!!c ){
          if(!this.show) {
            this.type = c.state;
            this.message = c.message;
            this.show = true;
            this.hide();
          } else if (this.show) {
            clearTimeout(this.timeout);
            this.show = false;
            setTimeout(() => {
              this.type = c.state;
              this.message = c.message;
              this.show = true;
              this.hide();
            }, 500);
          }
        }
      }
    })
  }

  private hide() {
    this.timeout = setTimeout(() => {
      this.show = false;
    }, 2000);
  }
}
