import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing-module';
import { NoticiasPage } from './noticias-page/noticias-page';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    NoticiasPage
  ]
})
export class NoticiasModule { }
