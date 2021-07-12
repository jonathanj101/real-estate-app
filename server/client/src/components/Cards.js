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

const Cards = () => {
    const [expanded, setExpanded] = useState(null);
    const [isIconClick, setIconClick] = useState(true);
    const [arr, setArr] = useState([]);

    useEffect(() => {
        fetchingData();
    }, []);

    const fetchingData = () => {
        fetch("api/show-properties")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setArr(data.data);
            });
    };

    const addProperty = () => {
        fetch("/add_property", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });
    };
    // const deleteProperty = () => {};

    // const getPropertyDataOnClick = (e) => {};

    const handleIconOnClick = (e) => {
        const iconColor = e.currentTarget.children[0].style.color;
        if (isIconClick && iconColor == "red") {
            e.currentTarget.children[0].style.color = "rgba(0, 0, 0, 0.54)";
            setIconClick(false);
        } else {
            e.currentTarget.children[0].style.color = "red";
            setIconClick(true);
        }
    };

    const classes = styles();

    const cardBody = arr.map((property, num) => {
        return (
            <Card key={num} className={classes.cardStyles}>
                <CardMedia className={classes.image} image={property.image} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        <h2>{property.price} </h2>
                    </Typography>
                    <Typography>
                        <span>
                            {property.bedrooms} bd | {property.bathrooms} ba |{" "}
                        </span>
                        <span>{property.propertyType} | </span>
                        <span>
                            {property.lotAreaValue} {property.lotAreaUnit}
                        </span>
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites" onClick={(e) => handleIconOnClick(e)}>
                        <Favorite />
                    </IconButton>
                </CardActions>
                <Button>Save Property</Button>
            </Card>
        );
    });

    return (
        <div id="cards js">
            <div>{/* <Button onClick={fetchingData}>click here</Button> */}</div>
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

export default Cards;
