import { Component, Input } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DeviceOrientation, DeviceOrientationCompassHeading, DeviceOrientationCompassOptions } from '@ionic-native/device-orientation';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Phase } from '../../app/phase';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit{

  @Input() currentHeading: number;
  @Input() direction: string;

  private options: DeviceOrientationCompassOptions = { frequency: 1000 };
  private cardDirection = {};

  constructor(public navCtrl: NavController, private deviceOrientation: DeviceOrientation, 
              private platform: Platform, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.cardDirection['N'] = new Phase(338, 22);
    this.cardDirection['NO'] = new Phase(22, 68);
    this.cardDirection['O'] = new Phase(68, 112);
    this.cardDirection['SO'] = new Phase(112, 157);
    this.cardDirection['S'] = new Phase(157, 202);
    this.cardDirection['SW'] = new Phase(202, 247);
    this.cardDirection['W'] = new Phase(247, 292);
    this.cardDirection['NW'] = new Phase(292, 337);
  }

  ngOnInit() {
    if (this.platform.is('cordova')) {
      console.log('You are on a device, cordova plugins are accessible');
    } else if (this.platform.is('ios')) {
      console.log('iOS device');
    } else {      
      console.log('Cordova not accessible, add mock data if necessary');
    }

    // get current location
    // this.geolocation.watchPosition().subscribe((data) => {
    //   this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude)
    //                     .then((result: NativeGeocoderReverseResult) => { 
    //                       console.log(JSON.stringify(result));
    //                     })
    //                     .catch((error: any) => console.log(error));
    // });

    this.deviceOrientation.watchHeading(this.options).subscribe(
      (data: DeviceOrientationCompassHeading) => {
        this.currentHeading = data.magneticHeading;
        // we should rotate the image counterclockwise
        let imageAngle = - data.magneticHeading;
        for (let key in this.cardDirection) {
          let value = this.cardDirection[key];
          if (value.contains(data.magneticHeading)) {
            this.direction = key;
          }
        }
        this.rotateCompass(imageAngle);
        console.log(this.currentHeading);
        }
      );
  }

  rotateCompass(angle:Number) {
    console.log('rotate:' + angle);
    document.getElementById('compass').style.transform = 'rotate(' + angle + 'deg)';    
  }
}
