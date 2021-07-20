import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { BottomNavigation, makeStyles } from "@material-ui/core";
import Loading from "../../LoadingComponent/Loading";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = () => {
    const [center, setCenter] = useState({ lat: 59.955413, lng: 30.337844 });
    const [zoom, setZoom] = useState(11);
    const [googleApiKey, setGoogleApiKey] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const classes = styles();

    useEffect(() => {
        debugger;
        // if (isLoading) {
        const fetchAPIKey = async () => {
            setIsLoading(false);
            const response = await fetch("api/api-key");
            const { data } = await response.json();
            console.log(data);
            setGoogleApiKey(googleApiKey);
        };
        fetchAPIKey();
        // console.log(fetchAPIKey());
        // } else {
        //     console.log("not yet");
        //     return;
        // }
        // debugger;
        // if (isLoading) {
        //     setIsLoading(true);
        //     fetchAPIKey();
        //     //     console.log(googleApiKey);
        // } else {
        //     // setIsLoading(false);
        //     //     console.log(googleApiKey);
        // }
    });

    // const fetchAPIKey = async () => {
    //     // setIsLoading(false);
    //     const response = await axios.get("api/api-key");
    //     const apikey = response.data.data;
    //     console.log(apikey);
    //     // setIsLoading(false);
    //     setGoogleApiKey(apikey);
    //     // setGoogleApiKey(apikey)
    //     // fetch("api/api-key")
    //     //     .then((response) => response.json())
    //     //     .then((data) => {
    //     //         console.log(data);
    //     //         setGoogleApiKey(data.data);
    //     //     });
    //     // console.log(googleApiKey);
    // };

    return (
        <div className={classes.map}>
            {/* {isLoading ? (
                <Loading />
            ) : ( */}

            <GoogleMapReact bootstrapURLKeys={{ key: googleApiKey }} defaultCenter={center} defaultZoom={zoom}>
                {/* <AnyReactComponent
                        // style={{ fontSize: "50rem", height: "250px", width: "250px" }}
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    /> */}
            </GoogleMapReact>
            {/* )} */}
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
