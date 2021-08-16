import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
    propertiesContainer: {
        border: "2px solid red",
        width: "50%",
        height: "inherit",
        overflow: "auto",
    },
    propertiesComponentDiv: {
        height: "inherit",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    cardStyles: {
        width: "30%",
        margin: "5px",
    },
    cardContentStyles: {
        padding: "10px",
    },
    cardContentChild: {
        fontSize: "1rem",
        fontWeight: "bold",
    },
    image: {
        height: "100px",
    },
});

export default styles;
