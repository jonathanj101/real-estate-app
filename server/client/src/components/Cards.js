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
            <Card className={classes.cardStyles}>
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
        <div className={classes.mainDiv} id="cards js">
            <div>
                <Button onClick={fetchingData}>click here</Button>
            </div>
            <div className={classes.cardDivStyles}>{cardBody}</div>
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        height: "1500px",
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
