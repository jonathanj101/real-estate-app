import React, { useState, useEffect } from "react";
import { Modal, Card, CardContent, Typography, Button, makeStyles } from "@material-ui/core";
import Loading from "./LoadingComponent/Loading";
import GoogleMap from "./Map/Google-Map/GoogleMap";

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
    image,
    zpid,
    googleApiKey,
}) => {
    const [propertyImagesForHomePage, setHomePagePropertyImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const classes = styles();

    useEffect(() => {
        if (zpid !== undefined && zpid !== "") {
            fetchPropertyImages();
        }
    }, [zpid]);

    const fetchPropertyImages = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("api/get-images", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    zpid: zpid,
                }),
            });
            const data = await response.json();
            setHomePagePropertyImages(data.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const imagesListComponent = propertyImagesForHomePage.map((image) => {
        return <img src={image} className={classes.imagesStyles} />;
    });

    return (
        <div>
            <Modal
                style={{ width: "90%", margin: "auto" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Card style={{ height: "95%" }}>
                    <div style={{ height: "100%", display: "flex", flexDirection: "row-reverse" }}>
                        <div style={{ width: "30%" }}>
                            <CardContent style={{ height: "75%" }}>
                                <div className={classes.imagesListDiv}>
                                    {isLoading ? <Loading /> : imagesListComponent}
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
                                <Button target="_blank" href={viewTourUrl}>
                                    view tour
                                </Button>
                            </CardContent>
                        </div>
                        <div style={{ width: "100%" }}>
                            <CardContent style={{ height: "100%", width: "100%", padding: "0" }}>
                                <GoogleMap
                                    googleApiKey={googleApiKey}
                                    isLoading={isLoading}
                                    latitude={latitude}
                                    longitude={longitude}
                                />
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </Modal>
        </div>
    );
};

const styles = makeStyles({
    imagesListDiv: {
        width: "100%",
        height: "100%",
        overflow: "auto",
    },
    imagesStyles: {
        height: "300px",
        width: "inherit",
    },
});

export default PropertyModal;
