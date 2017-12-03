import { PostPage } from './../post/post';
import { Http } from '@angular/http';
import { BaseHttpProvider } from './../../providers/base-http/base-http';
import { ListaPostsViewModel } from './../../models/lista-posts-viewmodel';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-criticas',
  templateUrl: 'criticas.html',
})
export class CriticasPage {

  public listaPosts: Array<ListaPostsViewModel>;
  public page: number = 1;

  constructor(public navCtrl: NavController, public baseHttpProvider: BaseHttpProvider, public http: Http, ) {
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
    this.baseHttpProvider.listaPostsByName('Crítica', 1).subscribe(data => {
      this.listaPosts = new Array<ListaPostsViewModel>();
      this.listaPosts = data;
      console.log(this.listaPosts);
    });
    console.log(this.listaPosts);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.page = this.page + 1;
      this.baseHttpProvider.listaPostsByName('Crítica', this.page).subscribe(data => {
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
    console.log('ionViewDidLoad CriticasPage');
  }

}
