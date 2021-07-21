import React from "react";
import { Icon, makeStyles } from "@material-ui/core";
import { LocationOn, Room } from "@material-ui/icons";

const LocationMarker = () => {
    const classes = style();
    return (
        <div className="location-marker">
            <Icon>
                <Room className={classes.iconStyles} />
            </Icon>
        </div>
    );
};

const style = makeStyles({
    iconStyles: {
        color: "red",
        fontSize: "1.5rem",
    },
});

export default LocationMarker;
