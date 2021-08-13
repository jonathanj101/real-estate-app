import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core";
import Loading from "../../LoadingComponent/Loading";
import LocationMarker from "../Location-Marker/LocationMarker";

const GoogleMap = ({ propertiesData, latitude, longitude }) => {
    let [center, setCenter] = useState({ lat: 40.718848, lng: -73.862117 });
    const [lat, setLat] = useState(40.718848);
    const [long, setLong] = useState(-73.862117);
    const [zoom, setZoom] = useState(11);
    const [propertyDataNotEmpty, setPropertyDataNotEmpty] = useState(true);
    const [googleApiKey, setGoogleApiKey] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const classes = styles();
    console.log(propertiesData, latitude, longitude);

    useEffect(() => {
        debugger;
        if (propertiesData !== undefined && propertiesData.length !== 0) {
            setPropertyDataNotEmpty(true);
            setLat(propertiesData[0].latitude);
            setLong(propertiesData[0].longitude);
        } else {
            setLat(latitude);
            setLong(longitude);
        }
        // if (propertiesData === undefined) {
        //     setPropertyDataNotEmpty(true);
        // } else if (propertiesData.length !== 0) {
        //     setPropertyDataNotEmpty(false);
        //     setLat(propertiesData[0].latitude);
        //     setLong(propertiesData[0].longitude);
        // } else {
        //     return;
        // }
    }, [propertiesData]);

    useEffect(() => {
        if (googleApiKey === "") {
            fetchApi();
        }
    }, [googleApiKey]);

    const idk = () => {
        debugger;
        if (propertyDataNotEmpty && propertiesData !== undefined && propertiesData !== 0) {
            const markers = propertiesData.map((prop) => {
                return <LocationMarker lat={prop.latitude} lng={prop.longitude} />;
            });
            return markers;
        }
    };

    // const markers = propertiesData.map((prop) => {
    //     return <LocationMarker lat={prop.latitude} lng={prop.longitude} />;
    // });
    // const Markers = () => {
    //     return propertiesData.map((prop) => {
    //         // testing multiple properties to display
    //         // console.log(prop);
    //         return <LocationMarker lat={prop.latitude} lng={prop.longitude} />;
    //     });
    // };

    // const Markers = () => {
    //     debugger;
    //     if (propertyDataNotEmpty && propertiesData !== undefined && propertiesData !== 0) {
    //         const marker = propertiesData.map((prop) => {
    //             console.log(prop.latitude, prop.longitude);
    //             return <LocationMarker lat={prop.latitude} lng={prop.longitude} />;
    //         });
    //         return marker;
    //     } else {
    //         return;
    //     }
    // };

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
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleApiKey }}
                    center={
                        propertiesData !== undefined && propertiesData.length !== 0
                            ? (center = { lat: propertiesData[0].latitude, lng: propertiesData[0].longitude })
                            : center
                    }
                    zoom={zoom}
                >
                    {propertiesData !== undefined && propertiesData.length !== 0 ? (
                        // <Markers />
                        idk()
                    ) : (
                        <LocationMarker
                            lat={latitude === "" ? center.lat : latitude}
                            lng={longitude === "" ? center.lng : longitude}
                            text="my mareker"
                        />
                    )}
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
