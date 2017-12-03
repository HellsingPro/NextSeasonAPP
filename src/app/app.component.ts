import { CriticasPage } from './../pages/criticas/criticas';
import { SeriesTvPage } from './../pages/series-tv/series-tv';
import { CinemaPage } from './../pages/cinema/cinema';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { GamesPage } from "../pages/games/games";
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { SendNotificationPage } from "../pages/send-notification/send-notification";
import { BaseHttpProvider } from "../providers/base-http/base-http";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  topic: string;
  key: string;

  pages: Array<{ id: number, ref: string, title: string, component: any, iconAndroid: string, iconIos: string }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private push: Push,
    public baseHttpProvider: BaseHttpProvider, ) {

    if (window.localStorage.getItem('topic') != null || window.localStorage.getItem('topic') != "") {
      window.localStorage.setItem('topic', 'all');
    }

    this.topic = window.localStorage.getItem('topic');

    this.initializeApp();
    this.pushSetup();

    // used for an example of ngFor and navigation
    this.pages = [
      { id: 0, ref: ' home', title: 'Home', component: HomePage, iconAndroid: 'ios-home', iconIos: 'ios-home' },
      { id: 1, ref: ' Games', title: 'Games', component: GamesPage, iconAndroid: 'md-game-controller-b', iconIos: 'ios-game-controller-b' },
      { id: 2, ref: ' Cinema', title: 'Cinema', component: CinemaPage, iconAndroid: 'md-film', iconIos: 'ios-film' },
      { id: 3, ref: ' Series', title: 'Séries de TV', component: SeriesTvPage, iconAndroid: 'md-videocam', iconIos: 'ios-videocam' },
      { id: 4, ref: ' home', title: 'Críticas', component: CriticasPage, iconAndroid: 'md-chatboxes', iconIos: 'ios-chatboxes' },
      { id: 5, ref: ' home', title: 'Enviar Notificação', component: SendNotificationPage, iconAndroid: 'md-chatboxes', iconIos: 'ios-chatboxes' }
    ];

  }

  pushSetup() {
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    const options: PushOptions = {
      android: {
        senderID: '614766982202',
        forceShow: 'true',
        topics: ['news', 'games', 'series', 'cinema']
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    /*     pushObject.on('notification').subscribe((notification: any) => {
            let yourAlert = this.alertCtrl.create({
              title: 'New Message',
              message: notification.message
            });
            yourAlert.present();
            console.log(notification);
          
        }); */

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let yourAlert = this.alertCtrl.create({
          title: notification.title,
          message: notification.message
        });
        yourAlert.present();
        console.log(notification);
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      if (registration.registrationId != "") {
        window.localStorage.setItem('key', registration.registrationId);
        this.key = window.localStorage.getItem('key');
        this.baseHttpProvider.registerID(this.key, this.topic).subscribe(res => {
          console.log(res);
        });
      }
      console.log('Device registered', registration)
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  openPage(page) {
    document.getElementById('0a').classList.remove('home');
    document.getElementById('1a').classList.remove('Games');
    document.getElementById('2a').classList.remove('Cinema');
    document.getElementById('3a').classList.remove('Series');
    document.getElementById('4a').classList.remove('home');
    this.nav.setRoot(page.component);
    document.getElementById(page.id + "a").className += page.ref;
  }
}
