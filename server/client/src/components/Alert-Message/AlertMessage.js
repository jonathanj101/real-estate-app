import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import styles from "./AlertStyles";

const AlertMessage = ({ show, statusCode, responseMessage }) => {
    const classes = styles();
    return (
        <div>
            {show ? (
                <Alert className={classes.alertMessageStyles} severity={statusCode <= 201 ? "success" : "error"}>
                    <AlertTitle>{statusCode <= 201 ? "Success!" : "Error!"}</AlertTitle>
                    {responseMessage}
                </Alert>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default AlertMessage;
