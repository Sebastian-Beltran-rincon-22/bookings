import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { ModalComponent } from './libs/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from '../pages/pages.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    HeaderComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    ModalComponent
  ]
})
export class CoreModule { }
