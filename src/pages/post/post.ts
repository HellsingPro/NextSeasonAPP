import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPostsViewModel } from "../../models/lista-posts-viewmodel";
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: ListaPostsViewModel;
  category: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {
    this.post = new ListaPostsViewModel();
    this.post = this.navParams.get('post');
    this.category = this.navParams.get('category');
    console.log(this.category);
    //Descomentar a publicidade
    /* const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-app-pub-6169557072873786/9307293169',
      isTesting: true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
    this.admobFree.banner.show(); */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  shareWp() {
    this.socialSharing.shareViaWhatsApp(this.post.guid).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareFb() {
    this.socialSharing.shareViaFacebook(this.post.guid).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareInsta() {
    this.socialSharing.shareViaInstagram(this.post.post_title, this.post.link_imagem).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareTt() {
    this.socialSharing.shareViaTwitter(this.post.guid).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}
