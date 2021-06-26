import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "../pages/Home";
import About from "../pages/About";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navigation />
                <Router>
                    <Switch>
                        <Route exact path="/" component={() => <Home />} />
                        <Route exact path="/about" component={() => <About />} />
                    </Switch>
                </Router>
                <Footer />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");

render(<App />, appDiv);
