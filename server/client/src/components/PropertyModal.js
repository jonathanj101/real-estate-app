import React, { useState, useEffect } from "react";
import { Modal, Card, CardContent, CardMedia, Typography, Button, makeStyles } from "@material-ui/core";
import Loading from "./LoadingComponent/Loading";

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
}) => {
    const [propertyImagesForHomePage, setHomePagePropertyImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (zpid !== undefined && zpid !== "") {
            fetchPropertyImages(zpid);
            setIsLoading(false);
        } else {
            console.log("not reading it");
        }
    }, [zpid]);

    const fetchPropertyImages = async (zpid) => {
        const response = await fetch("api/get-images", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                zpid: zpid,
            }),
        });
        const data = await response.json();
        console.log(data);
        // setHomePagePropertyImages(response.data.data);
    };

    // const imagesListComponent = () => {
    //     return (
    //         <CardContent>
    //             <div className={classes.imagesListDiv}>
    //                 {/* {imagesList.map((image) => { */}
    //                 {propertyImagesForHomePage.map((image) => {
    //                     return <img src={image} className={classes.imagesStyles} />;
    //                 })}
    //             </div>
    //         </CardContent>
    //     );
    // };

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
                    {/* {isLoading ? <Loading /> : imagesListComponent} */}

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
