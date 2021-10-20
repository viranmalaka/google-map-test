import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styles from "../styles/Home.module.css";

const AnyReactComponent = ({ text }) => (
  <div className={styles.marker}>{text}</div>
);

export default function Home() {
  const [location, setLoc] = useState({
    lat: 6.7,
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
        }, 1000);
      });
    } else {
      console.log("no geo location");
    }
  }, []);

  return (
    <div className={styles.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDQoE5Fwwwt2LqvgzGin7YnLrKcDsah92c" }}
        defaultCenter={{
          lat: location.lat,
          lng: location.lng,
        }}
        defaultZoom={11}
      >
        <AnyReactComponent
          lat={location.lat}
          lng={location.lng}
          text={update ? "Updating" : `Here (${location.lat}, ${location.lng})`}
        />
      </GoogleMapReact>
    </div>
  );
}
