import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarpoolCard from './carpoolCard';
import Search from './search';
import ReactPaginate from 'react-paginate';


const Carpool = () => {
    const [carpools, setCarpools] = useState([]);
    const [filteredCarpools, setFilteredCarpools] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const carpoolPerPage = 12;

    useEffect(() => {
        const fetchCarpools = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}carpool`);
                const { data } = response.data;
                setCarpools(data.carpools.filter(carpool => carpool.capacity > 0));
            } catch (err) {
                console.error(err);
            }
        };

        fetchCarpools();
    }, []);

    const handleCarpoolEmpty = (id) => {
        // Log the event instead of removing the carpool from the state
        console.log(`Carpool with id ${id} has zero capacity.`);
    };

    const handleFilter = async (searchField, selectedFilter) => {
        try {
            if (searchField === '') {
                setFilteredCarpools(carpools);
            } else {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}carpool/searchBy${selectedFilter}?${selectedFilter}=${searchField}`);
                const { data } = response.data;
                const filteredData = data.carpools.filter(carpool => carpool.capacity > 0);
                setFilteredCarpools(filteredData);
                setSearchPerformed(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const pageCount = Math.ceil((searchPerformed ? filteredCarpools.length : carpools.length) / carpoolPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const pagesVisited = pageNumber * carpoolPerPage;

    const displayCarpools = searchPerformed ? filteredCarpools : carpools;

    return (
        <div>
            <div>
                <Search carpool={carpools} handleFilter={handleFilter} />
            </div>
            <div className="container">
                <div className="row">
                    {displayCarpools.length > 0 ? (
                        displayCarpools.slice(pagesVisited, pagesVisited + carpoolPerPage).map((carpool) => (
                            <div key={carpool.id} className="col-lg-4 mb-3">
                                <CarpoolCard carpool={carpool} onEmpty={handleCarpoolEmpty} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <strong>No results found</strong>
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"page-link"}
                        nextLinkClassName={"page-link"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        disabledClassName={"disabled"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Carpool;
