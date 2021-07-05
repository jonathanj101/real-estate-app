import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "../pages/Home";
import About from "../pages/About";

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
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
