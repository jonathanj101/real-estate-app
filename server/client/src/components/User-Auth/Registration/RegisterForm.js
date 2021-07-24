import React, { useState } from "react";
import axios from "axios";
import { TextField, makeStyles, Button } from "@material-ui/core";

const RegisterForm = () => {
    const [isError, setIsError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const classes = styles();

    // const handleSubmit = (e) => {};

    const handleRegistration = async (firstName, lastName, username, password, email) => {
        // try {
        //     const response = await axios.post("api/registration", {
        //         firstName: firstName,
        //         lastName: lastName,
        //         username: username,
        //         password: password,
        //         email: email
        //     })
        //     const userId = response.data[0]
        // } catch (error) {
        //     console.log(error)
        // }
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setEmail("");
    };

    const redirectToHomePage = () => {
        // code to redirect user to home page
    };

    return (
        <div className={classes.mainDiv}>
            <div className="form-container" style={{ width: "25%", height: "50%", margin: "auto" }}>
                <form
                    // onSubmit={(e) => handleSubmit(e)}
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
                            error={isError}
                            label="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.currentTarget.textContent)}
                            helperText={isError ? "Incorrect entry." : ""}
                            style={{ margin: "10px", fontSize: "2rem" }}
                        />
                        <TextField
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.currentTarget.textContent)}
                            error={isError}
                            label="Last name"
                            helperText={isError ? "Incorrect entry." : ""}
                        />
                    </div>
                    <div className="form-row" style={{ margin: "10px auto" }}>
                        <TextField
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.textContent)}
                            label="Email"
                            helperText={isError ? "Incorrect entry." : ""}
                            type="email"
                        />
                    </div>
                    <div className="form-row" style={{ margin: "10px auto" }}>
                        <TextField
                            style={{ margin: "10px" }}
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.currentTarget.textContent)}
                            error={isError}
                            label="Username"
                            helperText={isError ? "Incorrect entry." : ""}
                        />
                        <TextField
                            style={{ margin: "10px" }}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.textContent)}
                            error={isError}
                            label="Password"
                            helperText={isError ? "Incorrect entry." : ""}
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
        margin: "250px auto",
        textAlign: "center",
    },
});

export default RegisterForm;
