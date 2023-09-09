import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { UsersService } from '../../../core/services/users.service';
import { IContentUser } from '../../../shared/interfaces/i-content-table';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-editUser',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.scss']
})
export class EditUserComponent implements OnInit {

  isNew = true;
  user: IContentUser = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    user_type: '',
    password: '',
    repeat_password: ''
  };

  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private fb: FormBuilder,
    private notify: NotificationService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      user_type: ['Driver', [Validators.required]],
      password: ['', [Validators.required]],
      repeat_password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.data.pipe(filter(f => !!f.user)).subscribe(({ user }) => {
      this.userForm.patchValue(user)
      this.user = user;
      this.isNew = false
    })

    this.userForm.valueChanges.pipe().subscribe((e) => {
      if (this.userForm.get('password')?.value != this.userForm.get('repeat_password')?.value) {
        this.userForm.get('repeat_password')?.setErrors({noMatch: true})
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const data = this.userForm.value;
      if (this.isNew) {
        this.usersService.addUser(data).subscribe({
          next: (e) => this.loadNotification('success', e),
          error: (e) => this.loadNotification('error', e)
        });
      } else {
        this.usersService.updateUser(this.user.username, data).subscribe({
          next: (e) => this.loadNotification('success', e),
          error: (e) => this.loadNotification('error', e)
        });
      }
    } else {
      Object.keys(this.userForm.controls).forEach((field) => {
        const control = this.userForm.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }

  deleteUser() {
    this.usersService.deleteUser(this.user.username).subscribe({
      next: (e) => this.loadNotification('success', e),
      error: (e) => this.loadNotification('error', e)
    });
  }

  private loadNotification(s: any, m: any) {
    if(s === 'success'){
      this.router.navigate(['/']);
    } else {
      if(m.field) {
        this.userForm.get(m.field)?.setErrors({ notValid: true })
        this.userForm.get(m.field)?.markAsTouched({ onlySelf: true });
      }
    }

    this.notify.showNotify(
      { state: s, message: m.error ? m.error : m }
    );
  }
}
