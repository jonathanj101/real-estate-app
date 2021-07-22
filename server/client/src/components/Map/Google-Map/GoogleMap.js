import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core";
import Loading from "../../LoadingComponent/Loading";
import LocationMarker from "../Location-Marker/LocationMarker";

const GoogleMap = ({ googleApiKey, isLoading, latitude, longitude }) => {
    const [center, setCenter] = useState({ lat: latitude, lng: longitude });
    const [zoom, setZoom] = useState(11);

    console.log(googleApiKey, isLoading, latitude, longitude);
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
        height: "100%",
        width: "100%",
        position: "relative",
    },
});

export default GoogleMap;
