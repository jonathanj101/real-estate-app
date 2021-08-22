import React, { useState, useEffect } from "react";
import PropertyModal from "../Modal/PropertyModal";
import { IconButton, Collapse, Card, CardContent, Typography, Button } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import axios from "axios";
import PaginationComponent from "../Pagination/Pagination";
import usePagination from "../Pagination/usePagination";
import styles from "./UserPageStyles";

const UserPage = () => {
    const [isIconClicked, setIsIconClicked] = useState(false);
    const [favorites, setFavorites] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [savedProperties, setSavedProperties] = useState([]);
    const [address, setAddress] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [lotAreaValue, setLotAreaValue] = useState("");
    const [lotAreaUnit, setLotAreaUnit] = useState("");
    const [price, setPrice] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [zpid, setZpid] = useState("");
    const [viewTourUrl, setViewTourUrl] = useState("");
    const [isMoreInfoClicked, setIsMoreInfoClicked] = useState(false);
    const [savedPropertyUpdated, setSavedPropertyUpdated] = useState(false);
    const [propertiesPerPage] = useState(6);
    const classes = styles();
    const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
    useEffect(() => {
        if (savedPropertyUpdated) {
            fetchPropertyData();
            setSavedPropertyUpdated(false);
        } else {
            fetchPropertyData();
        }
    }, [savedPropertyUpdated]);

    useEffect(() => {
        if (isMoreInfoClicked) {
            fetchViewTourUrl();
            setIsMoreInfoClicked(false);
        }
    }, [isMoreInfoClicked]);

    const fetchPropertyData = async () => {
        const response = await axios.put("api/favorites-properties", {
            userId: localStorageUserId,
        });
        setSavedProperties(response.data.data);
    };

    const handleIconOnClick = (e) => {
        if (!isIconClicked) {
            e.currentTarget.children[0].style.color = "red";
            setIsIconClicked(true);
        } else {
            e.currentTarget.children[0].style.color = "rgba(0, 0, 0, 0.54)";
            setIsIconClicked(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const toggle = (e) => {
        setFavorites(!favorites);
        handleIconOnClick(e);
    };

    const getPropertyData = (
        address,
        bathrooms,
        bedrooms,
        latitude,
        longitude,
        lotAreaUnit,
        lotAreaValue,
        price,
        propertyType,
        zpid
    ) => {
        setOpenModal(true);
        setIsMoreInfoClicked(true);
        setAddress(address);
        setBathrooms(bathrooms);
        setBedrooms(bedrooms);
        setLatitude(latitude);
        setLongitude(longitude);
        setLotAreaValue(lotAreaValue);
        setLotAreaUnit(lotAreaUnit);
        setPrice(price);
        setPropertyType(propertyType);
        setZpid(zpid);
    };

    const fetchViewTourUrl = async () => {
        const response = await axios.post("api/get-virtual-tour", {
            zpid: zpid,
        });
        setViewTourUrl(response.data.data);
    };

    const deleteProperty = async (zpid) => {
        const response = await axios.post("api/delete-property", {
            userId: localStorageUserId,
            zpid: zpid,
        });
        const statusCode = response.data.status;
        if (statusCode <= 201) {
            setSavedPropertyUpdated(true);
        }
    };

    const { currentPage, getCurrentData, setCurrentPage, pageCount } = usePagination(
        savedProperties,
        propertiesPerPage
    );

    const propertiesList = getCurrentData().map((property, num) => {
        return (
            <Card key={num} className={classes.cardStyles}>
                <CardContent>
                    <Typography>{property.address}</Typography>
                    <Typography>${property.price}</Typography>
                </CardContent>
                <CardContent>
                    <Button
                        className={classes.btnStyles}
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            getPropertyData(
                                property.address,
                                property.bathrooms,
                                property.bedrooms,
                                property.latitude,
                                property.longitude,
                                property.lotAreaUnit,
                                property.lotAreaValue,
                                property.price,
                                property.property_type,
                                property.zpid
                            );
                        }}
                    >
                        More Info
                    </Button>
                    <Button
                        className={classes.btnStyles}
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            deleteProperty(property.zpid);
                        }}
                    >
                        Remove
                    </Button>
                </CardContent>
            </Card>
        );
    });

    return (
        <div className={classes.mainDiv}>
            <div className={classes.container}>
                <div className={classes.subContainer}>
                    <div className={classes.favoritesContainer}>
                        <h1>Saved Properties</h1>
                        <IconButton aria-label="show more" aria-expanded={favorites} onClick={toggle}>
                            <Favorite />
                        </IconButton>
                    </div>
                    <PropertyModal
                        address={address}
                        bathrooms={bathrooms}
                        bedrooms={bedrooms}
                        lotAreaValue={lotAreaValue}
                        lotAreaUnit={lotAreaUnit}
                        latitude={latitude}
                        longitude={longitude}
                        price={price}
                        propertyType={propertyType}
                        zpid={zpid}
                        open={openModal}
                        viewTourUrl={viewTourUrl}
                        handleClose={handleCloseModal}
                    />
                    <div className={classes.collapseContainer}>
                        <Collapse in={favorites}>
                            <div className="onTop" className={classes.propertiesListContainer}>
                                {propertiesList}
                            </div>
                            <PaginationComponent
                                handlePageChange={(_, page) => setCurrentPage(page)}
                                currentPage={currentPage}
                                pageCount={pageCount}
                            />
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
