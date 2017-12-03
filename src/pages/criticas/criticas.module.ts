import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriticasPage } from './criticas';

@NgModule({
  declarations: [
    CriticasPage,
  ],
  imports: [
    IonicPageModule.forChild(CriticasPage),
  ],
  exports: [
    CriticasPage
  ]
})
export class CriticasPageModule {}
