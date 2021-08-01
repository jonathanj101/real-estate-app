import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import UserPage from "./UserPage";
import RegisterForm from "./User-Auth/Registration/RegisterForm";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleApiKey: "",
            isLoading: true,
            userId: "",
            username: "",
            isLogged: false,
        };

        this.handleIsLoading = this.handleIsLoading.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    async componentDidMount() {
        const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
        if (this.state.googleApiKey === "") {
            const response = await axios.get("api/api-key");
            this.setState({
                googleApiKey: response.data.data,
            });
        }
        this.handleIsLoading(this.state.googleApiKey);
        if (localStorageUserId !== null) {
            const response = await axios.put("api/verify-user", {
                userId: localStorageUserId,
            });
            const username = response.data;
            this.setState({
                isLogged: true,
                username: username,
            });
        } else {
            localStorage.clear();
            this.setState({
                isLogged: false,
                username: "",
            });
        }
    }

    handleIsLoading = (googleApiKey) => {
        if (googleApiKey !== "") {
            this.setState({
                isLoading: false,
            });
        }
    };

    handleRegistration = (username) => {
        if (username) {
            this.setState({
                isLogged: true,
            });
        }
    };

    handleLogIn = (userId, username) => {
        if (userId) {
            localStorage.setItem("userId", JSON.stringify(userId));
            this.setState({
                username: username,
                userId: userId,
                isLogged: true,
            });
        }
        return;
    };

    handleLogOut = () => {
        localStorage.clear();
        this.setState({
            isLogged: false,
            username: "",
        });
    };

    render() {
        return (
            <div id=" main js">
                <Navigation
                    isLogged={this.state.isLogged}
                    handleLogIn={this.handleLogIn}
                    handleLogOut={this.handleLogOut}
                />
                <Switch>
                    <Route exact path="/" render={() => <Home googleApiKey={this.state.googleApiKey} />} />
                    <Route exact path="/about" render={() => <About />} />
                    <Route exact path="/account" render={() => <UserPage googleApiKey={this.state.googleApiKey} />} />
                    <Route
                        exact
                        path="/register"
                        render={() => <RegisterForm handleRegistrationOnMain={this.handleRegistration} />}
                    />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
