import React from "react";
import Card from "../Card/Card";
import Style from './Cards.module.css'

const Cards = ({countries}) => {
    return(
        <div className={Style.cardsContainer}>
            {
                countries?.map(c => (
                    <Card
                    id={c.id}
                    flag ={c.flag}
                    name={c.name}
                    continent={c.continent}
                    key={c.id}
                    />
                    
                ))
            }

        </div>
    )
};

export default Cards;