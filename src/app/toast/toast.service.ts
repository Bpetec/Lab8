import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// manually entered Subject ^ for reactive variables (when data is changed, it gets changed everywhere)
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastChanged: Subject<any> = new Subject<any>();
  constructor() { }

  showToast(type: string, message: string, timeout: number) {
    this.toastChanged.next({
      type: type,
      message: message,
      timeout: timeout
  });
}
}
