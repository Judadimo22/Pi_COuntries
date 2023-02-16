import React from "react";
import Style from './Paginated.module.css'

const Paginated = ({allCountries, countriesPerPage, paginatedNum, currentPage}) => {
    let page = Math.ceil(currentPage === 1 ? (allCountries.length - countriesPerPage)/countriesPerPage - (10-countriesPerPage) : allCountries.length/countriesPerPage + 0.1);
    let pagesNumber = [];
    for(let i = 1; i<=page; i++){
        pagesNumber.push(i);
    };

    return(
        <nav className={Style.containerPaging}>
            <ul className={Style.paging}>
                {
                    pagesNumber?.map(num => (
                        <li key={num}>
                            <button className={Style.buttonPages} onClick={() => paginatedNum(num)}>{num}</button>

                        </li>
                    ))
                }

            </ul>
            <span className={Style.currentPage}>{currentPage}</span>
        </nav>
    )
}

export default Paginated;