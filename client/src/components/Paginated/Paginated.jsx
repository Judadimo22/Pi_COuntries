import React from "react";
import Style from './Paginated.module.css'

const Paginated = ({allCountries, countriesPage, paginatedNum, currentPage}) => {
    let page = Math.ceil(currentPage === 1 ? (allCountries.length - countriesPage)/countriesPage - (10-countriesPage) : allCountries.length/countriesPage + 0.1);
    let pagesNumber = [];
    for(let i = 1; i<=page; i++){
        pagesNumber.push(i);
    };

    return(
        <nav>
            <ul className={Style.paging}>
                {
                    pagesNumber?.map(num => (
                        <li key={num}>
                            <button className={Style.buttonPages} onClick={() => paginatedNum(num)}>{num}</button>

                        </li>
                    ))
                }

            </ul>
            <span></span>
        </nav>
    )
}

export default Paginated;