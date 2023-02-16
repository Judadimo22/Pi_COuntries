import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getCountries} from "../../actions/actions";
import Style from './Home.module.css'
import Paginated from "../Paginated/Paginated";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";

const Home = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.allCountries);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPage] = useState(9);
    const lastCountry = currentPage === 1 ? currentPage * countriesPerPage : currentPage * countriesPerPage -1;
    const firstCountry = lastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(firstCountry, lastCountry);

    const paginatedNum = (pageNum) => {
        setCurrentPage(pageNum);
        pageNum === 1 ? setCountriesPage(9) : setCountriesPage(10);
    };

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    return(
        <div className={Style.containerHome}>
            <div>
                <div>
                    <NavBar/>
                </div>

                <div className={Style.containerCardsHome}>
                    <Cards countries={currentCountries}></Cards>
                </div>

                <div>
                <Paginated 
                   allCountries={allCountries}
                   countriesPerPage={countriesPerPage}
                   paginatedNum={paginatedNum}
                   currentPage={currentPage}
                />
                </div>

            </div>


        </div>
    )

};

export default Home;