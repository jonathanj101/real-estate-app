import { makeStyles } from "@material-ui/core";

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
    subContainer: {
        marginTop: "100px",
    },
    favoritesContainer: {
        display: "flex",
        justifyContent: "center",
    },
    collapseContainer: {
        width: "90%",
        height: "inherit",
        margin: "auto",
    },
    propertiesListContainer: {
        width: "100%",
        height: "600px",
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

export default styles;
