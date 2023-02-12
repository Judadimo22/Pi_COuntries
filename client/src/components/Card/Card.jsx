import React from "react";
import { Link } from "react-router-dom";
import Style from './Card.module.css'

const Card = ({flag, name, continent, id}) => {

    return(
        <div className={Style.cardContainer}>
        <h3 className={Style.nameCountry}>{name}</h3>
        <Link to={`/detail/${id}`}>
            <img className={Style.flagDetail} src={flag} alt="" />
        </Link>

        <h3 className={Style.continentCountry}>{continent}</h3>

    </div>
    )

}

export default Card;