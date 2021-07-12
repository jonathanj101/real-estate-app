import React, { useState } from "react";
import {
    Avatar,
    makeStyles,
    IconButton,
    Collapse,
    CardActions,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core";
import { Favorite, ExpandMore } from "@material-ui/icons";

const UserPage = () => {
    const [isIconClicked, setIsIconClicked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleIconOnClick = (e) => {
        console.log(e);
        if (!isIconClicked) {
            e.currentTarget.children[0].style.color = "red";
            setIsIconClicked(true);
        } else {
            e.currentTarget.children[0].style.color = "rgba(0, 0, 0, 0.54)";
            setIsIconClicked(false);
        }
    };

    const toggle = (e) => {
        setExpanded(!expanded);
        handleIconOnClick(e);
    };

    const classes = styles();
    return (
        <div className={classes.mainDiv}>
            <div className={classes.container}>
                <div className={classes.userSubCont}>
                    <Avatar className={classes.avatarStyles} src="/broken-image.jpg" />
                    <div className={classes.userInfoDiv}>
                        <div>
                            <p>Full Name </p>
                        </div>
                        <div>
                            <p>Email</p>
                        </div>
                        <div>
                            <p>Location</p>
                        </div>
                    </div>
                </div>
                <div>
                    <CardActions>
                        <h1>Saved Properties</h1>
                        <IconButton aria-label="show more" aria-expanded={expanded} onClick={toggle}>
                            <Favorite />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded}>
                        <h1>expanded</h1>
                    </Collapse>
                </div>
            </div>
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        height: "1000px",
        border: "2px solid green",
    },
    container: {
        width: "100%",
        height: "inherit",
        border: "2px solid blue",
    },
    userSubCont: {
        display: "flex",
        border: "2px solid black",
    },
    userInfoDiv: {
        width: "50%",
        border: "2px solid black",
        fontSize: " 2rem",
    },
    avatarStyles: {
        width: "250px",
        height: "250px",
    },
});

export default UserPage;
