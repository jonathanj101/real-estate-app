import React, { useState, useEffect } from "react";
import {
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Button,
    makeStyles,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import SearchComponent from "./SearchComponent";
import GoogleMap from "../Map/Google-Map/GoogleMap";
import PropertyModal from "../PropertyModal";
import axios from "axios";

const SearchResults = () => {
    const [isHouses, setIsHouses] = useState(false);
    const [isApartments, setIsApartments] = useState(false);
    const [propertiesData, setPropertiesData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [address, setAddress] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [livingArea, setLivingArea] = useState("");
    const [lotAreaUnit, setLotAreaUnit] = useState("");
    const [lotAreaValue, setLotAreaValue] = useState("");
    const [price, setPrice] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [viewTourUrl, setViewTourUrl] = useState("");
    const [isMoreInfoClicked, setIsMoreInfoClicked] = useState(false);
    const [zpid, setZpid] = useState("");
    const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
    const classes = styles();

    const handleChange = (e) => {
        const housesChecked = e.currentTarget.attributes.name.nodeValue === "houses";
        if (housesChecked) {
            setIsHouses(e.currentTarget.checked);
        } else {
            setIsApartments(e.currentTarget.checked);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(!openModal);
    };

    useEffect(() => {
        if (isMoreInfoClicked) {
            fetchViewTourUrl(zpid);
            setIsMoreInfoClicked(false);
        } else {
            return;
        }
    }, [isMoreInfoClicked]);

    const fetchViewTourUrl = async (zpid) => {
        const response = await axios.post("api/test_virtual", {
            zpid: zpid,
        });
        setViewTourUrl(response.data.data);
    };

    const addProperty = async (
        e,
        address,
        bathrooms,
        bedrooms,
        image,
        lotAreaUnit,
        lotAreaValue,
        latitude,
        longitude,
        cost,
        propertyType,
        zpid,
        livingArea
    ) => {
        const heartIconOriginalColor = "rgba(0, 0, 0, 0.54)";
        let heartIcon = e.currentTarget.children[0].style;

        const response = await axios.post("api/add_property", {
            userId: localStorageUserId,
            address: address,
            bathrooms: bathrooms,
            bedrooms: bedrooms,
            cost: cost,
            image: image,
            livingArea: livingArea,
            lotAreaUnit: lotAreaUnit,
            lotAreaUnitValue: lotAreaValue,
            latitude: latitude,
            longitude: longitude,
            propertyType: propertyType,
            zpid: zpid,
        });
        const statusCode = response.data;

        if (statusCode <= 201) {
            heartIcon.color = "red";
            alert("Property saved!");
        } else {
            heartIcon.color = heartIconOriginalColor;
            alert("You already have this property saved!");
        }
    };
    const handleSubmit = (
        e,
        address,
        bathrooms,
        bedrooms,
        image,
        lotAreaUnit,
        lotAreaValue,
        latitude,
        longitude,
        price,
        property_type,
        zpid,
        livingArea
    ) => {
        const heartIconOriginalColor = "rgba(0, 0, 0, 0.54)";
        let heartIcon = e.currentTarget.children[0].style;

        if (heartIcon.color === "" || heartIcon.color === heartIconOriginalColor) {
            addProperty(
                e,
                address,
                bathrooms,
                bedrooms,
                image,
                lotAreaUnit,
                lotAreaValue,
                latitude,
                longitude,
                price,
                property_type,
                zpid,
                livingArea
            );
        }
    };

    const updateStateForModal = (
        address,
        bathrooms,
        bedrooms,
        image,
        lotAreaUnit,
        lotAreaValue,
        property_type,
        price,
        zpid,
        latitude,
        longitude,
        livingArea
    ) => {
        console.log(zpid);
        setOpenModal(true);
        // setAddress(address);
        // setBathrooms(bathrooms);
        // setBedrooms(bedrooms);
        // setLivingArea(livingArea);
        // setLotAreaUnit(lotAreaUnit);
        // setLotAreaValue(lotAreaValue);
        // setPropertyType(property_type);
        // setViewTourUrl("ok");
        // setPrice(price);
        // setZpid(zpid);
        // setLatitude(latitude);
        // setLongitude(longitude);
    };

    const propertiesDataComponent = propertiesData.map((property, num) => {
        return (
            <Card key={num} className={classes.cardStyles}>
                <CardMedia className={classes.image} image={property.imgSrc} />
                <CardContent className={classes.cardContentStyles}>
                    <div className={classes.cardContentChild}>
                        <div style={{ display: "flex" }}>
                            <h2>$</h2>
                            <h2>{property.price} </h2>
                        </div>
                        <div>
                            <span>{property.address}</span>
                        </div>
                    </div>
                    <div style={{ fontSize: "1rem" }}>
                        <div>
                            <span style={{ marginRight: "5px" }}>{property.bedrooms}</span>
                            <span>bd</span>
                        </div>
                        <div>
                            <span style={{ marginRight: "5px" }}>{property.bathrooms}</span>
                            <span>ba</span>
                        </div>
                        <div>
                            <span>{property.property_type}</span>
                        </div>
                        <div>
                            <span style={{ marginRight: "5px" }}>{property.lotAreaValue}</span>
                            <span>{property.lotAreaUnit}</span>
                        </div>
                    </div>
                </CardContent>
                <CardActions>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={(e) => {
                            handleSubmit(
                                e,
                                property.address,
                                property.bathrooms,
                                property.bedrooms,
                                property.imgSrc,
                                property.lotAreaUnit,
                                property.lotAreaValue,
                                property.latitude,
                                property.longitude,
                                property.price,
                                property.propertyType,
                                property.zpid,
                                property.livingArea
                            );
                        }}
                    >
                        <Favorite />
                    </IconButton>
                    <Button
                        onClick={() => {
                            updateStateForModal(
                                property.address,
                                property.bathrooms,
                                property.bedrooms,
                                property.imgSrc,
                                property.lotAreaUnit,
                                property.lotAreaValue,
                                property.propertyType,
                                property.price,
                                property.zpid,
                                property.latitude,
                                property.longitude,
                                property.livingArea
                            );
                            // setOpenModal(true);
                            console.log("more info clicked");
                            setIsMoreInfoClicked(true);
                        }}
                    >
                        More Info
                    </Button>
                </CardActions>
            </Card>
        );
    });

    return (
        <div>
            <SearchComponent
                setPropertiesData={setPropertiesData}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
            />
            <PropertyModal
                open={openModal}
                handleClose={handleCloseModal}
                address={address}
                bathrooms={bathrooms}
                bedrooms={bedrooms}
                lotAreaUnit={lotAreaUnit}
                lotAreaValue={lotAreaValue}
                price={price}
                propertyType={propertyType}
                viewTourUrl={viewTourUrl}
                zpid={zpid}
                latitude={latitude}
                longitude={longitude}
            />
            <div id="container" style={{ width: "100%", height: "1000px", display: "flex" }}>
                <div id="google-map-div" style={{ width: "75%" }}>
                    <div id="filters" style={{ width: "100%", border: "1px solid grey", height: "50px" }}>
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
                        </FormControl>
                    </div>
                    <div style={{ height: "950px" }}>
                        <GoogleMap propertiesData={propertiesData} latitude={latitude} longitude={longitude} />
                    </div>
                </div>
                <div id="properties-results-container" className={classes.propertiesContainer}>
                    <div id="properties-results" className={classes.propertiesComponentDiv}>
                        {propertiesDataComponent}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = makeStyles({
    propertiesContainer: {
        border: "2px solid red",
        width: "50%",
        height: "inherit",
        overflow: "auto",
    },
    propertiesComponentDiv: {
        height: "inherit",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    cardStyles: {
        width: "30%",
        margin: "5px",
    },
    cardContentStyles: {
        padding: "10px",
    },
    cardContentChild: {
        fontSize: "1rem",
        fontWeight: "bold",
    },
    image: {
        height: "100px",
    },
});

export default SearchResults;
