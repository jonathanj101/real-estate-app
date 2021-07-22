import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardActions,
    IconButton,
    Collapse,
    Typography,
    CardMedia,
    makeStyles,
    Button,
} from "@material-ui/core";
import { Favorite, Share, ExpandMore } from "@material-ui/icons";
import PropertyModal from "./PropertyModal";

const Properties = ({ googleApiKey }) => {
    const [propertiesList, setPropertiesList] = useState([]);
    const [isIconClick, setIconClick] = useState(true);
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
                setPropertiesList(data.data);
            });
    };

    const addProperty = (
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
        fetch("api/add_property", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
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
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };
    // const deleteProperty = () => {};

    const handleSubmit = (
        e,
        address,
        bathrooms,
        bedrooms,
        lotAreaUnit,
        lotAreaValue,
        longitude,
        latitude,
        price,
        property_type,
        image,
        zpid
    ) => {
        debugger;
        const iconColor = e.currentTarget.children[0].style.color;
        if (isIconClick && iconColor == "red") {
            e.currentTarget.children[0].style.color = "rgba(0, 0, 0, 0.54)";
            setIconClick(false);
        } else {
            e.currentTarget.children[0].style.color = "red";
            setIconClick(true);
            addProperty(
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
                        onClick={() => {
                            handleSubmit(
                                property.address,
                                property.bathrooms,
                                property.bedrooms,
                                property.price,
                                property.lotAreaUnit,
                                property.lotAreaValue,
                                property.longitude,
                                property.latitude,
                                property.property_type,
                                property.image,
                                property.zpid
                            );
                        }}
                    >
                        <Favorite />
                    </IconButton>
                    <Button
                        // style={{ margin: "auto" }}
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
