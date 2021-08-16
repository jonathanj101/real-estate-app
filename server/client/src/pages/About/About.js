import React from "react";
import styles from "./AboutStyles";

function About() {
    const classes = styles();
    return (
        <div className={classes.mainDiv}>
            <div id="title-div" className={classes.titleDiv}>
                <h1 id="title">About</h1>
            </div>
            <div id="summary" className={classes.summaryDiv}>
                <p>
                    The sole purpose of this Web App, was to learn Django Framework with React for the client side and
                    Material UI for layout etc.. I got the chance to explore how M.V.C (Model View Controller) works and
                    recognize it's pattern. Therefore, organizing and separating data into it's own files, optimizing
                    solutions to bugs/errors. In addition, one concept that i had difficulty understanding at first was
                    "Serializers", which in short just serialize Python data into JSON Data. I really enjoyed and had
                    fun how Django handles requests/responses from/to client/server which made easier separating React
                    and API routes as well as enabling CORS (Cross Origin Resource Sharing) to a specific URL. Although
                    at first it took me quite some time to grasp the power Django Framework has to offer and still there
                    are some concepts that i still want to explore and learn. Below you will see the technologies used
                    for this application.
                </p>
                <p>Thank you for visiting the site and taking the time to read the above!</p>
            </div>
            <div id="tech-stacks-div" className={classes.techStacksDiv}>
                <div id="front-end">
                    <div id="stack-title-div" className={classes.stackTitleDiv}>
                        <p id="stack-title" className={classes.stackTitle}>
                            Front End
                        </p>
                    </div>
                    <div id="stacks-div">
                        <ul>
                            <li>HTML/CSS</li>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>React Hooks</li>
                            <li>React Router</li>
                            <li>Material-UI</li>
                            <li>LocalStorage</li>
                        </ul>
                    </div>
                </div>
                <div id="back-end">
                    <div id="stack-title-div" className={classes.stackTitleDiv}>
                        <p id="stack-title" className={classes.stackTitle}>
                            Back End
                        </p>
                    </div>
                    <div id="stacks-div">
                        <ul>
                            <li>Django</li>
                            <li>Django-Rest</li>
                            <li>Django Decorators</li>
                            <li>Django Response</li>
                            <li>Django Views</li>
                            <li>Django Hashers</li>
                            <li>Django Serializers</li>
                            <li>PostgreSQL</li>
                            <li>Requests</li>
                        </ul>
                    </div>
                </div>
                <div id="API">
                    <div id="stack-title-div" className={classes.stackTitleDiv}>
                        <p id="stack-title" className={classes.stackTitle}>
                            API
                        </p>
                    </div>
                    <div id="apis-div">
                        <ul>
                            <li>Zillow API (Real Estate)</li>
                            <li>Google Map API</li>
                            <li>RapidAPI</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
