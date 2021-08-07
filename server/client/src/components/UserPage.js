import React, { useState, useEffect } from "react";
import PropertyModal from "./PropertyModal";
// import Pagination from "./Pagination/Pagination";
import { Avatar, makeStyles, IconButton, Collapse, Card, CardContent, Typography, Button } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import axios from "axios";
import PaginationComponent from "./Pagination/Pagination";
import usePagination from "./Pagination/usePagination";

const UserPage = ({ googleApiKey }) => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
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
    // const [currentPage, setCurrentPage] = useState(1);
    const classes = styles();
    const localStorageUserId = JSON.parse(localStorage.getItem("userId"));

    useEffect(() => {
        // debugger;
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
        const response = await axios.get("api/favorites-properties");
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
        const response = await axios.post("api/test_virtual", {
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

    // const handlePageChange = (pageNumber) => {
    //     console.log(pageNumber);
    //     setCurrentPage(pageNumber);
    // };

    // const indexOflastItem = currentPage * propertiesPerPage;
    // const indexOfFirstItem = indexOflastItem - propertiesPerPage;
    // const currentProperties = savedProperties.slice(indexOfFirstItem, indexOflastItem);

    const { currentPage, getCurrentData, setCurrentPage, pageCount } = usePagination(
        savedProperties,
        propertiesPerPage
    );
    console.log(getCurrentData());

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
                <div className={classes.userSubCont}>
                    <Avatar className={classes.avatarStyles} src="../../static/images/house.jpg" />
                    <div className={classes.userInfoDiv}>
                        <div>
                            <p>Full Name {firstName} </p>
                        </div>
                        <div>
                            <p>Email {lastName}</p>
                        </div>
                    </div>
                </div>
                <div>
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
                        googleApiKey={googleApiKey}
                    />
                    <div className={classes.collapseContainer}>
                        <Collapse in={favorites}>
                            <div className="onTop" className={classes.propertiesListContainer}>
                                {propertiesList}
                            </div>
                            <PaginationComponent
                                savedPropertiesLength={savedProperties.length}
                                propertiesPerPage={propertiesPerPage}
                                handlePageChange={(_, page) => setCurrentPage(page)}
                                currentPage={currentPage}
                                pageCount={pageCount}

                                // currentPage={currentPage}
                            />
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        height: "1000px",
        border: "2px solid green",
    },
    container: {
        width: "100%",
        height: "inherit",
        border: "2px solid blue",
    },
    userSubCont: {
        display: "flex",
        border: "2px solid black",
    },
    userInfoDiv: {
        width: "50%",
        border: "2px solid black",
        fontSize: " 2rem",
    },
    avatarStyles: {
        width: "250px",
        height: "250px",
    },
    favoritesContainer: {
        display: "flex",
    },
    collapseContainer: {
        width: "90%",
        height: "inherit",
        margin: "auto",
    },
    propertiesListContainer: {
        width: "100%",
    },
    image: {
        height: "200px",
    },
    cardStyles: {
        display: "flex",
        justifyContent: "space-between",
        width: "50%",
        border: "1px solid black",
        margin: "10px auto",
    },
    btnStyles: {
        margin: "0 5px",
    },
});

export default UserPage;
