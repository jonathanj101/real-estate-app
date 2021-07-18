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

const Properties = () => {
    const [propertiesList, setPropertiesList] = useState([]);
    const [isIconClick, setIconClick] = useState(true);

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
    const classes = styles();

    const cardBody = propertiesList.map((property, num) => {
        return (
            <Card key={num} className={classes.cardStyles}>
                <CardMedia className={classes.image} image={property.image} />
                <CardContent>
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
                                property.lotAreaUnit,
                                property.lotAreaValue,
                                property.longitude,
                                property.latitude,
                                property.price,
                                property.property_type,
                                property.image,
                                property.zpid
                            );
                        }}
                    >
                        <Favorite />
                    </IconButton>
                </CardActions>
                {/* <Button>Add</Button> */}
            </Card>
        );
    });

    return (
        <div id="cards js">
            <div className={classes.cardMainDiv}>
                <div className={classes.cardDivStyles}>{cardBody}</div>
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
