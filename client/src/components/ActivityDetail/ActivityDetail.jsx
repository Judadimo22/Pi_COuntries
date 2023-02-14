import React from 'react';
import Style from './ActivityDetail.module.css'

const ActivityDetail = ({activityDetails, country}) => {
    return(
        <div className={Style.containerActivityDetail}>
            <h3 className={Style.titleActivities}>Activities for {country}</h3>
            {
               activityDetails?.map(a => (
                <div className={Style.listContainer}>
            <ul key={a.id}>
                <li>Name:<span>{a.name}</span></li>
                <li>Difficulty:<span>{a.difficulty}</span></li>
                <li>Duration:<span>{a.duration} hs</span></li>
                <li>Season:<span>{a.season}</span></li>
            </ul>
                </div>

               ))
            }
        </div>
    )
};

export default ActivityDetail;