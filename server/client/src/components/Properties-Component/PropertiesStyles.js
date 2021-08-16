import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
    cardMainDiv: {
        height: "inherit",
        overflowY: "overlay",
    },
    cardDivStyles: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    cardStyles: {
        width: "15%",
        marginTop: "5px",
        marginBottom: "5px",
    },
    image: {
        height: "400px",
    },
});

export default styles;
