import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CinemaPage } from './cinema';

@NgModule({
  declarations: [
    CinemaPage,
  ],
  imports: [
    IonicPageModule.forChild(CinemaPage),
  ],
  exports: [
    CinemaPage
  ]
})
export class CinemaPageModule {}
