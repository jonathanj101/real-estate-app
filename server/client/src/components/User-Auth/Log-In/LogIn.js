import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, TextField, Modal, makeStyles } from "@material-ui/core";
import AlertMessage from "../../Alert-Message/AlertMessage";

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameValidated, setIsUsernameValidated] = useState(false);
    const [isPasswordValidated, setIsPasswordValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [statusCode, setStatusCode] = useState();
    const history = useHistory();
    const classes = styles();

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        const checkValidations = checkFormValidations(username, password);
        if (checkValidations) {
            e.stopPropagation();
        } else {
            handleLogInRequest(username, password);
        }
    };

    const checkFormValidations = (username, password) => {
        if (username.length <= 5) {
            setIsUsernameValidated(true);
            return true;
        } else if (password.length <= 5) {
            setIsPasswordValidated(true);
            return true;
        } else {
            return false;
        }
    };

    const redirectToHomePage = () => {
        setTimeout(() => {
            history.push("/");
            clearForm();
        }, 3000);
    };

    const handleLogInRequest = async (username, password) => {
        debugger;
        console.log(username, password);
        const response = await axios.put("api/log-in", {
            username: username,
            password: password,
        });
        console.log(response);
        const userId = response.data.user_id;
        const message = response.data.message;
        const statusCode = response.data.status;
        setShowAlert(true);
        setResponseMessage(message);
        setStatusCode(statusCode);
        if (statusCode <= 201) {
            localStorage.setItem("id", JSON.stringify(userId));
            redirectToHomePage();
        } else {
            return;
        }
    };

    const clearForm = () => {
        setUsername("");
        setPassword("");
    };

    return (
        <div className={classes.mainDiv}>
            <Modal id="login-modal" open={true} className={classes.modalStyles}>
                <div className={classes.formDiv}>
                    <form onSubmit={(e) => handleSubmit(e)} className={classes.formStyles}>
                        <AlertMessage show={showAlert} statusCode={statusCode} responseMessage={responseMessage} />
                        <div className={classes.formTitleDiv}>
                            <p className={classes.formTitle}>Sign In</p>
                        </div>
                        <div className="form-row">
                            <TextField
                                style={{ margin: "25px auto" }}
                                id="username"
                                label="Username"
                                error={isUsernameValidated}
                                value={username}
                                helperText={isUsernameValidated ? "Username should not be empty" : ""}
                                onChange={(e) => setUsername(e.currentTarget.value)}
                            />
                        </div>
                        <div className="form-row">
                            <TextField
                                style={{ margin: "25px auto" }}
                                type="password"
                                id="password"
                                label="Password"
                                error={isPasswordValidated}
                                value={password}
                                helperText={isPasswordValidated ? "Username should not be empty" : ""}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                        </div>
                        <div>
                            <Button type="submit" className={classes.btnStyles} variant="outlined">
                                Log In
                            </Button>
                        </div>
                        <div className={classes.registerOptDiv}>
                            <span>Don't have an account?</span>
                            <a href="/register">Register here!</a>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        width: "100%",
        height: "100%",
        margin: "0 auto 250px auto",
    },
    formDiv: {
        width: "25%",
        height: "30%",
        margin: "250px auto",
        borderRadius: "rgb(179 178 178) 18px 8px 32px",
    },
    modalStyles: {
        border: "2px solid black",
        textAlign: "center",
    },
    formStyles: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    formTitleDiv: {
        width: "15%",
        margin: "auto",
    },
    formTitle: {
        fontSize: "2rem",
        borderBottom: "5px solid red",
    },
    btnStyles: {
        color: "red",
        border: "1px solid red",
        width: "25%",
        "&:hover": {
            backgroundColor: "red",
            color: "white",
        },
    },
    registerOptDiv: {
        margin: "25px auto 0 auto",
    },
});

export default LogIn;
