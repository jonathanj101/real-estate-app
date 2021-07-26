import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

const AlertMessage = ({ show, statusCode, responseMessage }) => {
    return (
        <div>
            {show ? (
                <Alert severity={statusCode <= 201 ? "success" : "error"}>
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
