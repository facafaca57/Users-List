import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { NoAccessComponent } from './core/components/no-access/no-access.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
