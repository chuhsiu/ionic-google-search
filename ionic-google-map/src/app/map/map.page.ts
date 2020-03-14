import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;
  geoLat: any;
  geoLng: any;

  @ViewChild('mapElement',{static : false}) mapElement :ElementRef;
  constructor(private geo:Geolocation) { }
  
  ngOnInit() {
  }

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

}
