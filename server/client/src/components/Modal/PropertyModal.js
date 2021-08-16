import React, { useState, useEffect } from "react";
import { Modal, Card, CardContent, Typography, Button } from "@material-ui/core";
import axios from "axios";
import Loading from "../LoadingComponent/Loading";
import GoogleMapModal from "../Map/Google-Map/GoogleMapModal";
import styles from "./PropertyModalStyles";

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
    zpid,
}) => {
    const [propertyImagesForHomePage, setHomePagePropertyImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const classes = styles();

    useEffect(() => {
        if (zpid !== undefined && zpid !== "") {
            fetchPropertyImages(zpid);
        }
    }, [zpid]);

    const fetchPropertyImages = async (zpid) => {
        try {
            setIsLoading(true);
            const response = await axios.post("api/get-images", {
                zpid: zpid,
            });
            setHomePagePropertyImages(response.data.data);
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
                                <div className={classes.tourBtnDiv}>
                                    {viewTourUrl === null ? (
                                        <Button>No Tour Available</Button>
                                    ) : (
                                        <Button target="_blank" href={viewTourUrl}>
                                            view tour
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </div>
                        <div style={{ width: "100%" }}>
                            <CardContent style={{ height: "100%", width: "100%", padding: "0" }}>
                                <GoogleMapModal latitude={latitude} longitude={longitude} />
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </Modal>
        </div>
    );
};

export default PropertyModal;
