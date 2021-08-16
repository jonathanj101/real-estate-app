import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import LocationMarker from "../Location-Marker/LocationMarker";
import Loading from "../../LoadingComponent/Loading";
import styles from "./GoogleMapStyles";

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
                <GoogleMapReact bootstrapURLKeys={{ key: googleApiKey }} center={center} zoom={12}>
                    <LocationMarker lat={latitude} lng={longitude} text="my mareker" />
                </GoogleMapReact>
            )}
        </div>
    );
};

export default GoogleMapModal;
