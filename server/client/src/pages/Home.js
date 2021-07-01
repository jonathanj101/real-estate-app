import React from "react";
import { makeStyles } from "@material-ui/core";
import Cards from "../components/Cards";
import SearchComponent from "../components/SearchComponent";

function Home() {
    return (
        <div>
            <SearchComponent />
            <Cards />
        </div>
    );
}

// const styles = makeStyles({});

export default Home;
