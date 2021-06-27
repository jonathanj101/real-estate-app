import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AppBar, Tabs, Tab, Typography, makeStyles, BottomNavigation, Button } from "@material-ui/core";

function Navigation() {
    const [value, setValue] = useState("");

    const handleChange = (event, newValue) => {
        console.log(`event ${event} & newvalue ${newValue}`);
        setValue(newValue);
    };

    const preventDefault = (e) => {
        console.log(e);
        // e.preventDefault();
        console.log("prevented reload");
    };

    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <div className={classes.navTabsDiv}>
                    <Tabs
                        value={value}
                        id="tabs"
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                    >
                        <Tab label="Home" to="/home" />
                        <Tab onClick={preventDefault} label="About" />
                        <Button onClick={preventDefault}>About</Button>
                        <Link onClick={preventDefault} to="/about">
                            about
                        </Link>
                    </Tabs>
                    {/* <BottomNavigation value={value} onChange={handleChange} className={classes.root}> */}
                    {/* <Link to="/about">About</Link> */}
                    {/* </BottomNavigation> */}
                    {/* <Tabs>
                        <Link className={classes.linkStyles} href="/" label="Home">
                            Home
                        </Link>
                        <Link href="/about" label="About">
                            About
                        </Link>
                    </Tabs> */}
                    {/* <Tabs id="tabs" value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab href="/" label="Home" />
                        <Tab href="/about" label="About" />
                        <Tab href="/example" label="Example" />
                    </Tabs> */}
                </div>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles({
    navTabsDiv: {
        display: "flex",
        justifyContent: "space-around",
    },
    linkStyles: {
        border: "0",
        cursor: "pointer",
        margin: "0",
        borderRadius: "0",
        backgroundColor: "transparent",
        cursor: "pointer",
    },
});

export default Navigation;
