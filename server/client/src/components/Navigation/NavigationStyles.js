import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
    navTabsDiv: {
        display: "flex",
        justifyContent: "center",
    },
    linkStyles: {
        border: "0",
        cursor: "pointer",
        margin: "0",
        borderRadius: "0",
        backgroundColor: "transparent",
        cursor: "pointer",
    },
    btnNavigation: {
        backgroundColor: "inherit",
    },
    btnNavigationItems: {
        display: "flex",
        alignItems: "center",
        color: "black",
        "&:hover": {
            color: "white",
        },
    },
    nav: {
        backgroundColor: "red",
    },
});

export default styles;
