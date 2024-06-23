import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { LogoutModule } from './components/logout-button/logout-button.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, AdminUsersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    LogoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
