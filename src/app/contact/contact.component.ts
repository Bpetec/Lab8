import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient } from '@angular/common/http';
import { async } from 'q';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../login/login.component';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = [];
  contactParams = '';
  localStorageService: LocalStorageService<Contact>;
  currentUser: IUser;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService

    ) {
    this.localStorageService = new LocalStorageService('contacts');
  }

 async ngOnInit() {
   const currentUser = this.localStorageService.getItemsFromLocalStorage('user');
   if (currentUser == null) {
    this.router.navigate(['login']);
   }
   this.loadContacts();
   this.activatedRoute.params.subscribe((data: IUser) => {
    console.log('data passed from login component: ', data);
    this.currentUser = data;
  });
  }
async loadContacts() {
  const savedContacts = this.getItemsFromLocalStorage('contacts');
  if (savedContacts && savedContacts.length > 0) {
    this.contacts = savedContacts;
  } else {
    this.contacts = await this.loadItemsFromFile();
  }
  this.sortByID(this.contacts);
}
async loadItemsFromFile() {
  const data = await this.http.get('assets/contacts.json').toPromise();
  return data;
}
addContact() {
  this.contacts.unshift(new Contact({
    id: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null
  }));
}
deleteContact(index: number) {
  this.contacts.splice(index, 1);
  this.saveItemsToLocalStorage(this.contacts);
}
saveContact(contact: Contact) {
let hasError = false;
Object.keys(contact).forEach((key: any) => {
  if (contact[key] === null) {
    hasError = true;
    this.toastService.showToast('danger', 'Save Failed! Property ' + key + ' must be defined.', 4000);
  }
});
if (!hasError) {
  contact.editing = false;
  this.saveItemsToLocalStorage(this.contacts);
}

// if (id === undefined || firstName === undefined) {
//   this.toastService.showToast('danger', 'Save Failed!', 2000);
// } else {
//   contact.editing = false;
//   this.saveItemsToLocalStorage(this.contacts);
// }
// console.log(id);
}
saveItemsToLocalStorage(contacts: Array<Contact>) {
  contacts = this.sortByID(contacts);
  return this.localStorageService.saveItemsToLocalStorage(contacts);
  // const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));
  // console.log(contacts);
  // return savedContacts;
}
getItemsFromLocalStorage(key: string) {
  return this.localStorageService.getItemsFromLocalStorage();
  // const savedContacts = JSON.parse(localStorage.getItem(key));
  // JSON.parse makes it readable for us in console (otherwise its just 1 string)
  // return savedContacts;
}
searchContact(params: string) {
  this.contacts = this.contacts.filter((item: Contact) => {
    const fullName = item.firstName + ' ' + item.lastName;
    if (params === fullName || params === item.firstName || params === item.lastName) {
      return true;
    } else {
      return false;
    }
  });
}
sortByID(contacts: Array<Contact>) {
  contacts.sort((PrevContact: Contact, presContact: Contact) => {
     return PrevContact.id > presContact.id ? 1 : -1;
  });
  return contacts;
}

logout() {
  // clear local storage, navigate to login page.
this.localStorageService.clearItemFromLocalStorage('user');
this.router.navigate(['']);
}
}
