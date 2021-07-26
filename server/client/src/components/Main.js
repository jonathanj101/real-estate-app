import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import UserPage from "./UserPage";
import RegisterForm from "./User-Auth/Registration/RegisterForm";
import LogIn from "./User-Auth/Log-In/LogIn";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            googleApiKey: "",
            isLoading: true,
        };

        this.handleIsLoading = this.handleIsLoading.bind(this);
    }

    async componentDidMount() {
        // debugger;
        if (this.state.googleApiKey === "") {
            const response = await axios.get("api/api-key");
            this.setState({
                googleApiKey: response.data.data,
            });
        }
        this.handleIsLoading(this.state.googleApiKey);
    }

    handleIsLoading(googleApiKey) {
        if (googleApiKey !== "") {
            this.setState({
                isLoading: false,
            });
        }
    }

    render() {
        return (
            <div id=" main js">
                <Navigation />
                <Switch>
                    <Route exact path="/" render={() => <Home googleApiKey={this.state.googleApiKey} />} />
                    <Route exact path="/about" render={() => <About />} />
                    <Route exact path="/account" render={() => <UserPage />} />
                    <Route exact path="/register" render={() => <RegisterForm />} />
                    <Route exact path="/login" render={() => <LogIn />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
