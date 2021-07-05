import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main";

function App() {
    return (
        <BrowserRouter>
            <div id="app js">
                <Main />
            </div>
        </BrowserRouter>
    );
}
const appDiv = document.getElementById("app");

render(<App />, appDiv);
