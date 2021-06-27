import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    makeStyles,
    BottomNavigation,
    Button,
    BottomNavigationAction,
} from "@material-ui/core";
import { Home, BusinessCenter } from "@material-ui/icons";

function Navigation() {
    const [value, setValue] = useState("");
    const [home, setHome] = useState("home");
    const history = useHistory();

    const handleChange = (event, newValue) => {
        console.log(`event ${event} & newvalue ${newValue}`);
        console.log(value.currentTarget);
        setValue(newValue);
    };

    const redirectToPage = (e) => {
        // e.preventDefault;
        const page = e.currentTarget.attributes[3].textContent;
        console.log(page);
        history.push(`${page}`);
    };

    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <div onChange={handleChange} className={classes.navTabsDiv}>
                    <BottomNavigation>
                        <Button value="/" endIcon onClick={(e) => redirectToPage(e)}>
                            <Home />
                        </Button>
                    </BottomNavigation>
                    <Button
                        value="/about"
                        endIcon
                        onClick={(e) => console.log(e.currentTarget.attributes[3].textContent)}
                    >
                        <BusinessCenter />
                    </Button>
                </div>
            </AppBar>
        </div>
    );
}

const useStyles = makeStyles({
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
    home: {
        color: "red",
    },
});

export default Navigation;
