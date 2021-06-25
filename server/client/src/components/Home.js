import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import About from "./About";
import Example from "./Example";

function Home() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <h1>Home</h1>
                </Route>
                <Route exact path="/about" component={() => <About />}></Route>
                <Route exact path="/example" component={() => <Example />}></Route>
            </Switch>
        </Router>
    );
}

export default Home;
