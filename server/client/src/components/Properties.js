import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardActions, IconButton, CardMedia, makeStyles, Button } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import PropertyModal from "./PropertyModal";

const Properties = ({ googleApiKey }) => {
    const [propertiesList, setPropertiesList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [address, setAddress] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [lotAreaUnit, setLotAreaUnit] = useState("");
    const [lotAreaValue, setLotAreaValue] = useState("");
    const [price, setPrice] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [viewTourUrl, setViewTourUrl] = useState("");
    const [image, setImage] = useState("");
    const [zpid, setZpid] = useState("");
    const classes = styles();
    const localStorageUserId = JSON.parse(localStorage.getItem("userId"));

    const handleCloseModal = () => {
        setOpenModal(false);
        setAddress("");
        setBathrooms("");
        setBedrooms("");
        setLotAreaUnit("");
        setLotAreaValue("");
        setPropertyType("");
        setViewTourUrl("ok");
        setPrice("");
        setImage("");
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = () => {
        fetch("api/show-properties")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPropertiesList(data.data);
            });
    };

    const addProperty = async (
        e,
        address,
        bathrooms,
        bedrooms,
        cost,
        image,
        lotAreaUnit,
        lotAreaValue,
        latitude,
        longitude,
        propertyType,
        zpid
    ) => {
        debugger;
        const heartIconOriginalColor = "rgba(0, 0, 0, 0.54)";
        let heartIcon = e.currentTarget.children[0].style;

        const response = await axios.post("api/add_property", {
            userId: localStorageUserId,
            address: address,
            bathrooms: bathrooms,
            bedrooms: bedrooms,
            cost: cost,
            image: image,
            lotAreaUnit: lotAreaUnit,
            lotAreaUnitValue: lotAreaValue,
            latitude: latitude,
            longitude: longitude,
            propertyType: propertyType,
            zpid: parseInt(zpid),
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
        longitude,
        latitude,
        price,
        property_type,
        zpid
    ) => {
        debugger;
        const heartIconOriginalColor = "rgba(0, 0, 0, 0.54)";
        let heartIcon = e.currentTarget.children[0].style;
        if (heartIcon.color === "" || heartIcon.color === heartIconOriginalColor) {
            addProperty(
                e,
                address,
                bathrooms,
                bedrooms,
                price,
                image,
                lotAreaUnit,
                lotAreaValue,
                latitude,
                longitude,
                property_type,
                zpid
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
        longitude
    ) => {
        console.log(image);
        setOpenModal(true);
        setAddress(address);
        setBathrooms(bathrooms);
        setBedrooms(bedrooms);
        setLotAreaUnit(lotAreaUnit);
        setLotAreaValue(lotAreaValue);
        setPropertyType(property_type);
        setViewTourUrl("ok");
        setPrice(price);
        setImage(image);
        setZpid(zpid);
        setLatitude(latitude);
        setLongitude(longitude);
    };

    const cardBody = propertiesList.map((property, num) => {
        return (
            <Card key={num} className={classes.cardStyles}>
                <CardMedia className={classes.image} image={property.image} />
                <CardContent style={{ padding: "10px" }}>
                    <div style={{ fontSize: "1rem", fontWeight: "bold" }}>
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
                                property.image,
                                property.lotAreaUnit,
                                property.lotAreaValue,
                                property.latitude,
                                property.longitude,
                                property.price,
                                property.property_type,
                                property.zpid
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
                                property.image,
                                property.lotAreaUnit,
                                property.lotAreaValue,
                                property.propertyType,
                                property.price,
                                property.zpid,
                                property.latitude,
                                property.longitude
                            );
                            setOpenModal(true);
                            console.log(address);
                        }}
                    >
                        More Info
                    </Button>
                </CardActions>
            </Card>
        );
    });

    return (
        <div id="cards js">
            <div className={classes.cardMainDiv}>
                <div className={classes.cardDivStyles}>{cardBody}</div>
                <PropertyModal
                    googleApiKey={googleApiKey}
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
                    image={image}
                    zpid={zpid}
                    latitude={latitude}
                    longitude={longitude}
                />
            </div>
        </div>
    );
};

const styles = makeStyles({
    cardMainDiv: {
        height: "920px",
        overflowY: "overlay",
    },
    cardDivStyles: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    cardStyles: {
        width: "15%",
        marginTop: "5px",
        marginBottom: "5px",
    },
    image: {
        height: "400px",
    },
});

export default Properties;
