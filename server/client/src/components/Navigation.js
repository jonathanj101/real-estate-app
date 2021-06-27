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
        // console.log(value.currentTarget);
        setValue(newValue);
    };

    const redirectToPage = (e) => {
        e.preventDefault;
        console.log(e);
        // console.log(history);
        const page = e.view.location.pathname;
        console.log(page);
        history.push(`${page}`);
    };

    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <div className={classes.navTabsDiv}>
                    <Tabs value={value} id="tabs" onChange={handleChange} aria-label="simple tabs example">
                        <Tab onClick={(e) => redirectToPage(e)} label="Home" />
                        <Tab onClick={(e) => redirectToPage(e)} label="About" />
                    </Tabs>
                </div>
            </AppBar>
            <BottomNavigation onChange={handleChange}>
                <BottomNavigationAction
                    value="/"
                    onClick={(e) => console.log(e)}
                    className={classes.home}
                    label="home"
                    icon={<Home />}
                />
                <BottomNavigationAction
                    value="about"
                    onClick={(e) => console.log(e.currentTarget.parentElement)}
                    className={classes.home}
                    label="home"
                    icon={<BusinessCenter />}
                />
                {/* <Button value="/about" endIcon onClick={(e) => console.log(e.currentTarget.attributes[3].textContent)}> */}
                {/* <BusinessCenter /> */}
                {/* <BottomNavigationAction
                        // onClick={(e) => redirectToPage(e)}
                        value="about"
                        label="About Us"
                        icon={<BusinessCenter />} */}
                {/* /> */}
                {/* </Button> */}
                {/* <Button value="/" endIcon onClick={(e) => console.log(e.currentTarget.attributes[3].textContent)}> */}
                {/* <Home /> */}
                {/* <BottomNavigationAction
                        // onClick={(e) => redirectToPage(e)}
                        value="about"
                        label="About Us"
                        icon={<BusinessCenter />} */}
                {/* /> */}
                {/* </Button> */}
            </BottomNavigation>
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
    home: {
        color: "red",
    },
});

export default Navigation;
