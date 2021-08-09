import React, { useState } from "react";
import { FormControl, Input, InputAdornment, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";

function SearchComponent({ getSearchQuery }) {
    const [location, setLocation] = useState("");
    const [searchQueryError, setQueryError] = useState(false);
    const classes = styles();

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidated = checkFormValidations(location);
        if (isValidated) {
            console.log("ok");
            clearForm();
        } else {
            console.log("nope");
        }
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
        setLocation("");
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
                        value={location}
                        onChange={(e) => {
                            setLocation(e.currentTarget.value);
                        }}
                        error={searchQueryError}
                    />
                </FormControl>
            </form>
        </div>
    );
}

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
