import React from "react";
import { makeStyles } from "@material-ui/core";
import { HourglassFullTwoTone } from "@material-ui/icons";

const Loading = () => {
    const classes = styles();
    return (
        <div className={classes.iconDiv}>
            <HourglassFullTwoTone className={classes.icon} />
        </div>
    );
};

const styles = makeStyles({
    iconDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    icon: {
        fontSize: "5rem",
    },
});

export default Loading;
