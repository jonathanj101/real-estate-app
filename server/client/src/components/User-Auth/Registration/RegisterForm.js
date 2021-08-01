import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { TextField, makeStyles, Button } from "@material-ui/core";
import AlertMessage from "../../Alert-Message/AlertMessage";

const RegisterForm = ({ handleRegistrationOnMain }) => {
    const [isFirstNameValidated, setIsFirstNameValidated] = useState(false);
    const [isLastNameValidated, setIsLastNameValidated] = useState(false);
    const [isUsernameValidated, setIsUsernameValidated] = useState(false);
    const [isPasswordValidated, setIsPasswordValidated] = useState(false);
    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [statusCode, setStatusCode] = useState();
    const [responseMessage, setResponseMessage] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const classes = styles();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfoError = checkFormValidations(firstName, lastName, username, password, email);
        if (userInfoError) {
            e.stopPropagation();
        } else {
            handleRegistration(firstName, lastName, username, password, email);
        }
    };

    const checkFormValidations = (firstName, lastName, username, password, email) => {
        const isEmailFormat = email.includes("@") && email.includes(".");
        console.log(isEmailFormat);
        if (firstName.length <= 5) {
            setIsFirstNameValidated(true);
            return true;
        } else if (lastName.length <= 5) {
            setIsLastNameValidated(true);
            return true;
        } else if (username.length <= 5) {
            setIsUsernameValidated(true);
            return true;
        } else if (password.length <= 5) {
            setIsPasswordValidated(true);
            return true;
        } else if (!isEmailFormat || email.length <= 5) {
            setIsEmailValidated(true);
            return true;
        } else {
            return false;
        }
    };

    const handleRegistration = async (firstName, lastName, username, password, email) => {
        try {
            const response = await axios.post("api/registration", {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email,
            });
            const userId = response.data.id;
            const message = response.data.message;
            const statusCode = response.data.status;
            setIsAlert(true);
            setStatusCode(statusCode);
            setResponseMessage(message);
            if (statusCode <= 201) {
                localStorage.setItem("userId", JSON.stringify(userId));
                handleRegistrationOnMain(username);
                redirectToHomePage();
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setEmail("");
    };

    const redirectToHomePage = () => {
        setTimeout(() => {
            history.push("/");
            clearForm();
        }, 3000);
    };

    return (
        <div className={classes.mainDiv}>
            <AlertMessage show={isAlert} statusCode={statusCode} responseMessage={responseMessage} />
            <div className="form-container" style={{ width: "25%", height: "50%", margin: "auto" }}>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    className="form"
                    style={{ width: "100%", height: "100%" }}
                    noValidate
                    autoComplete="off"
                >
                    <div className="form-title-div">
                        <h1 className="form-title"> Create An Account</h1>
                    </div>
                    <div className="form-row" style={{ margin: "10px auto" }}>
                        <TextField
                            id="firstName"
                            error={isFirstNameValidated}
                            label="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.currentTarget.value)}
                            helperText={
                                isFirstNameValidated ? "First name should not be an empty and 5 letters long!" : ""
                            }
                            style={{ margin: "10px", fontSize: "2rem" }}
                        />
                        <TextField
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.currentTarget.value)}
                            error={isLastNameValidated}
                            label="Last name"
                            helperText={
                                isLastNameValidated ? "Last name should not be an empty and 5 letters long!" : ""
                            }
                        />
                    </div>
                    <div className="form-row" style={{ margin: "10px auto" }}>
                        <TextField
                            id="email"
                            error={isEmailValidated}
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            label="Email"
                            helperText={isEmailValidated ? "Email should include '@' and '.'!" : ""}
                            type="email"
                        />
                    </div>
                    <div className="form-row" style={{ margin: "10px auto" }}>
                        <TextField
                            style={{ margin: "10px" }}
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.value)}
                            error={isUsernameValidated}
                            label="Username"
                            helperText={isUsernameValidated ? "Username should be more than 5 letters long!" : ""}
                        />
                        <TextField
                            style={{ margin: "10px" }}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            error={isPasswordValidated}
                            label="Password"
                            helperText={isPasswordValidated ? "Password should be more than 5 letters long!" : ""}
                            type="password"
                        />
                    </div>
                    <div className="btn-div" style={{ marginTop: "25px" }}>
                        <Button type="submit" id="btn" style={{ border: "2px solid red" }} variant="outlined">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        width: "100%",
        height: "100%",
        margin: "0 auto 250px auto",
        textAlign: "center",
    },
});

export default RegisterForm;
