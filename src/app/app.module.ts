import { CriticasPage } from './../pages/criticas/criticas';
import { SeriesTvPage } from './../pages/series-tv/series-tv';
import { CinemaPage } from './../pages/cinema/cinema';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Push } from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GamesPage } from "../pages/games/games";
import { PostPage } from "../pages/post/post";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BaseHttpProvider } from '../providers/base-http/base-http';
import { SafePipe } from '../pipes/safe/safe';
import { AdMobFree, AdMobFreeBanner } from '@ionic-native/admob-free';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SendNotificationPage } from "../pages/send-notification/send-notification";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamesPage,
    PostPage,
    CinemaPage,
    SeriesTvPage,
    CriticasPage,
    SendNotificationPage,
    SafePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamesPage,
    PostPage,
    CinemaPage,
    SeriesTvPage,
    CriticasPage,
    SendNotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BaseHttpProvider,
    AdMobFree,
    AdMobFreeBanner,
    SocialSharing,
    Push,
    FCM
  ]
})
export class AppModule {}

