import React from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { Pagination, PaginationItem } from "@material-ui/lab";

const PaginationComponent = ({
    savedPropertiesLength,
    handlePageChange,
    propertiesPerPage,
    currentPage,
    pageCount,
}) => {
    return (
        <div>
            <Pagination
                count={pageCount}
                onChange={handlePageChange}
                page={currentPage}
                showFirstButton
                showLastButton
            />
        </div>
    );
};

export default PaginationComponent;
