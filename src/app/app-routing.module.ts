import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usuarioSinLoguear } from './guards/usuario-sin-loguear.guard';
import { usuarioLogueadoGuard } from './guards/usuario-logueado.guard';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [usuarioSinLoguear],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    canActivate: [usuarioSinLoguear],
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'contacts',
    canActivate: [usuarioLogueadoGuard],
    loadChildren: () =>
      import('./pages/contacts/contacts.module').then((m) => m.ContactsModule),
  },
  {
    path: 'admin',
    canActivate: [adminGuard], // Asigna el guard adminGuard aquí para proteger la ruta de administrador
    component: AdminUsersComponent, // Componente que se mostrará para el perfil de administrador
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
