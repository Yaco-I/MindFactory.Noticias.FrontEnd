import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasPage } from './noticias-page/noticias-page';
import { NoticiaPageComponent } from './noticia-page/noticia-page';

const routes: Routes = [
  { path: '', component: NoticiasPage },
  {path: ":id", component: NoticiaPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { 
  


}
