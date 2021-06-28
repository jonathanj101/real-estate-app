import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, makeStyles, BottomNavigation, Button } from "@material-ui/core";
import { Home, BusinessCenter } from "@material-ui/icons";

function Navigation() {
    const [value, setValue] = useState("");
    const history = useHistory();

    const handleChange = (event, newValue) => {
        console.log(`event ${event} & newvalue ${newValue}`);
        console.log(value.currentTarget);
        setValue(newValue);
    };

    const redirectToPage = (e) => {
        const page = e.currentTarget.attributes[3].textContent;
        history.push(`${page}`);
    };

    const classes = styles();
    return (
        <div>
            <AppBar position="static" color="secondary">
                <div className={classes.navTabsDiv}>
                    <BottomNavigation className={classes.btnNavigation}>
                        <Button value="/" endIcon onClick={(e) => redirectToPage(e)}>
                            <div className={classes.btnNavigationItems}>
                                <div>
                                    <Home />
                                </div>
                            </div>
                            Home
                        </Button>
                        <Button value="/about" endIcon onClick={(e) => redirectToPage(e)}>
                            <div className={classes.btnNavigationItems}>
                                <div>
                                    <BusinessCenter />
                                </div>
                                About us
                            </div>
                        </Button>
                    </BottomNavigation>
                </div>
            </AppBar>
        </div>
    );
}

const styles = makeStyles({
    navTabsDiv: {
        display: "flex",
        justifyContent: "center",
    },
    linkStyles: {
        border: "0",
        cursor: "pointer",
        margin: "0",
        borderRadius: "0",
        backgroundColor: "transparent",
        cursor: "pointer",
    },
    btnNavigation: {
        backgroundColor: "inherit",
    },
    btnNavigationItems: {
        display: "flex",
        alignItems: "center",
    },
});

export default Navigation;
