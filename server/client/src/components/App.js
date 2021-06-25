import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Main />
            </Router>
        );
    }
}

const appDiv = document.getElementById("app");

render(<App />, appDiv);
