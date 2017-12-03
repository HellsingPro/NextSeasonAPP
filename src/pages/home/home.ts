import { BaseHttpProvider } from '../../providers/base-http/base-http';
import { ListaPostsViewModel } from './../../models/lista-posts-viewmodel';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PostPage } from "../post/post";

/* import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeBanner } from '@ionic-native/admob-free'; */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listaPosts: Array<ListaPostsViewModel>;
  public page: number = 1;

  constructor(public navCtrl: NavController,
    public baseHttpProvider: BaseHttpProvider,
    public http: Http, /* private admobFree: AdMobFree */

    private alertCtrl: AlertController) {
    this.CarregarLista();

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



  CarregarLista() {
    this.baseHttpProvider.listaPosts(1).subscribe(data => {
      this.listaPosts = new Array<ListaPostsViewModel>();
      this.listaPosts = data;
    });
  }

  open(item: ListaPostsViewModel) {
    this.navCtrl.push(PostPage, {
      post: item,
      category: item.category == 'Séries de Tv' ? 'Series' : item.category
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.page = this.page + 1;
      this.baseHttpProvider.listaPosts(this.page).subscribe(data => {
        this.listaPosts = this.listaPosts.concat(data);
      });

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
