import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
    mainDiv: {
        height: "100%",
        width: "100%",
    },
    titleDiv: {
        textAlign: "center",
    },
    summaryDiv: {
        width: "50%",
        fontSize: "1.5rem",
        margin: "50px auto",
    },
    techStacksDiv: {
        height: "100%",
        width: "50%",
        margin: "50px auto",
        display: "flex",
        justifyContent: "space-evenly",
        fontSize: "1.5rem",
    },
    stackTitleDiv: {
        width: "fit-content",
        textAlign: "center",
        margin: "auto",
    },
    stackTitle: {
        borderBottom: "2px solid red",
        fontWeight: "bold",
    },
});

export default styles;
