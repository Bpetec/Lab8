import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Local } from 'protractor/built/driverProviders';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
export interface IUser {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = {username: '', password: ''};
  // sets username and password to empty
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
   }

  ngOnInit() {
    this.currentUser = this.localStorageService.getItemsFromLocalStorage();
    console.log('this.currentUser is ', this.currentUser);
    if (this.currentUser != null) {
      this.router.navigate(['contacts']);
    }
  }
  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = {username: 'bpeterson', password: 'brandon123' };
    if (user.username != null && user.password != null) {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
          // log user in, store in local storage, navigate to contacts page
          this.localStorageService.saveItemsToLocalStorage(user);
          this.router.navigate(['contacts', user]);
          // ^ navigates to the contacts page, specified in routes.
      } else { if (user.username === '' && user.password === '') {
        this.toastService.showToast('warning', 'Login failed! Please enter a username and password.', 2000); }
      }} else {
        this.toastService.showToast('warning', 'Login failed! Please check username/password.', 2000);
      }
    }
  }

