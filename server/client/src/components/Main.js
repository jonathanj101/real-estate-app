import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import UserPage from "./UserPage";
import GoogleMap from "./Map/Google-Map/GoogleMap";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id=" main js">
                <Navigation />
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/about" render={() => <About />} />
                    <Route exact path="/account" render={() => <UserPage />} />
                    <Route exact path="/map" render={() => <GoogleMap />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
