import React from "react";
import { Icon } from "@material-ui/core";
import { Room } from "@material-ui/icons";
import styles from "./LocationMarkerStyles";

const LocationMarker = () => {
    const classes = styles();
    return (
        <div className="location-marker">
            <Icon>
                <Room className={classes.iconStyles} />
            </Icon>
        </div>
    );
};

export default LocationMarker;
