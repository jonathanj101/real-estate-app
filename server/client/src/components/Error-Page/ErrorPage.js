import React from "react";
import { Button } from "@material-ui/core";

const ErrorPage = () => {
    return (
        <div style={{ height: "1000px" }} id="error-page-div">
            <div style={{ height: "inherit", textAlign: "center" }} id="error-page-contents">
                <div>
                    <h1>404 Page not found</h1>
                </div>
                <div>
                    <p>The page you're trying to reach is not recognizable.</p>
                    <p>Please click on the button below to take you back to main page</p>
                </div>
                <Button
                    id="error-page-btn"
                    style={{
                        border: "2px solid red",
                        color: "red",
                    }}
                    href="/"
                >
                    Home
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
