import { PostPage } from './../post/post';
import { Component } from '@angular/core';
import { BaseHttpProvider } from '../../providers/base-http/base-http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListaPostsViewModel } from "../../models/lista-posts-viewmodel";

/**
 * Generated class for the GamesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {

  public listaPosts: Array<ListaPostsViewModel>;
  public page: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public baseHttpProvider: BaseHttpProvider) {
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
    this.baseHttpProvider.listaPostsByCategory('Games', 1).subscribe(data => {
      this.listaPosts = new Array<ListaPostsViewModel>();
      this.listaPosts = data;
    });
    console.log(this.listaPosts);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.page = this.page + 1;
      this.baseHttpProvider.listaPostsByCategory('Games', this.page).subscribe(data => {
        this.listaPosts = this.listaPosts.concat(data);
      });

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  open(item: ListaPostsViewModel) {
    this.navCtrl.push(PostPage, {
      post: item,
      category: item.category == 'Séries de Tv' ? 'Series' : item.category
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');
  }

}
