import React, { useState } from "react";
import { AppBar, Tabs, Tab, Link, Typography, makeStyles } from "@material-ui/core";

function Navigation() {
    const [value, setValue] = useState("");

    const handleChange = (event, newValue) => {
        console.log(`event ${event} & newvalue ${newValue}`);
    };

    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <div className={classes.navTabsDiv}>
                    <Tabs id="tabs" value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab path="/" label="Home" />
                        <Tab path="/about" label="About" />
                    </Tabs>
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
});

export default Navigation;
