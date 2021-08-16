import React from "react";
import { Button } from "@material-ui/core";
import { LinkedIn, Instagram } from "@material-ui/icons";
import styles from "./FooterStyles";

function Footer() {
    const classes = styles();
    return (
        <div id="footer js" className={classes.mainDiv}>
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

export default Footer;
