import {SharedServiceProvider} from '../../providers/shared-service/shared-service';
import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HealthServiceProvider} from "../../providers/health-service/health-service";
import {BreedServiceProvider} from "../../providers/breed-service/breed-service";
import {deserialize} from "jsonapi-deserializer";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {HomePage} from "../home/home";
import 'rxjs/add/operator/finally';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CreateProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-profile',
  templateUrl: 'create-profile.html',
})

export class CreateProfilePage {
  private name: string;
  private dob: string;
  private breed: number;
  private health: number;
  private gender: string;
  private about: string;
  private profile: any;
  public profileForm: FormGroup;
  private isUpdate: boolean;
  private isSubmitting: boolean = false;

  private lstHealth: any;
  private lstBreed: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sharedService: SharedServiceProvider,
              public formBuilder: FormBuilder,
              public healthService: HealthServiceProvider,
              public breedService: BreedServiceProvider,
              public userService: UserServiceProvider,
              private app: App,
              public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateProfilePage');
  }

  ngOnInit() {
    this.loadExternalInfo();
    this.profile = this.sharedService.currentProfile;
    if (this.profile) {
      this.isUpdate = true;
      this.name = this.profile.name;
      this.dob = this.profile.dob;
      this.gender = this.profile.gender;
      this.about = this.profile.about;
      this.breed = this.profile.breed.id;
      this.health = this.profile.health.id;
    } else {
      this.gender = 'male';
      this.isUpdate = false;
    }
    this.profileForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      dob: this.formBuilder.control('', [Validators.required]),
      gender: this.formBuilder.control('', [Validators.required]),
      about: this.formBuilder.control('', []),
      breed_id: this.formBuilder.control('', [Validators.required]),
      health_id: this.formBuilder.control('', [Validators.required]),
      avatar: null,
      cover: null
    });


  }

  loadExternalInfo() {
    this.healthService.getAll().subscribe(
      (response: any) => {
        let healths = deserialize(response);
        this.lstHealth = healths;
        console.log(this.lstHealth);
      },
      (error) => {
        console.error(error);
      }
    );


    this.breedService.getAll().subscribe(
      (response: any) => {
        let breeds = deserialize(response);
        this.lstBreed = breeds;
        console.log(this.lstBreed);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fileCoverChangeListener(event: Event) {
    this.readThis(event.target, "cover");
  }

  fileAvatarChangeListener(event: Event) {
    this.readThis(event.target, "avatar");
  }

  readThis(inputValue: any, type: string): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.profileForm.controls[type].setValue(myReader.result.substr(myReader.result.indexOf(',') + 1, myReader.result.length));
    }

    // myReader.readAsText(file);
    myReader.readAsDataURL(file);
    // myReader.readAsBinaryString(file);
  }

  submitProfile(form: FormGroup) {
    debugger;
    if (form.valid) {
      this.isSubmitting = true;
      // console.log(JSON.stringify(form.value))
      // debugger;
      if (this.isUpdate) {
        let newObj = {
          name: form.value.name, about: form.value.about, dob: form.value.dob, gender: form.value.gender, breed_id: parseInt(form.value.breed_id),
          health_id: parseInt(form.value.health_id), avatar: form.value.avatar, cover: form.value.cover
        }
        this.userService.updateProfile(newObj).finally(
          () => {
            this.isSubmitting = false;
          }
        ).subscribe(
          (response: any) => {
            debugger;
            let profile = deserialize(response);
            this.sharedService.userDetails.profile = profile;
            console.log('Update successfully' + response);
            this.dismiss(profile);
          },
          error => {
            console.log('Unable to update: ' + JSON.stringify(error));
          }
        );
      } else {
        let newObj = {
          name: form.value.name, about: form.value.about, dob: form.value.dob, gender: form.value.gender, breed_id: parseInt(form.value.breed_id),
          health_id: parseInt(form.value.health_id), avatar: form.value.avatar, cover: form.value.cover
        }
        this.userService.createProfile(newObj).finally(
          () => {
            this.isSubmitting = false;
          }
        ).subscribe(
          (response: any) => {
            debugger;
            let profile = deserialize(response);
            this.sharedService.userDetails.profile = profile;
            console.log('create successfully' + response);
            this.navCtrl.setRoot(HomePage);
            this.dismiss(profile);
          },
          error => {
            console.log('Unable to create: ' + JSON.stringify(error));
          }
        )
      }
    } else {
      // TODO form is invalid
    }

  }

  dismiss(profile: any) {
    this.viewCtrl.dismiss(profile);
  }

  logout() {
    debugger;
    this.userService.logout().catch(
      error => {
        console.error(error);
      }
    ).then( //finally
      () => {
        this.app.getRootNav().setRoot(LoginPage);
      }
    )
  }

  avatarChanged(event) {
    debugger;
    this.sharedService.readFileInput(event.target).then(
      file => {
        debugger;
        if (file) {
          this.profileForm.controls.avatar.setValue(file.base64String);
        } else {
          this.profileForm.controls.avatar.setValue(null);
        }
      }
    )
  }

  coverChanged(event) {
    debugger;
    this.sharedService.readFileInput(event.target).then(
      file => {
        debugger;
        if (file) {
          this.profileForm.controls.cover.setValue(file.base64String);
        } else {
          this.profileForm.controls.cover.setValue(null);
        }
      }
    )
  }
}


