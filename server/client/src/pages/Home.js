import React from "react";
import Properties from "../components/Properties";

function Home({ googleApiKey }) {
    return (
        <div id="home js">
            <Properties googleApiKey={googleApiKey} />
        </div>
    );
}

export default Home;
