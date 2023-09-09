import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UsersModule } from './modules/users/users.module';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthCheckGuard } from './shared/guards/auth-check.guard';
import { NoAccessComponent } from './core/components/no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NoAccessComponent
  ],
  imports: [
    CoreModule,
    UsersModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [AuthCheckGuard]
})
export class AppModule { }
