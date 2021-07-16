import React, { useState, useEffect } from "react";
import PropertyModal from "./PropertyModal";
import {
    Avatar,
    makeStyles,
    IconButton,
    Collapse,
    CardActions,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

const UserPage = () => {
    const [isIconClicked, setIsIconClicked] = useState(false);
    const [favorites, setFavorites] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [savedProperties, setSavedProperties] = useState([]);
    const [address, setAddress] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [lotAreaValue, setLotAreaValue] = useState("");
    const [lotAreaUnit, setLotAreaUnit] = useState("");
    const [price, setPrice] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [zpid, setZpid] = useState("");
    const classes = styles();

    useEffect(() => {
        fetchPropertyData();
    }, []);

    useEffect(() => {
        if (address !== "") {
            console.log(
                address,
                bedrooms,
                bathrooms,
                latitude,
                longitude,
                lotAreaUnit,
                lotAreaValue,
                price,
                propertyType,
                zpid
            );
            fetchingZpid();
        }
        console.log("after if " + address);
    }, [address]);

    const fetchPropertyData = () => {
        fetch("api/favorites-properties")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSavedProperties(data.data);
            });
    };

    const handleIconOnClick = (e) => {
        console.log(e);
        if (!isIconClicked) {
            e.currentTarget.children[0].style.color = "red";
            setIsIconClicked(true);
        } else {
            e.currentTarget.children[0].style.color = "rgba(0, 0, 0, 0.54)";
            setIsIconClicked(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const toggle = (e) => {
        setFavorites(!favorites);
        handleIconOnClick(e);
    };

    const getPropertyData = (
        address,
        bathrooms,
        bedrooms,
        latitude,
        longitude,
        lotAreaUnit,
        lotAreaValue,
        price,
        propertyType,
        zpid
    ) => {
        setAddress(address);
        setBathrooms(bathrooms);
        setBedrooms(bedrooms);
        setLatitude(latitude);
        setLongitude(longitude);
        setLotAreaValue(lotAreaValue);
        setLotAreaUnit(lotAreaUnit);
        setPrice(price);
        setPropertyType(propertyType);
        setZpid(zpid);
    };
    const fetchingZpid = () => {
        fetch("api/test_virtual", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                zpid: zpid,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
    };

    const propertiesList = savedProperties.map((property, num) => {
        return (
            <Card
                key={num}
                className={classes.cardStyles}
                onClick={() => {
                    getPropertyData(
                        property.address,
                        property.bathrooms,
                        property.bedrooms,
                        property.latitude,
                        property.longitude,
                        property.lotAreaUnit,
                        property.lotAreaValue,
                        property.price,
                        property.property_type,
                        property.zpid
                    );
                }}
            >
                <CardContent>
                    <Typography>{property.price}</Typography>
                </CardContent>
                <CardContent>
                    <Button
                        onClick={() => {
                            setOpenModal(true);
                            // fetchingZpid();
                        }}
                    >
                        More Info
                    </Button>
                </CardContent>
            </Card>
        );
    });

    return (
        <div className={classes.mainDiv}>
            <div className={classes.container}>
                <div className={classes.userSubCont}>
                    <Avatar className={classes.avatarStyles} src="/broken-image.jpg" />
                    <div className={classes.userInfoDiv}>
                        <div>
                            <p>Full Name </p>
                        </div>
                        <div>
                            <p>Email</p>
                        </div>
                        <div>
                            <p>Location</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ display: "flex" }}>
                        <h1>Saved Properties</h1>
                        <IconButton aria-label="show more" aria-expanded={favorites} onClick={toggle}>
                            <Favorite />
                        </IconButton>
                    </div>
                    <Button
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        open modal
                    </Button>
                    <PropertyModal open={openModal} handleClose={handleCloseModal} />
                    <div style={{ border: "2px solid red", height: "inherit" }}>
                        <Collapse in={favorites}>
                            <div style={{ border: "2px solid green", display: "flex" }}>{propertiesList}</div>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        height: "1000px",
        border: "2px solid green",
    },
    container: {
        width: "100%",
        height: "inherit",
        border: "2px solid blue",
    },
    userSubCont: {
        display: "flex",
        border: "2px solid black",
    },
    userInfoDiv: {
        width: "50%",
        border: "2px solid black",
        fontSize: " 2rem",
    },
    avatarStyles: {
        width: "250px",
        height: "250px",
    },
    image: {
        height: "200px",
    },
    cardStyles: {
        width: "5%",
    },
});

export default UserPage;
