import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CheckInComponent } from '../../components/check-in/check-in';

/**
 * Generated class for the NewPlaygroundModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-playground-modal',
  templateUrl: 'new-playground-modal.html',
})
export class NewPlaygroundModalPage {

  @ViewChild(CheckInComponent) checkIn: CheckInComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPlaygroundModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onCheckedIn(event) {
    this.viewCtrl.dismiss();
  }

}
