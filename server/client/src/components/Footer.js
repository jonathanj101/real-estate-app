import React from "react";

import { makeStyles, Button } from "@material-ui/core";
import { LinkedIn, Instagram } from "@material-ui/icons";

function Footer() {
    const classes = styles();
    return (
        <div className={classes.mainDiv}>
            <div className={classes.columnMainDiv}>
                <div className={classes.columnItemsDiv}>
                    <h2 className={classes.columnTitle}>Jonathan Jimenez</h2>
                    <p>A thriled Full Stack Software Developer</p>
                    <div className={classes.copyrightsDiv}>
                        <p>@copyrights</p>
                        <Button
                            className={classes.btnStyles}
                            target="_blank"
                            href="https://www.jonathanjimenez.tech/about"
                        >
                            Jonathan Jimenez
                        </Button>
                    </div>
                </div>
                <div className={classes.columnItemsDiv}>
                    <h2 className={classes.columnTitle}>Contact</h2>
                    <div>
                        <span>
                            <Button
                                className={classes.btnStyles}
                                target="_blank"
                                href="https://www.jonathanjimenez.tech/contact"
                                target="_blank"
                            >
                                Jonathan Jimenez
                            </Button>
                        </span>
                    </div>
                </div>
                <div className={classes.columnItemsDiv}>
                    <h2 className={classes.columnTitle}>Social</h2>
                    <div>
                        <Button target="_blank" href="https://www.linkedin.com/in/jonathan-jimenez101/">
                            <LinkedIn
                                className={classes.iconsStyles}
                                href="https://www.linkedin.com/in/jonathan-jimenez101/"
                            />
                        </Button>
                        <Button target="_blank" href="https://www.instagram.com/_j.jimenez/">
                            <Instagram className={classes.iconsStyles} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = makeStyles({
    mainDiv: {
        backgroundColor: "rgb(102, 102, 102)",
    },
    columnMainDiv: {
        display: "flex",
        color: "white",
        justifyContent: "center",
    },
    columnItemsDiv: {
        marginRight: "100px",
        marginLeft: "100px",
    },
    columnTitle: {
        width: "75%",
        textAlign: "center",
        borderBottom: "5px solid red",
    },
    btnStyles: {
        color: "white",
    },
    copyrightsDiv: {
        display: "flex",
        color: "white",
    },
    iconsStyles: {
        color: "white",
        "&:hover": {
            color: "red",
        },
    },
});

export default Footer;
