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
import { Favorite, Share, ExpandMore, MoreVert } from "@material-ui/icons";
// import house from "../../static/images/house.jpg";

const Cards = () => {
    const [expanded, setExpanded] = useState(false);

    const classes = styles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
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
                    <IconButton aria-label="add to favorites">
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
        width: "50%",
        height: "50%",
    },
    image: {
        height: "300px",
        width: "300px",
    },
});

export default Cards;
