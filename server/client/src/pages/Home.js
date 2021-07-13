import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import Properties from "../components/Properties";
import SearchComponent from "../components/SearchComponent";

function Home() {
    // const [arr, setArr] = useState([]);

    // const fetchingData = () => {
    //     fetch("/testing")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data.data);
    //             setArr(data.data.props);
    //         });
    // };
    const classes = styles();
    return (
        <div id="home js">
            <SearchComponent />
            <Properties />
            {/* <Button onClick={fetchingData}>click here</Button> */}
        </div>
    );
}

const styles = makeStyles({});

export default Home;
