import { deserialize } from 'jsonapi-deserializer';
import { ProfileServiceProvider } from './../../providers/profile-service/profile-service';
import { ChatPage } from './../chat/chat';
import { SharedServiceProvider } from './../../providers/shared-service/shared-service';
import { FriendServiceProvider } from './../../providers/friend-service/friend-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the UserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  loading: Loading;
  userProfile: any;
  currentProfile: any;
  hideCloseButton: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public friendService: FriendServiceProvider,
    public loadingCtrl: LoadingController,
    public sharedService: SharedServiceProvider,
    public toastCtrl: ToastController,
    public profileService: ProfileServiceProvider) {

    this.userProfile = navParams.data;
    this.currentProfile = sharedService.currentProfile;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

  dismiss() {
    if (this.navCtrl.canGoBack) {
      this.navCtrl.pop();
    } else {
      this.viewCtrl.dismiss();
    }
  }

  sendFriendRequest() {
    this.loading = this.loadingCtrl.create();
    this.loading.setContent('Processing...');
    this.loading.present();
    this.friendService.sendFriendRequest({friend_profile_id: this.userProfile.id}).subscribe(
      (response: any) => {
        debugger;
        console.log('Successfully send friend request to: ' + this.userProfile.name);
        this.loading.dismiss();
        this.viewCtrl.dismiss();
      },
      (error) => {
        debugger;
        console.error(error._body.message);
        this.loading.dismiss();
      }
    )
  }

  chat() {
    this.navCtrl.push(ChatPage, {channel: this.buildChannel(this.currentProfile.id, this.userProfile.id), myProfile: this.currentProfile, friendProfile: this.userProfile})
    // this.app.getRootNav().push(ChatPage, {channel: this.buildChannel(this.userProfile.id, friend.friend_profile.id), myProfile: this.userProfile, friendProfile: friend.friend_profile});
  }

  acceptRequest() {
    this.friendService.acceptFriendRequests(this.userProfile.friend_request.id).subscribe(
      response => {
        this.reloadProfile();
      },
      error => {
        let toast = this.toastCtrl.create({
          message: 'Unable to accept request: ' + error,
          duration: 3000
        });
        toast.present();
      }
    );
  }

  rejectRequest() {
    this.friendService.rejectFriendRequests(this.userProfile.friend_request.id).subscribe(
      response => {
        this.reloadProfile();
      },
      error => {
        let toast = this.toastCtrl.create({
          message: 'Unable to reject request: ' + error,
          duration: 3000
        });
        toast.present();
      }
    );
  }

  reloadProfile() {
    this.profileService.getUserProfile(this.userProfile.id).subscribe(
      response => {
        this.userProfile = deserialize(response);
      },
      error => {
        let toast = this.toastCtrl.create({
          message: 'Unable to reload profile: ' + error,
          duration: 3000
        });
        toast.present();
      }
    );
  }

  private buildChannel(ownerId:number, friendId: number) {
    return (ownerId > friendId) ? (ownerId + '_' + friendId) : (friendId + '_' + ownerId);
  }

}
