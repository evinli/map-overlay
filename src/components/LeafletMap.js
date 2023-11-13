import React, { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-imageoverlay-rotated/Leaflet.ImageOverlay.Rotated'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.js'
import './../App.css'

var defaultGPS = [49.258757, -123.242287]
var defaultZoom = 20
var maxZoom = 21
var latlongRoundTo = 5

const LeafletMap = () => {
  useEffect(() => {
    const map = L.map('map').setView(defaultGPS, defaultZoom)
    L.control.locate().addTo(map);

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="http://www.esri.com/">Esri</a>',
      maxZoom: maxZoom,
    }).addTo(map);

    map.on('click', function (e) {
      const lat = e.latlng.lat;
      const long = e.latlng.lng;
      const popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(`Latitude: ${lat.toFixed(latlongRoundTo)} | Longitude: ${long.toFixed(latlongRoundTo)}`)
        .openOn(map);
    });

    const red_gps = [49.258617694444446, -123.24263055555555];
    const blue_gps = [49.25860086111111, -123.24267594444444];

    const topleft = L.latLng(49.25868283986185, -123.24263336865387);
    const topright = L.latLng(49.25858548588092, -123.24254499362105);
    const bottomleft = L.latLng(49.258633054703665, -123.24276138875041);

    L.imageOverlay.rotated(process.env.PUBLIC_URL + "/output1.png", topleft, topright, bottomleft).addTo(map);

    const blue_icon = new L.Icon({
        iconUrl: process.env.PUBLIC_URL + "/blue_marker.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    const red_icon = new L.Icon({
        iconUrl: process.env.PUBLIC_URL + "/red_marker.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    L.marker(blue_gps, {icon: blue_icon}).addTo(map);
    L.marker(red_gps, {icon: red_icon}).addTo(map);

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

  return <div id="map" className="map-container"></div>;
};

export default LeafletMap;
