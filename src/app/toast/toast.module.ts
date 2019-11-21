import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { AlertModule } from 'ngx-bootstrap';



@NgModule({
  declarations: [ToastComponent],
  imports: [
    // alert manually added
    AlertModule.forRoot(),
    CommonModule
  ],
  exports: [
    ToastComponent
    // manually added
]
})

export class ToastModule { }
