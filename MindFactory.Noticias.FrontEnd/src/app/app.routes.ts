import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'noticias',
    loadChildren: () =>
      import('./pages/noticias/noticias-module').then(m => m.NoticiasModule)
  },
  {
    path: '',
    redirectTo: 'noticias',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'noticias'
  }


];
