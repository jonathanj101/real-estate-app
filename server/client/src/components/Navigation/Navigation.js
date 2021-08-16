import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, BusinessCenter, AccountBox, Person, Search } from "@material-ui/icons";
import LogIn from "../User-Auth/Log-In/LogIn";
import styles from "./NavigationStyles";

function Navigation({ isLogged, handleLogIn, handleLogOut }) {
    const [value, setValue] = useState("");
    const [show, setShowLogInModal] = useState(false);
    const history = useHistory();
    const classes = styles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const redirectToPage = (e) => {
        const page = e.currentTarget.children[0].children[0].attributes[4].nodeValue;
        history.push(`${page}`);
    };

    const handleClose = () => {
        setShowLogInModal(false);
    };

    return (
        <div id="navigation js">
            <AppBar position="static" className={classes.nav}>
                <LogIn show={show} handleClose={handleClose} handleLogIn={handleLogIn} />
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
                                history.location.pathname == "/search" ? "Mui-selected" : classes.btnNavigationItems
                            }
                            onClick={redirectToPage}
                            label="Search"
                            icon={<Search value="/search" />}
                        />
                        <BottomNavigationAction
                            className={
                                history.location.pathname == "/about" ? "Mui-selected" : classes.btnNavigationItems
                            }
                            onClick={redirectToPage}
                            label="About"
                            icon={<BusinessCenter value="/about" />}
                        />
                        {isLogged ? (
                            <BottomNavigationAction
                                className={
                                    history.location.pathname == "/account"
                                        ? "Mui-selected"
                                        : classes.btnNavigationItems
                                }
                                onClick={redirectToPage}
                                label="Account"
                                icon={<AccountBox value="/account" />}
                            />
                        ) : (
                            <BottomNavigationAction
                                id="log-in-btn"
                                onClick={() => setShowLogInModal(true)}
                                label="Log In"
                                icon={<Person />}
                            />
                        )}
                        {isLogged ? (
                            <BottomNavigationAction onClick={() => handleLogOut()} label="Log Out" icon={<Person />} />
                        ) : (
                            <div></div>
                        )}
                    </BottomNavigation>
                </div>
            </AppBar>
        </div>
    );
}

export default Navigation;
