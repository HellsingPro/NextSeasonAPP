import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeriesTvPage } from './series-tv';

@NgModule({
  declarations: [
    SeriesTvPage,
  ],
  imports: [
    IonicPageModule.forChild(SeriesTvPage),
  ],
  exports: [
    SeriesTvPage
  ]
})
export class SeriesTvPageModule {}
