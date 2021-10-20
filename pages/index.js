import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styles from "../styles/Home.module.css";

const AnyReactComponent = ({ text }) => (
  <div className={styles.marker}>{text}</div>
);

let mapRef;
let locationHistory = [];

export default function Home() {
  const [location, setLoc] = useState({
    lat: 6.9,
    lng: 80.3,
  });
  const [update, setUpdating] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        console.log(position.coords);
        setUpdating(true);
        setLoc({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
        setTimeout(() => {
          setUpdating(false);
        }, 100);
      });
    } else {
      console.log("no geo location");
    }
  }, []);

  useEffect(() => {
    locationHistory.push(location);

    setTimeout(() => {
      const myPath = new mapRef.maps.Polyline({
        path: locationHistory,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 1,
      });

      myPath.setMap(mapRef.map);

    }, 1000);
  }, [location])

  return (
    <div className={styles.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDQoE5Fwwwt2LqvgzGin7YnLrKcDsah92c" }}
        defaultCenter={{
          lat: location.lat,
          lng: location.lng,
        }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef = {map, maps}
        }}
      >
        <AnyReactComponent
          lat={location.lat}
          lng={location.lng}
          text={`${update ? "Updating" : 'here'} (${location.lat}, ${location.lng})`}
        />
      </GoogleMapReact>
    </div>
  );
}
