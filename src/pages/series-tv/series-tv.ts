import { PostPage } from './../post/post';
import { ListaPostsViewModel } from './../../models/lista-posts-viewmodel';
import { Http } from '@angular/http';
import { BaseHttpProvider } from './../../providers/base-http/base-http';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the SeriesTvPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-series-tv',
  templateUrl: 'series-tv.html',
})
export class SeriesTvPage {

  public listaPosts: Array<ListaPostsViewModel>;
  public page: number = 1;

  constructor(public navCtrl: NavController, public baseHttpProvider: BaseHttpProvider, public http: Http, ) {
    this.CarregarLista();

  }


  CarregarLista() {
    this.baseHttpProvider.listaPostsByCategory('Séries de Tv', 1).subscribe(data => {
      this.listaPosts = new Array<ListaPostsViewModel>();
      this.listaPosts = data;
    });
    console.log(this.listaPosts);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.page = this.page + 1;
      this.baseHttpProvider.listaPostsByCategory('Séries de Tv', this.page).subscribe(data => {
        this.listaPosts = this.listaPosts.concat(data);
      });

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  open(item: ListaPostsViewModel){
    this.navCtrl.push(PostPage,{
      post: item,
      category: item.category == 'Séries de Tv'? 'Series' : item.category
    });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeriesTvPage');
  }

}
