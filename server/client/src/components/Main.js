import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import Home from "../pages/Home";
import About from "../pages/About/About";
import UserPage from "./User-Page/UserPage";
import RegisterForm from "./User-Auth/Registration/RegisterForm";
import SearchResults from "./Search/Search-Results/SearchResults";
import ErrorPage from "./Error-Page/ErrorPage";
import ProtectRoute from "./ProtectRoute";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            username: "",
            isLogged: false,
        };
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    }

    async componentDidMount() {
        // debugger;
        const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
        if (localStorageUserId !== null) {
            const response = await axios.put("api/verify-user", {
                userId: localStorageUserId,
            });
            if (response.data.status <= 201) {
                const username = response.data.username;
                this.setState({
                    isLogged: true,
                    username: username,
                });
                console.log(this.state.isLogged);
                // this.isUserAuthenticated();
            } else {
                localStorage.clear();
                this.setState({
                    isLogged: false,
                });
            }
        } else {
            localStorage.clear();
            this.setState({
                isLogged: false,
                username: "",
            });
        }
    }

    isUserAuthenticated = (isLogged) => {
        // debugger;
        // const isLogged = this.state.isLogged;
        if (isLogged) {
            console.log("both are true");
            return true;
        } else {
            console.log(isLogged);
            return false;
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
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/about" render={() => <About />} />
                    <ProtectRoute
                        exact
                        path="/account"
                        // isUserAuthenticated={this.state.isLogged}
                        isUserAuthenticated={this.isUserAuthenticated(this.state.isLogged)}
                        component={() => <UserPage />}
                    />
                    <Route
                        exact
                        path="/register"
                        render={() => <RegisterForm handleRegistrationOnMain={this.handleRegistration} />}
                    />
                    <Route exact path="/search" render={() => <SearchResults />} />
                    <Route exact path="*" render={() => <ErrorPage />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
