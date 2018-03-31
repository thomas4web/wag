import { ChatPage } from './../chat/chat';
import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App, ToastController } from 'ionic-angular';
import {ProfileServiceProvider} from '../../providers/profile-service/profile-service';
import {deserialize} from "jsonapi-deserializer";
import { CreateProfilePage } from '../create-profile/create-profile';
import { FriendServiceProvider } from '../../providers/friend-service/friend-service';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import { PlaygroundServiceProvider } from '../../providers/playground-service/playground-service';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})


export class ProfilePage {
  userProfile: any
  profileTab: any
  isEditMode: any
  friends: Array<any> = []
  private latestLocation: any
  private lastCheckInAt: any
  private lastCheckIn: any;
  private top3CheckIns: Array<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public profileService: ProfileServiceProvider,
              public friendService: FriendServiceProvider,
              private sharedService: SharedServiceProvider,
              public modalCtrl: ModalController,
              private playgroundService: PlaygroundServiceProvider,
              public app: App,
              public toastCtrl: ToastController) {
    this.profileTab = "profile"
    this.latestLocation = "White House"
    this.lastCheckInAt = "Green House"

  }

  ionViewDidLoad() {
    this.getMyProfile();
    this.getLastCheckin();
    this.getTopCheckins();
    this.isEditMode = false;
  }

  getLastCheckin() {
    this.playgroundService.getLastCheckin().subscribe(
      (response: any) => {
        // debugger;
        this.lastCheckIn = deserialize(response);
      },
      error => {
        let toast = this.toastCtrl.create({
          message: 'Unable to get last check-in: ' + error,
          duration: 3000
        });
        toast.present();
        console.log(error);
      }
    )
  }

  getTopCheckins() {
    this.playgroundService.getTopCheckins(3).subscribe(
      (response: any) => {
        // debugger;
        this.top3CheckIns = deserialize(response);
      },
      error => {
        let toast = this.toastCtrl.create({
          message: 'Unable to get top 3 check-ins: ' + error,
          duration: 3000
        });
        toast.present();
        console.log(error);
      }
    )
  }

  showFriendList() {
    this.getFriends();
  }

  editProfile() {
    debugger;
    let modal = this.modalCtrl.create(CreateProfilePage);
    modal.onDidDismiss(profile => {
      if (profile) {
        this.userProfile = profile;
      }
    });
    modal.present();
  }

  getMyProfile() {
    this.userProfile = this.sharedService.userDetails.profile;
  }

  segmentChange(event) {
    if (event._value == 'profile') {
      this.getMyProfile();
    }
  }

  getFriends() {
    this.friendService.findFriends().subscribe(
      (response: any) => {
        let friendsResponse = deserialize(response);
        debugger;
        if (friendsResponse) {
          console.log(JSON.stringify(friendsResponse));
          this.friends = friendsResponse;
        } else {
          this.friends = [ {avatar: 'assets/images/no-image.png', name: 'Fido'}, {avatar: 'assets/images/no-image.png', name: 'Chuck'}, {avatar: 'assets/images/no-image.png', name: 'Maxx'},  ]
        }
      },
      (error) => {
        let toast = this.toastCtrl.create({
          message: 'Unable to get friend list: ' + error,
          duration: 3000
        });
        toast.present();
        console.error(error);
      }
    )
  }

  chatWith(friend) {
    console.log(friend);
    this.app.getRootNav().push(ChatPage, {channel: this.buildChannel(this.userProfile.id, friend.friend_profile.id), myProfile: this.userProfile, friendProfile: friend.friend_profile});
  }

  showProfile(friend) {
  }

  private buildChannel(ownerId:number, friendId: number) {
    return (ownerId > friendId) ? (ownerId + '_' + friendId) : (friendId + '_' + ownerId);
  }

}
