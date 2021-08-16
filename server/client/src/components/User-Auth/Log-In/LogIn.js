import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, TextField, Modal } from "@material-ui/core";
import AlertMessage from "../../Alert-Message/AlertMessage";
import styles from "./LogInStyles";

const LogIn = ({ show, handleClose, handleLogIn }) => {
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
            handleClose();
            clearForm();
        }, 3000);
    };

    const handleLogInRequest = async (username, password) => {
        const response = await axios.put("api/log-in", {
            username: username,
            password: password,
        });
        const userId = response.data.user_id;
        const message = response.data.message;
        const statusCode = response.data.status;
        setShowAlert(true);
        setResponseMessage(message);
        setStatusCode(statusCode);
        if (statusCode <= 201) {
            handleLogIn(userId, username);
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
            <Modal id="login-modal" open={show} onClose={handleClose} className={classes.modalStyles}>
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

export default LogIn;
