import React, { useState } from "react";
import { Avatar, makeStyles, IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

const UserPage = () => {
    const [isIconClicked, setIsIconClicked] = useState(false);

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

    const classes = styles();
    return (
        <div className={classes.mainDiv}>
            <div className={classes.container}>
                <div className={classes.userSubCont}>
                    <Avatar className={classes.avatarStyles} src="/broken-image.jpg" />
                    <div className={classes.userInfoDiv}>
                        <p>Full Name</p>
                        <p>Email</p>
                        <p>Location</p>
                    </div>
                </div>
                <div>
                    <IconButton aria-label="add to favorites">
                        <Favorite color="secondary" />
                    </IconButton>
                </div>
                <div>
                    <h1>Saved properties list here</h1>
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
