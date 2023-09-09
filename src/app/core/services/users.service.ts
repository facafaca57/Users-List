import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IContentUser } from '../../shared/interfaces/i-content-table';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: IContentUser[] = [];

  constructor() {
    if(localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem("users") as string);
    }
    else {
      localStorage.setItem('users', JSON.stringify([{
        username: 'mperry19921',
        first_name: 'Matthew',
        last_name: 'Perry',
        email: 'Matthew@mail.com',
        user_type: 'Driver',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry19922',
        first_name: 'Tony',
        last_name: 'Lossia',
        email: 'Tony@mail.com',
        user_type: 'Admin',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry19923',
        first_name: 'Jack',
        last_name: 'Mconah',
        email: 'Jack@mail.com',
        user_type: 'Driver',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry19924',
        first_name: 'Jeremy',
        last_name: 'Olson',
        email: 'Jeremy@mail.com',
        user_type: 'Admin',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry19925',
        first_name: 'Matthew',
        last_name: 'Shepard',
        email: 'matthew@mail.com',
        user_type: 'Admin',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry19926',
        first_name: 'Matthew',
        last_name: 'Perrys',
        email: 'Matthew@mail.com',
        user_type: 'Driver',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry19927',
        first_name: 'Paul',
        last_name: 'Hillton',
        email: 'Paul@mail.com',
        user_type: 'Driver',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry19928',
        first_name: 'Andrew',
        last_name: 'Perry',
        email: 'vAndrew@mail.com',
        user_type: 'Admin',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry19929',
        first_name: 'Antony',
        last_name: 'Perrya',
        email: 'Antony@mail.com',
        user_type: 'Admin',
        password: 'string',
        repeat_password: 'string'
      },{
        username: 'mperry199210',
        first_name: 'Jimmy',
        last_name: 'Label',
        email: 'Jimmy@mail.com',
        user_type: 'Driver',
        password: 'string',
        repeat_password: 'string'
      }]))
    }
    // localStorage.clear()
  }

  getUsers() {
    return of(this.users);
  }

  getUser(username: string) {
    return of(this.users.find(e => e.username === username));
  }

  addUser(user: IContentUser): Observable<any> {
    const index = this.users.findIndex(u => u.username === user.username);
    if (index !== -1) {
      return throwError({ error: 'Username already exist', field: 'username' });
    } else if(!this.checkEmail(user.email)) {
      return throwError({ error:'Enater a valid email', field: 'email' });
    } else if (!this.checkPassword(user.password)) {
      return throwError('Min length 8. at least one number and one letter');
    } else if (user.password != user.repeat_password) {
      return throwError('Passwords does not match');
    }
    this.users.push(user);
    this.updateData();
    return of('User Added!')
  }

  updateUser(username: string, update: IContentUser): Observable<any> {
    const index = this.users.findIndex(e => e.username === username);
    if (index === -1) {
      return throwError('User not found');
    } else if (update.username != username && this.users.some(e => e.username === update.username)) {
      return throwError({ error: 'Username already exist', field: 'username' });
    } else if(!this.checkEmail(update.email)) {
      return throwError({ error:'Enater a valid email', field: 'email' });
    } else if (!this.checkPassword(update.password)) {
      return throwError({ error: 'Min length 8. at least one number and one letter', field: 'password'});
    } else if (update.password != update.repeat_password) {
      return throwError({ error: 'Passwords does not match', field: 'repeat_password'});
    }
    this.users[index] = update;
    this.updateData();
    return of('User Updated!')
  }

  deleteUser(username: string): Observable<any> {
    const index = this.users.findIndex(e => e.username === username);
    if (index === -1) {
      return throwError('User not found!');
    }
    this.users.splice(index, 1);
    this.updateData();
    return of('User deleted Successfuly')
  }

  private updateData() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  checkPassword(val: string) {
    const pass = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    return pass.test(val);
  }

  checkEmail(val: string) {
    const email = new RegExp(/^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/);
    return email.test(val);
  }
}
