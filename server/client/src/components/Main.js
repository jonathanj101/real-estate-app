import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import Navigation from "./Navigation";
import About from "./About";
import Example from "./Example";

function Main() {
    return (
        <div>
            <Navigation />
            <Switch>
                <Route exact path="/">
                    <h1>Home</h1>
                </Route>
                <Route exact path="/about" component={() => <About />}></Route>
                <Route exact path="/example" component={() => <Example />}></Route>
            </Switch>
        </div>
    );
}

export default Main;
