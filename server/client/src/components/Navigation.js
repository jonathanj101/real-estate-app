import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, makeStyles, BottomNavigation, BottomNavigationAction, Button } from "@material-ui/core";
import {
    Home,
    BusinessCenter,
    AccountBox,
    AccountBoxOutlined,
    AccountBoxRounded,
    AccountBoxSharp,
} from "@material-ui/icons";

function Navigation() {
    const [value, setValue] = useState("");
    const history = useHistory();

    const handleChange = (event, newValue) => {
        console.log(`event ${event} & newvalue ${newValue}`);
        setValue(newValue);
    };

    const redirectToPage = (e) => {
        const page = e.currentTarget.children[0].children[0].attributes[4].nodeValue;
        history.push(`${page}`);
        fetchingData(page);
    };

    // const fetchingData = (route) => {
    //     console.log(route);
    //     fetch(`${route}`)
    //         .then((resp) => resp.json())
    //         .then((data) => console.log(data));
    // };
    // const fetchingData = (route) => {
    //     console.log(route);
    //     fetch(`${route}`, {
    //         method: "Get",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ something: "post request from react" }),
    //     })
    //         .then((resp) => resp.json())
    //         .then((data) => console.log(data));
    // };

    const classes = styles();
    return (
        <div id="navigation js">
            <AppBar position="static" className={classes.nav}>
                <div className={classes.navTabsDiv}>
                    <BottomNavigation
                        value={value}
                        className={classes.btnNavigation}
                        onChange={handleChange}
                        showLabels
                    >
                        <BottomNavigationAction
                            className={history.location.pathname == "/" ? "Mui-selected" : classes.btnNavigationItems}
                            onClick={redirectToPage}
                            label="Home"
                            icon={<Home value="/" />}
                        />
                        <BottomNavigationAction
                            className={
                                history.location.pathname == "/about" ? "Mui-selected" : classes.btnNavigationItems
                            }
                            onClick={redirectToPage}
                            label="About"
                            icon={<BusinessCenter value="/about" />}
                        />
                        <BottomNavigationAction
                            className={
                                history.location.pathname == "/account" ? "Mui-selected" : classes.btnNavigationItems
                            }
                            onClick={redirectToPage}
                            label="Account"
                            icon={<AccountBox value="/account" />}
                        />
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
        color: "black",
        "&:hover": {
            color: "white",
        },
    },
    nav: {
        backgroundColor: "red",
    },
});

export default Navigation;
