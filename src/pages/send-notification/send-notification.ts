import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { notificationVM } from "../../models/notification-viewmodel";
import { BaseHttpProvider } from "../../providers/base-http/base-http";


@IonicPage()
@Component({
  selector: 'page-send-notification',
  templateUrl: 'send-notification.html',
})
export class SendNotificationPage {

  topic: any;
  sendMessage: notificationVM;

  constructor(public navCtrl: NavController, public navParams: NavParams, public baseHttpProvider: BaseHttpProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendNotificationPage');
  }

  send(title: string, message: string){

    this.sendMessage = new notificationVM();
    this.sendMessage.title = title;
    this.sendMessage.message = message;
    this.sendMessage.topic = this.topic;

    this.baseHttpProvider.sendNotification(this.sendMessage).subscribe(data => {
      console.log(data);
    });
    console.log(this.sendMessage)
  }

}
