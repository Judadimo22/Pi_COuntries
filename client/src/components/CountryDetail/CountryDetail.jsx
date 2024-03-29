import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import { getCountryById } from "../../actions/actions";
import Style from './CountryDetail.module.css';
import { getCountries } from "../../actions/actions";
import ActivityDetail from "../ActivityDetail/ActivityDetail";
import NavBar from "../NavBar/NavBar";

const CountryDetail = () => {
    const details = useSelector((state) => state.detail);
    const dispatch = useDispatch();
    const{id} = useParams();


    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);


    useEffect(() => {
        dispatch(getCountryById(id));
    });

    return(
        <div>
            <div>
                <NavBar/>
            </div>
        <h3 className={Style.nameCountry}>{details.name}</h3>
            <div className={Style.containerInfo}>
            <div className={Style.containerFlag}>
                <img src={details.flag} alt="No hay bandera" />
            </div>

            <div className={Style.dataCountry}>

                <h3>ID: <span>{details.id}</span></h3>
                <h3>Continent: <span>{details.continent}</span></h3>
                <h3>Capital: <span>{details.capital}</span></h3>
                <h3>Subregion: <span>{details.subregion}</span></h3>
                <h3>Area: <span>{details.area} km2</span></h3>
                <h3>Population: <span>{details.population}</span></h3>

            </div>

            </div>

            <div className={Style.containerActivityDetail}>
                <ActivityDetail activityDetails={details.activities} country={details.name}/>
            </div>

        </div>
    )
};

export default CountryDetail;