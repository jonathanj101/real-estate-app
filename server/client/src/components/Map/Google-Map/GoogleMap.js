import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core";
import Loading from "../../LoadingComponent/Loading";
import LocationMarker from "../Location-Marker/LocationMarker";

const GoogleMap = ({ latitude, longitude }) => {
    const [center, setCenter] = useState({ lat: latitude, lng: longitude });
    const [zoom, setZoom] = useState(11);
    const [googleApiKey, setGoogleApiKey] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const classes = styles();

    // const [locations] = useState([
    //     { longitude: -73.862117, latitude: 40.816562 },
    //     {
    //         longitude: -73.772164,
    //         latitude: 40.718848,
    //     },
    // ]);

    // const markers = locations.map((prop) => {
    // testing multiple properties to display
    //     console.log(prop);
    //     return <LocationMarker lat={prop.latitude} lng={prop.longitude} />;
    // });

    useEffect(() => {
        if (googleApiKey === "") {
            fetchApi();
        }
    }, [googleApiKey]);

    const fetchApi = async () => {
        const response = await axios.get("api/api-key");
        setGoogleApiKey(response.data.data);
        setIsLoading(false);
    };

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
