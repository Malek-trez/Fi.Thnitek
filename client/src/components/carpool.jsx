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
                setCarpools(data.carpools);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCarpools();
    }, []);

    const handleCarpoolEmpty = (id) => {
        setCarpools(carpools.filter(carpool => carpool.id !== id));
    };

    const handleFilter = async (searchField, selectedFilter) => {
        try {
            if (searchField === '') {
                setFilteredCarpools(carpools);
            } else {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}carpool/searchBy${selectedFilter}?${selectedFilter}=${searchField}`);
                const { data } = response.data;
                setFilteredCarpools(data.carpools);
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

    return (
        <div>
            <div>
                <Search carpool={carpools} handleFilter={handleFilter} />
            </div>
            <div className="container">
                <div className="row">
                    {(searchPerformed ? filteredCarpools : carpools).slice(pagesVisited, pagesVisited + carpoolPerPage).map((carpool) => (
                        <div key={carpool.id} className="col-lg-4 mb-3">
                            <CarpoolCard carpool={carpool} onEmpty={handleCarpoolEmpty} />
                        </div>
                    ))}
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
                    style={{
                        margin: "20px 0"
                    }}
                />
            </div>
            </div>
        </div>
    );
};

export default Carpool;
