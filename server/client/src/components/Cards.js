import React, { useState } from "react";
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
// import house from "../../static/images/house.jpg";

const Cards = () => {
    const [expanded, setExpanded] = useState(null);
    const [isIconClick, setIconClick] = useState(false);
    const [arr, setArr] = useState([]);

    const fetchingData = () => {
        fetch("/testing")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setArr(data.data.props);
            });
    };
    // console.log(arr.props);

    const classes = styles();

    const toggle = (zpid) => {
        if (expanded === zpid) {
            setExpanded(null);
        } else {
            setExpanded(zpid);
        }
    };
    const handleIconOnClick = (e) => {
        console.log(e);
        if (!isIconClick) {
            e.currentTarget.children[0].style.color = "red";
            setIconClick(true);
        } else {
            e.currentTarget.children[0].style.color = "rgba(0, 0, 0, 0.54)";
            setIconClick(false);
        }
    };

    const cardBody = arr.map((property, num) => {
        // console.log(index);
        return (
            <Card>
                <CardMedia className={classes.image} image={property.imgSrc} />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        <h2>{property.price} </h2>
                    </Typography>
                    <Typography>
                        <span> bathrooms {property.bathrooms} | </span>
                        <span>{property.propertyType} | </span>
                        <span>
                            {property.lotAreaValue} {property.lotAreaUnit}
                        </span>
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites" onClick={handleIconOnClick}>
                        <Favorite />
                    </IconButton>
                    <IconButton aria-label="share">
                        <Share />
                    </IconButton>
                    <IconButton aria-label="show more" aria-expanded={expanded} onClick={() => toggle(property.zpid)}>
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded === property.zpid} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>
                            GOOGLE MINI-MAP MIGHT GO IN THIS PLACE! TO DISPLAY PROPERTIES LOCATION!!
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    });

    return (
        <div className={classes.mainDiv}>
            <Button onClick={fetchingData}>click here</Button>
            <Card>{cardBody}</Card>
            {/* <Card>
                <CardMedia className={classes.image} image="../../static/images/house.jpg" />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        A beatiful modern house to enjoy with family!
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={handleIconOnClick}>
                        <Favorite />
                    </IconButton>
                    <IconButton aria-label="share">
                        <Share />
                    </IconButton>
                    <IconButton aria-label="show more" aria-expanded={expanded} onClick={handleExpandClick}>
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>Review of the house</Typography>
                        <Typography>History of the house</Typography>
                        <Typography>Renovations if any</Typography>
                    </CardContent>
                </Collapse>
            </Card> */}
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        display: "flex",
        flexWrap: "wrap",
        border: "10px solid black",
        height: "100%",
        width: "100%",
    },
    cardStyles: {},
    image: {
        height: 140,
    },
});

export default Cards;
