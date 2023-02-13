import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActivities, getCountries, orderCountries, filterActivity, filterByContinent } from "../../actions/actions";
import Style from './NavBar.module.css'
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const NavBar = () => {
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
    };

    const handleFilterContinent = (e) => {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
    };

    const onClickRestore = () => {
        dispatch(getCountries());
        setCurrentPage(9);
        setCurrentPage(1)
    };

    return(
        <div className={Style.containerHome}>
            <div>
                <div className={Style.containerFilters}>
                    <Link to={'/home'}>
                    <button className={Style.buttonHome}></button>
                    </Link>

                    <Link to={'/home'}>
                    <h5 className={Style.textHome}>Home</h5>
                    </Link>

                    <Link to={'/createactivity'}>
                    <button className={Style.buttonCreateActivity}>Create Activity</button>
                    </Link>

                    <Link to={'/listactivities'}>
                    <button className={Style.buttonListActivities}>List of activities</button>
                    </Link>

                    <div className={Style.containerSelect}>
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

                    <button className={Style.restore} onClick={()=>onClickRestore()}>Restore</button>

                    </div>



                    
                <div className={Style.searchBar}>
                    <SearchBar setPage={paginatedNum}></SearchBar>
                </div>

                </div>

            </div>


        </div>
    )

    


};

export default NavBar;