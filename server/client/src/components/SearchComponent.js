import React from "react";
import { FormControl, Input, InputLabel, InputAdornment, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";

function SearchComponent() {
    const classes = styles();
    return (
        <div className={classes.mainDiv}>
            <FormControl className={classes.formControlStyles}>
                <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    }
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
