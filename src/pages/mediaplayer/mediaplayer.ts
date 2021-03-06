import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {HttpErrorResponse} from "@angular/common/http";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Favourites} from "../../app/favourites";


/**
 * Generated class for the MediaplayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mediaplayer',
  templateUrl: 'mediaplayer.html',
})
export class MediaplayerPage {

  title: string;
  url: string;
  description: string;
  file_id: number;
  filename: string;
  user_id: number;
  mime_type: string;
  media_type: string;
  time_added: string;


  favourites: Favourites = {
    favourite_id: 0,
    file_id: 0,
    user_id: 0
  };


  temp: string;
  userIdCounter: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, private photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaplayerPage');
    this.mediaProvider.getOneFile(this.navParams.get('mediaplayerid')).subscribe(response => {
      console.log(response + "this is response");
      this.url = this.mediaProvider.uploadUrl + '/' + response['filename'];
      this.title = response['title'];
      this.description = response['description'];
      this.time_added = response['time_added'];
      this.user_id = response['user_id'];
      this.file_id = response['file_id'];

      this.mediaProvider.favouritesByFileId(this.file_id).subscribe(ressu => {

        console.log(ressu + "this is ressu");
        console.log(ressu['favourites.user_id']);
        this.favourites.user_id = ressu['favourites.user_id'];  //users that liked the photo
        //this.favourites.favourite_id = ressu['favourites.favourite_id'];
        //this.favourites.file_id = ressu['favourites.file_id'];
        console.log("Favourite objects details: " + this.favourites.file_id + " <-- file id + user id-->  " + this.favourites.user_id + " finally favourites --> " + this.favourites.favourite_id);
        console.log("ressu: " + JSON.stringify(ressu));

        //this.temp = JSON.stringify(ressu);
        //console.log("current temp " + this.temp);
        //this.userIdCounter = (this.temp.match(/user_id/g) || []).length;
        //console.log(this.userIdCounter);
        //this is the same as below.
        this.userIdCounter = Object.keys(ressu).length;

      });
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  openImage() {
    this.photoViewer.show(this.url, this.title);
  }
}
