import { SearchToolbarComponentModule } from './../components/search-toolbar/search-toolbar.module';
import { PlaygroundDetailPageModule } from './../pages/playground-detail/playground-detail.module';
import { AllResultsPageModule } from './../pages/search-results/all-results.module';
import { ChatPageModule } from './../pages/chat/chat.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { AppConfig } from './app.config';

// modules
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { NewsFeedPageModule } from '../pages/news-feed/news-feed.module';
import { PlaygroundsPageModule } from '../pages/playgrounds/playgrounds.module';
import { FavoritesPageModule } from '../pages/favorites/favorites.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { UserProfilePageModule } from '../pages/user-profile/user-profile.module';
import { CreateProfilePageModule } from '../pages/create-profile/create-profile.module';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { BaseServiceProvider } from '../providers/base-service/base-service';

import { WagdagHeaderComponentModule } from '../components/wagdag-header/wagdag-header.module';
import { GoogleMapsComponentModule } from '../components/google-maps/google-maps.module';
import { NearPlaygroundsListComponentModule } from '../components/near-playgrounds-list/near-playgrounds-list.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MomentModule } from 'angular2-moment';
import { SharedServiceProvider } from '../providers/shared-service/shared-service';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CheckInComponentModule } from '../components/check-in/check-in.module';
import { NewPlaygroundModalPageModule } from '../pages/new-playground-modal/new-playground-modal.module';
import { PlaygroundServiceProvider } from '../providers/playground-service/playground-service';
import { LocationServiceProvider } from '../providers/location-service/location-service';
import { BreedServiceProvider } from '../providers/breed-service/breed-service';
import { HealthServiceProvider } from '../providers/health-service/health-service';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { FriendServiceProvider } from '../providers/friend-service/friend-service';
import { PubnubServiceProvider } from '../providers/pubnub-service/pubnub-service';
import { NewsFeedServiceProvider } from '../providers/news-feed-service/news-feed-service';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { SearchServiceProvider } from '../providers/search-service/search-service';
import { SearchFilterPipe } from '../pipes/search-filter/search-filter';
import { ProfileResultsPageModule } from '../pages/search-results/profile-results.module';
import { PlaygroundResultsPageModule } from '../pages/search-results/playground-results.module';
import { ApplicationPipesModule } from '../pipes/application-pipes.module';
import { PlaygroundCardComponentModule } from '../components/playground-card/playground-card.module';
import { ProfileSettingServiceProvider } from '../providers/profile-setting-service/profile-setting-service';
import { SearchOptionsPageModule } from '../pages/search-options/search-options.module';
import {Push} from "@ionic-native/push";
import {Device} from "@ionic-native/device";
import { DeviceTokenServiceProvider } from '../providers/device-token-service/device-token-service';
import { PrivateMessageServiceProvider } from '../providers/private-message-service/private-message-service';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    MomentModule,
    // modules
    LoginPageModule,
    WagdagHeaderComponentModule,
    GoogleMapsComponentModule,
    NearPlaygroundsListComponentModule,
    HomePageModule,
    NewsFeedPageModule,
    PlaygroundsPageModule,
    FavoritesPageModule,
    SettingsPageModule,
    UserProfilePageModule,
    NewPlaygroundModalPageModule,
    CheckInComponentModule,
    CreateProfilePageModule,
    ChatPageModule,
    AllResultsPageModule,
    ProfileResultsPageModule,
    PlaygroundResultsPageModule,
    ApplicationPipesModule,
    PlaygroundCardComponentModule,
    PlaygroundDetailPageModule,
    SearchToolbarComponentModule,
    SearchOptionsPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: AppConfig, useClass: AppConfig},
    BaseServiceProvider,
    UserServiceProvider,
    SharedServiceProvider,
    Geolocation,
    Facebook,
    GooglePlus,
    SocialSharing,
    Push,
    Device,
    PlaygroundServiceProvider,
    LocationServiceProvider,
    SharedServiceProvider,
    BreedServiceProvider,
    HealthServiceProvider,
    ProfileServiceProvider,
    FriendServiceProvider,
    PubnubServiceProvider,
    NewsFeedServiceProvider,
    SearchServiceProvider,
    ProfileSettingServiceProvider,
    DeviceTokenServiceProvider,
    PrivateMessageServiceProvider,
  ]
})
export class AppModule {}
