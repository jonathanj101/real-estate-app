import React, { useState } from "react";
import axios from "axios";
import { FormControl, Input, InputAdornment, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchComponent = ({ setPropertiesData, setLatitude, setLongitude }) => {
    const [locationValidation, setLocationValidation] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [searchQueryError, setQueryError] = useState(false);
    const classes = styles();

    const handleSubmit = (e) => {
        // debugger;
        e.preventDefault();
        const isValidated = checkFormValidations(locationValidation);
        if (isValidated) {
            searchRequest(city, state);
            clearForm();
        } else {
            console.log("nope");
        }
    };

    const searchRequest = async (city, state) => {
        const response = await axios.get(`api/search/${city},${state}`);
        // console.log(response.data.props);
        setPropertiesData(response.data.props);
        console.log(response.data.props[0].latitude);
        console.log(response.data.props[0].longitude);
        setLatitude(response.data.props[0].latitude);
        setLongitude(response.data.props[0].longitude);
    };

    const checkFormValidations = (location) => {
        const split = location.split(",")[1];
        if (location.includes(",") && split.length === 2) {
            setQueryError(false);
            return true;
        }
        setQueryError(true);
        return false;
    };

    const clearForm = () => {
        setLocationValidation("");
        setCity("");
        setState("");
    };

    return (
        <div className={classes.mainDiv}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl className={classes.formControlStyles}>
                    <Input
                        id="search-value"
                        placeholder="e.g: New York City, NY"
                        startAdornment={
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        }
                        value={locationValidation}
                        onChange={(e) => {
                            const city = e.currentTarget.value.split(",")[0];
                            const state = e.currentTarget.value.split(",")[1];
                            setLocationValidation(e.currentTarget.value);
                            setCity(city);
                            setState(state);
                        }}
                        error={searchQueryError}
                    />
                </FormControl>
            </form>
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        // backgroundColor: "red",
    },
    formControlStyles: {
        display: "flex",
        justifyContent: "center",
        width: 500,
        margin: "10px auto",
    },
});

export default SearchComponent;
