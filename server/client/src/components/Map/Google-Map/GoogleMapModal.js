import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../Location-Marker/LocationMarker";
import Loading from "../../LoadingComponent/Loading";
import axios from "axios";

const GoogleMapModal = ({ latitude, longitude }) => {
    const [center] = useState({ lat: latitude, lng: longitude });
    const [googleApiKey, setGoogleApiKey] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const classes = styles();

    useEffect(() => {
        if (isLoading) {
            fetchGoogleApiKey();
        }
    }, [isLoading]);

    const fetchGoogleApiKey = async () => {
        const response = await axios.get("api/api-key");
        setGoogleApiKey(response.data.data);
        setIsLoading(false);
    };

    return (
        <div className={classes.map}>
            {isLoading ? (
                <Loading />
            ) : (
                <GoogleMapReact bootstrapURLKeys={{ key: googleApiKey }} center={center} zoom={11}>
                    <LocationMarker lat={latitude} lng={longitude} text="my mareker" />
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

export default GoogleMapModal;
