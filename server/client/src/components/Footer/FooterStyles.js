import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
    mainDiv: {
        height: "500px",
        backgroundColor: "rgb(102, 102, 102)",
    },
    columnMainDiv: {
        display: "flex",
        color: "white",
        justifyContent: "center",
    },
    columnItemsDiv: {
        marginRight: "100px",
        marginLeft: "100px",
    },
    columnTitle: {
        width: "75%",
        textAlign: "center",
        borderBottom: "5px solid red",
    },
    btnStyles: {
        color: "white",
    },
    copyrightsDiv: {
        display: "flex",
        color: "white",
    },
    iconsStyles: {
        color: "white",
        "&:hover": {
            color: "red",
        },
    },
});

export default styles;
