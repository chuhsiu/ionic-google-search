import { Component ,ViewChild ,ElementRef} from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  formattedAddress = '';
  geoLat: any;
  geoLng: any;

  @ViewChild('mapElement',{static : false}) mapElement :ElementRef;
  
  options={
    types: ['restaurant'],
    componentRestrictions: { country: 'TW' }
  }  
  constructor( public geo:Geolocation) {}
/*
  ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos =>{
        this.geoLat = pos.coords.latitude;
        this.geoLng = pos.coords.longitude;
        console.log(this.geoLat);
        console.log(this.geoLng);
    }).catch(err => console.log(err));
  }*/
  
  ngAfterContentInit(): void {
   
    this.geo.getCurrentPosition().then((resp) =>{
      this.geoLat = resp.coords.latitude;
      this.geoLng = resp.coords.longitude;
      //console.log(this.geoLng);
      //console.log(this.geoLat);
      const location = {lat:this.geoLat,lng:this.geoLng};
      const map = new google.maps.Map(
      this.mapElement.nativeElement,{
        center : location,
        zoom : 14
      });
      const marker = new google.maps.Marker({
        position:location,
        map
      });

  }).catch(err => console.log(err));
  }

  public handleAddressChange(address: any) {
      this.formattedAddress ='地址 : '+ address.formatted_address;
      console.log(address);
  }

}
