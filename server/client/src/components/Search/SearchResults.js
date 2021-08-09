import React, { useState, useEffect } from "react";
import { FormControl, FormGroup, FormLabel, FormControlLabel, Checkbox } from "@material-ui/core";
import SearchComponent from "./SearchComponent";

const SearchResults = ({ googleApiKey }) => {
    const [isHouses, setIsHouses] = useState(false);
    const [isApartments, setIsApartments] = useState(false);

    const getSearchQuery = (query) => {
        console.log(query);
    };
    const handleChange = (e) => {
        const housesChecked = e.currentTarget.attributes.name.nodeValue === "houses";
        if (housesChecked) {
            setIsHouses(e.currentTarget.checked);
        } else {
            setIsApartments(e.currentTarget.checked);
        }
    };

    return (
        <div>
            <SearchComponent getSearchQuery={getSearchQuery} />
            <div id="container" style={{ border: "3px solid black", width: "100%", height: "1000px", display: "flex" }}>
                <div id="google-map-div" style={{ border: "3px solid red", width: "75%" }}>
                    <div id="filters" style={{ width: "100%", borderBottom: "1px solid grey", height: "50px" }}>
                        <FormControl
                            style={{ width: "50%", display: "flex", justifyContent: "center", margin: "auto" }}
                        >
                            <FormLabel style={{ margin: "auto" }}>Property Type</FormLabel>
                            <FormGroup style={{ margin: "auto", display: "block" }}>
                                <FormControlLabel
                                    control={<Checkbox checked={isHouses} onChange={handleChange} name="houses" />}
                                    label="Houses"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={isApartments} onChange={handleChange} name="apartments" />
                                    }
                                    label="Apartments"
                                />
                            </FormGroup>
                            {/* <FormGroup> */}
                            {/* </FormGroup> */}
                        </FormControl>
                    </div>
                </div>
                <div id="properties-results-container" style={{ border: "3px solid green", width: "50%" }}>
                    <div id="search-results"></div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
