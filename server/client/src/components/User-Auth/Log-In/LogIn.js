import React, { useState, useEffect } from "react";
import { Button, TextField, Modal } from "@material-ui/core";

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUsernameValidated, setIsUsernameValidated] = useState("");
    const [isPasswordValidated, setIsPasswordValidated] = useState("");

    return (
        <div style={{ width: "100%", height: "100%", margin: "0 auto 250px auto" }}>
            <Modal open={true} style={{ border: "2px solid black", textAlign: "center" }}>
                <form style={{ width: "10%", margin: "250px auto", border: "2px solid red", backgroundColor: "white" }}>
                    <div>
                        <h2>Sign In</h2>
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
                            id="password"
                            label="Password"
                            error={isPasswordValidated}
                            value={password}
                            helperText={isPasswordValidated ? "Username should not be empty" : ""}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div className="register-option-container" style={{ margin: "0 auto 25px auto" }}>
                        <span>Don't have an account?</span>
                        <a href="/register">Register here!</a>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default LogIn;
