import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './editUser/editUser.component';
import { NotFoundComponent } from 'src/app/core/components/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { UserResolver } from './resolver/user.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordValidation } from 'src/app/shared/directives/passwords.directive';
import { EmailValidation } from 'src/app/shared/directives/email.directive';
import { AuthCheckGuard } from 'src/app/shared/guards/auth-check.guard';
import { NoAccessComponent } from 'src/app/core/components/no-access/no-access.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivateChild: [AuthCheckGuard],
    children: [
      {
        path: 'new',
        component: EditUserComponent
      },
      {
        path: 'edit/:username',
        component: EditUserComponent,
        resolve: {
          user: UserResolver
        }
      }
    ]
  },
  {
    path: '403',
    component: NoAccessComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    UsersComponent,
    EditUserComponent,
    PasswordValidation,
    EmailValidation
  ]
})
export class UsersModule { }
