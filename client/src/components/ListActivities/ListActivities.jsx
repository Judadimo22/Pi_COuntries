import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, deleteActivity } from "../../actions/actions";
import Style from './ListActivities.module.css'
import NavBar from "../NavBar/NavBar";

const ListActivities = () => {
    const activities = useSelector((state) => state.activities);
    const dispatch = useDispatch();
    const [activity, setActivity] = useState(activities);

    useEffect(() => {
        dispatch(getActivities())
    }, [activity]);

    const handleDeleteActivity = (idActivity) => {
        dispatch(deleteActivity(idActivity));
        setActivity(activities);
    };

    return(
        <div className={Style.containerActivityDetail}>
            <div>
                <NavBar/>
            </div>
        {
           activities?.map(a => (
            <div className={Style.listContainer}>
        <ul key={a.id}>
            <li>Name:<span>{a.name}</span></li>
            <li>Difficulty:<span>{a.difficulty}</span></li>
            <li>Duration:<span>{a.duration}</span></li>
            <li>Season:<span>{a.season}</span></li>
            <li>Country: {a.countries.map(e => {
                return e.name
            })}</li>
            <li><button className='close' onClick={()=>handleDeleteActivity(a.id)}>X</button></li>
        </ul>
            </div>

           ))
        }
    </div>
    )
};

export default ListActivities;
