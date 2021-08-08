import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Properties from "../components/Properties";
import SearchComponent from "../components/Search/SearchComponent";

function Home({ googleApiKey }) {
    const classes = styles();
    return (
        <div id="home js">
            <SearchComponent />
            <Properties googleApiKey={googleApiKey} />
        </div>
    );
}

const styles = makeStyles({});

export default Home;
