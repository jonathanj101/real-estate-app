import React from "react";
import { makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const PaginationComponent = ({ handlePageChange, currentPage, pageCount }) => {
    const classes = styles();
    return (
        <div className={classes.mainDiv} id="paginate-mainDiv">
            <Pagination
                id="paginate"
                count={pageCount}
                onChange={handlePageChange}
                page={currentPage}
                showFirstButton
                showLastButton
                color="secondary"
                variant="outlined"
            />
        </div>
    );
};

const styles = makeStyles({
    mainDiv: {
        width: "50%",
        margin: "auto",
    },
});

export default PaginationComponent;
