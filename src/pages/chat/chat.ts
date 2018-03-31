import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { PubNubAngular } from 'pubnub-angular2';

import { Keyboard } from '@ionic-native/keyboard';

import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';
import {AppConfig} from "../../app/app.config";
import {PrivateMessageServiceProvider} from "../../providers/private-message-service/private-message-service";

declare var cordova:any;
/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
  providers: [Keyboard, PubNubAngular]
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  private inputElement;
  private millis = 200;
  private scrollTimeout = this.millis + 50;
  private textareaHeight;
  private scrollContentElement: any;
  private footerElement: any;
  private initialTextAreaHeight;
  private keyboardHideSub;
  private keybaordShowSub;

  private pageTitle: string = 'Chat';
  private yourMessage: string = '';
  private pubnub: PubNubAngular;
  private channelPrefix: string = 'wagdag_channel_';

  private messages: Array<any> = [];
  private myProfile: any;
  private friendProfile: any;

  private channel: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public profileService: ProfileServiceProvider,
              public sharedService: SharedServiceProvider,
              public pubnubService: PubNubAngular,
              private appConfig: AppConfig,
              private privateMessageService: PrivateMessageServiceProvider,
              private keyboard: Keyboard,
              public platform: Platform,
              public renderer: Renderer) {
    var self = this;
    this.channel = this.channelPrefix + navParams.data.channel;
    console.log(this.channel);
    this.friendProfile = navParams.data.friendProfile;
    this.myProfile = navParams.data.myProfile;

    this.pageTitle = this.friendProfile.name;

    this.pubnub = pubnubService.init({
      publishKey: this.appConfig.pubnub.publishKey,
      subscribeKey: this.appConfig.pubnub.subscribeKey,
      uuid: this.sharedService.userDetails.profile.id
    });

    this.pubnub.subscribe({
        channels: [this.channel],
        triggerEvents: ['message']
    });


    this.pubnub.getMessage(this.channel, function(msg) {
      console.log('new message: ', msg);
      self.messages.push(msg.message);
      self.updateScroll('new message', 200);
    });

    this.pubnub.history({
      channel: this.channel,
      reverse: true,
      count: 50
    }, function(status, response){
      console.log('chat history: ', response);
      response.messages.forEach(e => {
        self.messages.push(e.entry);
      });
      self.updateScroll('new message', 200);
    });
  }

  ionViewDidLoad() {
    if (this.platform.is('ios')) {
      this.addKeyboardListeners()
    }

    this.scrollContentElement = this.content.getScrollElement();

    this.footerElement = document.getElementsByTagName('page-chat')[0].getElementsByTagName('ion-footer')[0];
    this.inputElement = document.getElementsByTagName('page-chat')[0].getElementsByTagName('textarea')[0];

    this.footerElement.style.cssText = this.footerElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.scrollContentElement.style.cssText = this.scrollContentElement.style.cssText + "transition: all " + this.millis + "ms; -webkit-transition: all " +
      this.millis + "ms; -webkit-transition-timing-function: ease-out; transition-timing-function: ease-out;"

    this.textareaHeight = Number(this.inputElement.style.height.replace('px', ''));
    this.initialTextAreaHeight = this.textareaHeight;

    this.updateScroll('load', 500)
  }

  footerTouchStart(event) {
    if (event.target.localName !== "textarea") {
      event.preventDefault();
    }
  }

  textAreaChange() {

    let newHeight = Number(this.inputElement.style.height.replace('px', ''));
    if (newHeight !== this.textareaHeight) {

      let diffHeight = newHeight - this.textareaHeight;
      this.textareaHeight = newHeight;
      let newNumber = Number(this.scrollContentElement.style.marginBottom.replace('px', '')) + diffHeight;

      let marginBottom = newNumber + 'px';
      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      this.updateScroll('textAreaChange', this.scrollTimeout);
    }
  }

  ionViewDidLeave() {
    this.inputElement.blur();
    if (this.platform.is('ios')) {
      this.removeKeyboardListeners();
    }
  }

  removeKeyboardListeners() {
    this.keyboardHideSub.unsubscribe();
    this.keybaordShowSub.unsubscribe();
  }

  addKeyboardListeners() {

    this.keyboardHideSub = this.keyboard.onKeyboardHide().subscribe(() => {
      let newHeight = this.textareaHeight - this.initialTextAreaHeight + 44;
      let marginBottom = newHeight + 'px';
      console.log('marginBottom', marginBottom)
      this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
      this.renderer.setElementStyle(this.footerElement, 'marginBottom', '0px')
    });

    this.keybaordShowSub = this.keyboard.onKeyboardShow().subscribe((e) => {

    let newHeight = (e['keyboardHeight']) + this.textareaHeight - this.initialTextAreaHeight;
    let marginBottom = newHeight + 44 + 'px';
    console.log('marginBottom', marginBottom)
    this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', marginBottom);
    this.renderer.setElementStyle(this.footerElement, 'marginBottom', e['keyboardHeight'] + 'px');
    this.updateScroll('keybaord show', this.scrollTimeout);
    });
  }

  contentMouseDown(event) {
    //console.log('blurring input element :- > event type:', event.type);
    this.inputElement.blur();
  }

  touchSendButton(event: Event) {
    //console.log('touchSendButton, event type:', event.type);
    event.preventDefault();
    this.sendMessage();
  }

  sendMessage() {
    if (!this.yourMessage.length) return;


    this.privateMessageService.sendMessage(this.friendProfile.id, this.yourMessage).subscribe(
      response => {
        this.yourMessage = '';

        let currentHeight = this.scrollContentElement.style.marginBottom.replace('px', '');
        let newHeight = currentHeight - this.textareaHeight + this.initialTextAreaHeight;
        let top = newHeight + 'px';
        this.renderer.setElementStyle(this.scrollContentElement, 'marginBottom', top);
        this.updateScroll('sendMessage', this.scrollTimeout);
        this.textareaHeight = this.initialTextAreaHeight;
      },
      error => {
        console.error(error);
      }
    )
  }

  updateScroll(from, timeout) {
    setTimeout(() => {
      console.log('updating scroll -->', from)
      this.content.scrollToBottom();
    }, timeout);
  }

}
