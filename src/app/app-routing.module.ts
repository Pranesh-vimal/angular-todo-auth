import { TodosComponent } from './components/todos/todos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['auth/signin']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'add-todo',
    component: FormComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'todos/:id/edit',
    component: FormComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'todos/:id/view',
    loadChildren: () =>
      import('./components/todoview/todoview.module').then(
        (m) => m.TodoviewModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'todos/:category',
    component: TodosComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
