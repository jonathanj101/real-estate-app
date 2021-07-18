import React, { useState } from "react";
import { Modal, Card, CardContent, Typography, Button, makeStyles } from "@material-ui/core";

const PropertyModal = ({
    open,
    handleClose,
    address,
    bathrooms,
    bedrooms,
    lotAreaUnit,
    lotAreaValue,
    latitude,
    longitude,
    price,
    propertyType,
    viewTourUrl,
    imagesList,
}) => {
    const classes = styles();
    return (
        <div>
            <Modal
                style={{ width: "75%", margin: "auto" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Card>
                    <CardContent>
                        <div className={classes.imagesListDiv}>
                            {imagesList.map((image) => {
                                return <img src={image} className={classes.imagesStyles} />;
                            })}
                        </div>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h3">${price}</Typography>
                        <Typography variant="h5">{address}</Typography>
                        <Typography variant="h5">
                            {bathrooms} ba | {bedrooms} bds
                        </Typography>
                        <Typography variant="h5">{propertyType}</Typography>
                        <Typography variant="h5">
                            {lotAreaValue} {lotAreaUnit}
                        </Typography>
                    </CardContent>
                    <CardContent>map component here</CardContent>
                    <CardContent>
                        <Button target="_blank" href={viewTourUrl}>
                            view tour
                        </Button>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

const styles = makeStyles({
    imagesListDiv: {
        width: "100%",
        height: "500px",
        overflow: "auto",
    },
    imagesStyles: {
        height: "300px",
        width: "300px",
    },
});

export default PropertyModal;
