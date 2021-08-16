import React from "react";
import { HourglassFullTwoTone } from "@material-ui/icons";
import styles from "./LoadingStyles";

const Loading = () => {
    const classes = styles();
    return (
        <div className={classes.iconDiv}>
            <HourglassFullTwoTone className={classes.icon} />
        </div>
    );
};

export default Loading;
