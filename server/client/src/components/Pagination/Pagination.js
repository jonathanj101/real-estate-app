import React from "react";
import { Pagination } from "@material-ui/lab";
import styles from "./PaginationStyles";

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

export default PaginationComponent;
