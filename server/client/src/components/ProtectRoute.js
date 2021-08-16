import React from "react";
import { Redirect } from "react-router";

const ProtectRoute = ({ component: Component, isUserAuthenticated }) => {
    console.log(Component, isUserAuthenticated);
    return isUserAuthenticated ? <Component /> : <Redirect to={{ pathname: "/page-not-found" }} />;
};

export default ProtectRoute;
