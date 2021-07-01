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
} from "@material-ui/core";
import { Favorite, Share, ExpandMore } from "@material-ui/icons";
// import house from "../../static/images/house.jpg";

const Cards = () => {
    const [expanded, setExpanded] = useState(false);
    const [isIconClick, setIconClick] = useState(false);

    const classes = styles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
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

    return (
        <div className={classes.mainDiv}>
            <Card>
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
            </Card>
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        width: 345,
    },
    cardStyles: {},
    image: {
        height: 140,
    },
});

export default Cards;
