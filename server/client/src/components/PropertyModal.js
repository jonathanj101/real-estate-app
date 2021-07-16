import React, { useState } from "react";
import { Modal, Card, CardContent, CardActions, CardMedia, CardHeader, Collapse, Button } from "@material-ui/core";

const PropertyModal = ({ open, handleClose }) => {
    console.log(open);
    return (
        <div>
            <Modal
                style={{ width: "50%", margin: "auto", border: "2px solid green" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Card>
                    <CardMedia style={{ height: "400px" }} image="../../static/images/house.jpg" />
                    <CardContent>property info here</CardContent>
                    <CardContent>map component here</CardContent>
                    <CardContent>
                        <Button
                        // href={url}
                        >
                            view tour
                        </Button>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

export default PropertyModal;
