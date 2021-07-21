import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { BottomNavigation, makeStyles } from "@material-ui/core";
import Loading from "../../LoadingComponent/Loading";
import LocationMarker from "../Location-Marker/LocationMarker";

const GoogleMap = ({ googleApiKey, isLoading }) => {
    const [center, setCenter] = useState({ lat: 59.955413, lng: 30.337844 });
    const [zoom, setZoom] = useState(11);

    console.log(googleApiKey, isLoading);
    const classes = styles();
    return (
        <div className={classes.map}>
            {isLoading ? (
                <Loading />
            ) : (
                <GoogleMapReact bootstrapURLKeys={{ key: googleApiKey }} defaultCenter={center} defaultZoom={zoom}>
                    <LocationMarker lat={center.lat} lng={center.lng} text="my mareker" />
                </GoogleMapReact>
            )}
        </div>
    );
};

const styles = makeStyles({
    map: {
        height: "75vh",
        width: "100vw",
        position: "relative",
    },
});

export default GoogleMap;
