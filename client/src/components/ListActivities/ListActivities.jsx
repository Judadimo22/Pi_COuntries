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
        <div className={Style.containerListActivities}>
            <div>
                <NavBar/>
            </div>
            <h3 className={Style.title}>List of activities</h3>
        {
           activities?.map(a => (
     <div className={Style.listContainer}>
        <ul key={a.id}>
            <li>Name:<span>{a.name}</span></li>
            <li>Difficulty:<span>{a.difficulty}</span></li>
            <li>Duration:<span>{a.duration} hs</span></li>
            <li>Season:<span>{a.season}</span></li>
            <li>Country: {a.countries.map(e => {
                if (a.countries.length > 1) return <span>{e.name},</span>
                return <span>{e.name}</span>
            })}</li>
            <li><button className='close' onClick={()=>handleDeleteActivity(a.id)}>Delete</button></li>
        </ul>
            </div>

           ))
        }
    </div>
    )
};

export default ListActivities;
