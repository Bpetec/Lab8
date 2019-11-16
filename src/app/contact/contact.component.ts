import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient } from '@angular/common/http';
import { async } from 'q';
// import { Http } from '@angular/http';
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<Contact> = [];
  contactParams = '';
  constructor(private http: HttpClient) { }

 async ngOnInit() {
  this.loadContacts();
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
  this.contacts.unshift(new Contact({}));
}
deleteContact(index: number) {
  this.contacts.splice(index, 1);
  this.saveItemsToLocalStorage(this.contacts);
}
saveContact(contact: Contact) {
  contact.editing = false;
  this.saveItemsToLocalStorage(this.contacts);
}
saveItemsToLocalStorage(contacts: Array<Contact>) {
  contacts = this.sortByID(contacts);
  const savedContacts = localStorage.setItem('contacts', JSON.stringify(contacts));
  return savedContacts;
}
getItemsFromLocalStorage(key: string) {
  const savedContacts = JSON.parse(localStorage.getItem(key));
  // JSON.parse makes it readable for us in console (otherwise its just 1 string)
  return savedContacts;
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
}
