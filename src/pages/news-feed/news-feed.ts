import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, App } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/toPromise';

import * as moment from 'moment';
import { NewsFeedServiceProvider } from '../../providers/news-feed-service/news-feed-service';
import { deserialize } from 'jsonapi-deserializer';
import { FriendServiceProvider } from '../../providers/friend-service/friend-service';

/**
 * Generated class for the NewsFeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-news-feed',
  templateUrl: 'news-feed.html',
})
export class NewsFeedPage {
  public newsFeeds:any;
  public newsFeedMessages: Array<any> = new Array<any>();
  private lstFriendRequest: Array<any> = [];
  private segment: string = 'news_feeds';
  private readonly pageSize: number = 20;
  private readonly friendRequestPageSize: number = 20;
  private pageNumber: number = 1;
  private infiniteScroll: InfiniteScroll;
  private latestId: number;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    private newsFeedService: NewsFeedServiceProvider,
    private friendService: FriendServiceProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsFeedPage');
  }

  ionViewWillEnter() {
    this.updateContent(1);
  }

  ionViewWillLeave() {
    console.log('news-feeds will leave');
    this.newsFeedMessages = [];
    this.lstFriendRequest = [];

  }

  getNewFeeds(page) {
    if (page == 1) {
      this.newsFeedMessages = [];
      this.latestId = null;
    }

    return this.newsFeedService.getList(this.latestId, this.pageSize, page).toPromise().then(
      (response: any) => {
        let newsFeeds = deserialize(response);
        debugger;
        if (page == 1 && newsFeeds[0]) {
          this.latestId = newsFeeds[0].id;
        }
        this.pageNumber = page;
        let messages: Array<any> = new Array<any>();
        newsFeeds.forEach(e => {
          let message = {
            actor_name: e.actor.name,
            actor_avatar: e.actor.avatar,
            created_at: moment.utc(e.created_at).fromNow(),
            trans_key: "news_feeds." + e.object + "." + e.action,
            params: {
            }
          }
          if (e.object == 'profile') {
            if (e.action == 'started_being_friends') {
              message.params['profileName'] = e.object_data.name;
            } else if (e.action == 'accepted_friend_request') {
              // nothing to process
            }
          } else if (e.object == 'playground') {
            if (e.action == 'checked_in') {
              message.params['playgroundName'] = e.object_data.name;
            }
          }

          messages.push(message);
        });

        if (response.meta.pagination.current_page >= response.meta.pagination.total_pages) {
          // if (this.infiniteScroll) {
          //   this.infiniteScroll.enable(false);
          // }
        }

        this.newsFeedMessages = this.newsFeedMessages.concat(messages);

      }
    ).catch(
      error => {
        console.error(error);
      }
    ).then(
      () => {
        //finally

        if (this.infiniteScroll) {
          this.infiniteScroll.complete();
        }
      }
    );
  }

  addNewsFeed(responseData, feed) {
    let actorName = responseData.relatedObjects.profiles[feed.actor].name;
    let newsFeed = {
      actor_name: actorName,
      created_at: moment.utc(feed.created_at).fromNow(),
      key: "news_feeds." + feed.object + "." + feed.action,
      params: {
        actorName: actorName,
      }
    }
    if (feed.object == 'friend_requets') {
      if (feed.action == 'accept') {
        //do nothing
      }
    } else if (feed.object == 'relationships') {
      if (feed.action == 'start') {
        newsFeed.params['profileName'] = feed.formatted_data.profile.name;
      }
    } else if (feed.object == 'playgrounds') {
      if (feed.action == 'check_in') {
        newsFeed.params['playgroundName'] = feed.formatted_data.playground.name;
      }
    }

    this.newsFeedMessages.push(newsFeed);
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    return this.updateContent(this.pageNumber + 1);
  }

  segmentChanged(event) {
    // if (this.infiniteScroll) {
    //   this.infiniteScroll.enable(true);
    // }
    this.updateContent(1);
  }

  updateContent(page) {
    if (page == 1) {
      // if (this.infiniteScroll) {
      //   this.infiniteScroll.enable(true);
      // }
    }

    switch (this.segment) {
      case 'news_feeds':
        return this.getNewFeeds(page);
      case 'friend_requests':
        return this.friendRequest(page);
    }
  }

  friendRequest(page: number) {
    if (page == 1) {
      this.lstFriendRequest = [];
    }

    this.friendService.getFriendRequests(page, this.friendRequestPageSize).toPromise().then(
      (response: any) => {
        let data = deserialize(response);

        if (response.meta.pagination.current_page >= response.meta.pagination.total_pages) {
          // if (this.infiniteScroll) {
          //   this.infiniteScroll.enable(false);
          // }
        }

        this.lstFriendRequest = this.lstFriendRequest.concat(data);;
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    ).then(
      () => {
        //finally

        if (this.infiniteScroll) {
          this.infiniteScroll.complete();
        }
      }
    );
  }

  acceptFriendRequest(friendRequest: any) {
    this.friendService.acceptFriendRequests(friendRequest.id).subscribe(
      response => {
        this.removeFriendRequestFromList(friendRequest);
      },
      error => {

      }
    );
  }

  rejectFriendRequest(friendRequest: any) {
    this.friendService.rejectFriendRequests(friendRequest.id).subscribe(
      response => {
        this.removeFriendRequestFromList(friendRequest);
      },
      error => {

      }
    );
  }

  removeFriendRequestFromList(friendRequest: any) {
    this.lstFriendRequest.splice(this.lstFriendRequest.indexOf(friendRequest));
  }

}
