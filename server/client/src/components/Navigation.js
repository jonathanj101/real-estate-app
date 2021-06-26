import React, { useState } from "react";
import { AppBar, Tabs, Tab, Link, Typography, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

function Navigation() {
    const [value, setValue] = useState("");

    const handleChange = (event, newValue) => {
        console.log(`event ${event} & newvalue ${newValue}`);
    };

    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.navBarWidth} position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab href="/" label="Home" />
                    <Tab href="/about" label="About" />
                    <Tab href="/example" label="Example" />
                </Tabs>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            backgroundColor: theme.palette.secondary.main,
        },
        [theme.breakpoints.up("md")]: {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up("lg")]: {
            backgroundColor: red[500],
        },
    },
    navBarWidth: {
        width: "100% !important",
    },
}));

export default Navigation;
