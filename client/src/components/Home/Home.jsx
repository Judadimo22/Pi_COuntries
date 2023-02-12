import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getCountries, orderCountries, filterActivity, filterByContinent } from "../../actions/actions";
import Style from './Home.module.css'
import SearchBar from "../SearchBar/SearchBar";
import Paginated from "../Paginated/Paginated";
import Cards from "../Cards/Cards";
import { Link } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.allCountries);
    const allActivities = useSelector((state) => state.activities);
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPage, setCountriesPage] = useState(9);
    const lastCountry = currentPage === 1 ? currentPage * countriesPage : currentPage * countriesPage -1;
    const firstCountry = lastCountry - countriesPage;
    const currentCountries = allCountries.slice(firstCountry, lastCountry);

    const paginatedNum = (pageNum) => {
        setCurrentPage(pageNum);
        pageNum === 1 ? setCountriesPage(9) : setCountriesPage(10);
    };

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);

    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(orderCountries(e.target.value));
        setCurrentPage(1);
    };

    const handleFilterActivity = (e) => {
        e.preventDefault();
        dispatch(filterActivity(e.target.value));
        setCurrentPage(1);
    }

    const handleFilterContinent = (e) => {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    }

    return(
        <div className={Style.containerHome}>
            <div>
                <div className={Style.containerFilters}>
                    <button className={Style.buttonHome}></button>
                    <h5 className={Style.textHome}>Home</h5>
                    <Link to={'/createactivity'}>
                    <button className={Style.buttonCreateActivity}>Create Activity</button>
                    </Link>

                    <select className={Style.filter} onChange={e => handleFilterActivity(e)}>
                        <option value="All">Filter by activities </option>
                        {
                            allActivities?.map(activity => {
                                return <option key={allActivities.indexOf(activity)} value={activity.name}>{activity.name}</option>
                            })
                        }
                    </select>


                    <select className={Style.filter} onChange={e => handleFilterContinent(e)}>
                        <option value="All" key="All">Order by continents</option>
                        <option value="Africa" key="Africa">Africa</option>
                        <option value="Antarctica" key="Antarctica">Antarctica</option>
                        <option value="Asia" key="Asia">Asia</option>
                        <option value="Europe" key="Europe">Europe</option>
                        <option value="North America" key="NorthAmerica">North America</option>
                        <option value="Oceania" key="Oceania">Oceania</option>
                        <option value="South America" key="SouthAmerica">South America</option>
                    </select>

                    <select className={Style.filter} onChange={e => handleOrder(e)}>
                        <option value="All"> Order by Default</option>
                        <option value="A-Z">Order A-Z</option>
                        <option value="Z-A">Order Z-A</option>
                        <option value="Max Population">Order Max Population</option>
                        <option value="Min Population">Order Min population</option>
                    </select>

                    
                <div className={Style.searchBar}>
                    <SearchBar setPage={paginatedNum}></SearchBar>
                </div>

                </div>


                <div className={Style.containerCardsHome}>
                    <Cards countries={currentCountries}></Cards>
                </div>


                <div>
                <Paginated 
                   allCountries={allCountries}
                   countriesPage={countriesPage}
                   paginatedNum={paginatedNum}
                   currentPage={currentPage}
                />

                </div>


            </div>


        </div>
    )

    


};

export default Home;