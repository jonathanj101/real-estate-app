import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardActions, IconButton, CardMedia, Button } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import PropertyModal from "../Modal/PropertyModal";
import styles from "./PropertiesStyles";

const Properties = () => {
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
    const [isMoreInfoClicked, setIsMoreInfoClicked] = useState(false);
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
    };

    useEffect(() => {
        if (isMoreInfoClicked) {
            fetchViewTourUrl(zpid);
            setIsMoreInfoClicked(false);
        }
        if (propertiesList.length === 0) {
            fetchProperties();
        } else {
            return;
        }
    }, [isMoreInfoClicked]);

    const fetchProperties = async () => {
        const response = await axios.get("api/show-properties");
        setPropertiesList(response.data.data);
    };

    const fetchViewTourUrl = async (zpid) => {
        const response = await axios.post("api/get-virtual-tour", {
            zpid: zpid,
        });
        setViewTourUrl(response.data.data);
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
        const isUserLogged = isLogged(localStorageUserId);
        if (isUserLogged) {
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
        } else {
            alert("You need to Log in or Register in order to save property!");
        }
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
            lotAreaUnit: lotAreaUnit,
            lotAreaUnitValue: lotAreaValue,
            latitude: latitude,
            longitude: longitude,
            propertyType: propertyType,
            zpid: zpid,
            livingArea: livingArea,
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

    const isLogged = (localStorageUserId) => {
        if (localStorageUserId !== null) {
            return true;
        } else {
            return false;
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
        setOpenModal(true);
        setAddress(address);
        setBathrooms(bathrooms);
        setBedrooms(bedrooms);
        setLotAreaUnit(lotAreaUnit);
        setLotAreaValue(lotAreaValue);
        setPropertyType(property_type);
        setViewTourUrl("ok");
        setPrice(price);
        setZpid(zpid);
        setLatitude(latitude);
        setLongitude(longitude);
    };

    const cardBody = propertiesList.map((property, num) => {
        return (
            <Card key={num} className={classes.cardStyles} id="property_card">
                <CardMedia className={classes.image} image={property.imgSrc} />
                <CardContent style={{ padding: "10px" }} id="property_card_content">
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
                <CardActions id="property_card_actions">
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
                            setOpenModal(true);
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
        <div id="properties_component" style={{ height: "inherit" }}>
            <div className={classes.cardMainDiv}>
                <div id="card_main_div" className={classes.cardDivStyles}>
                    {cardBody}
                </div>
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
            </div>
        </div>
    );
};

export default Properties;
