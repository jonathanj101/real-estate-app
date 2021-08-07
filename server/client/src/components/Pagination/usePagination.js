import { useState } from "react";
// import PropTypes from 'prop-types';

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemCount = data.length;
    console.log(data, itemsPerPage);

    const getCurrentData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return data.slice(start, end);
    };

    const pageCount = Math.ceil(itemCount / itemsPerPage);
    console.log(pageCount);

    return {
        currentPage,
        getCurrentData,
        setCurrentPage,
        pageCount,
    };
};

export default usePagination;
