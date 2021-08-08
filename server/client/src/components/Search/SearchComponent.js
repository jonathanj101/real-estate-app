import React, { useState } from "react";
import { FormControl, Input, InputAdornment, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";

function SearchComponent() {
    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const classes = styles();

    const handleSubmit = () => {};

    return (
        <div className={classes.mainDiv}>
            <FormControl className={classes.formControlStyles}>
                <Input
                    id="search-value"
                    placeholder="e.g: New York City, NY - House"
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }
                    value={location}
                    onChange={(e) => {
                        const includesDash = e.currentTarget.value.includes("-");
                        setLocation(e.currentTarget.value);
                        if (includesDash) {
                            const split = e.currentTarget.value.split("-")[1];
                            setPropertyType(split);
                        }
                    }}
                />
            </FormControl>
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
