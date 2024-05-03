import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMapsModule,RouterModule],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.css'
})
export class GoogleMapComponent {
  center: google.maps.LatLngLiteral = {lat: -34.397, lng: 150.644};
  zoom: number = 8;
  mapOptions: google.maps.MapOptions = {
    // 地图选项
    mapTypeId: 'roadmap', // 可以是 'roadmap', 'satellite', 'hybrid', 'terrain'
    scrollwheel: true,
    disableDoubleClickZoom: false,
    // 其他Google Maps选项...
  };
  markerIcon = {
    url: '/assets/locationArrow.png',
    scaledSize: new google.maps.Size(30, 30),
  };
}
