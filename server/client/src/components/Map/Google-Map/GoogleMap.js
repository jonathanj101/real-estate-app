import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core";
import Loading from "../../LoadingComponent/Loading";
import LocationMarker from "../Location-Marker/LocationMarker";

const GoogleMap = ({ propertiesData }) => {
    const [center] = useState({ lat: 40.718848, lng: -73.862117 });
    const [googleApiKey, setGoogleApiKey] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const classes = styles();

    useEffect(() => {
        if (googleApiKey === "") {
            fetchGoogleApiKey();
        }
    }, [googleApiKey]);

    const fetchGoogleApiKey = async () => {
        const response = await axios.get("api/api-key");
        setGoogleApiKey(response.data.data);
        setIsLoading(false);
    };

    const mapPropertiesData = () => {
        return propertiesData.map((prop) => {
            return <LocationMarker lat={prop.latitude} lng={prop.longitude} />;
        });
    };

    const markers =
        propertiesData !== undefined && propertiesData.length !== 0 ? (
            mapPropertiesData()
        ) : (
            <LocationMarker lat={center.lat} lng={center.lng} />
        );

    return (
        <div className={classes.map}>
            {isLoading ? (
                <Loading />
            ) : (
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleApiKey }}
                    center={{
                        lat:
                            propertiesData !== undefined && propertiesData.length !== 0
                                ? propertiesData[0].latitude
                                : center.lat,
                        lng:
                            propertiesData !== undefined && propertiesData.length !== 0
                                ? propertiesData[0].longitude
                                : center.lng,
                    }}
                    zoom={10}
                >
                    {markers}
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
