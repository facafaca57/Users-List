import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  initial: { state: string, message: string } | null = null;

  constructor() { }

  private notify = new BehaviorSubject<any>(this.initial)

  get isEnabled() {
    return this.notify.asObservable();
  }

  showNotify(data: { state: string, message: string }){
    this.notify.next(data);
  }
}
