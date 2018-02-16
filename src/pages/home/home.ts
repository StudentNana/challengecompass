import { Component, Input } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  @Input() magneticHeading: number;
  constructor(public navCtrl: NavController, private deviceOrientation: DeviceOrientation, private platform: Platform) {

  }

  ngOnInit() {
    if (this.platform.is('cordova')) {
      console.log('You are on a device, cordova plugins are accessible');
    } else {      
      console.log('Cordova not accessible, add mock data if necessary');
    }
  }

  getMagHeading() {
    console.log('click');
    // Get the device current compass heading
    this.deviceOrientation.getCurrentHeading().then(
    (data: DeviceOrientationCompassHeading) => {
      console.log(data);
      this.magneticHeading = data.magneticHeading;      
    },
    (error: any) => console.log(error)
    );
    
    // Watch the device compass heading change
    var subscription = this.deviceOrientation.watchHeading().subscribe(
    (data: DeviceOrientationCompassHeading) => console.log(data)
    );
    
    // Stop watching heading change
    subscription.unsubscribe();
  }

}
