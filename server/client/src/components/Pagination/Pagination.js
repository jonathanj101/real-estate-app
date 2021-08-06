import React from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { Pagination, PaginationItem } from "@material-ui/lab";

const PaginationComponent = ({ savedPropertiesLength, handlePageChange, savedPropertyArrayPerPage, currentPage }) => {
    // debugger;
    console.log(savedPropertiesLength, savedPropertyArrayPerPage, handlePageChange);
    return (
        <div
        // style={{ height: "400px", width: "100%" }}
        >
            {/* <DataGrid pagination /> */}
            <Pagination
                count={Math.ceil(savedPropertiesLength / 6)}
                page={currentPage}
                onChange={(event, value) => handlePageChange(value)}
                // renderItem={(item) => {
                //     // console.log(item)
                //     <PaginationItem />;
                // }}
            />
        </div>
    );
};

export default PaginationComponent;
