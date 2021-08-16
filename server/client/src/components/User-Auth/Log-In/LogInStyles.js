import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
    mainDiv: {
        width: "100%",
        height: "100%",
    },
    formDiv: {
        width: "25%",
        height: "40%",
        margin: "250px auto",
        borderRadius: "rgb(179 178 178) 18px 8px 32px",
    },
    modalStyles: {
        border: "2px solid black",
        textAlign: "center",
    },
    formStyles: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    formTitleDiv: {
        width: "15%",
        margin: "auto",
    },
    formTitle: {
        fontSize: "2rem",
        borderBottom: "5px solid red",
    },
    btnStyles: {
        color: "red",
        border: "1px solid red",
        width: "25%",
        "&:hover": {
            backgroundColor: "red",
            color: "white",
        },
    },
    registerOptDiv: {
        margin: "25px auto 0 auto",
    },
});

export default styles;
