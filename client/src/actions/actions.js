import axios from 'axios';
export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_COUNTRY_BY_NAME = 'GET_BY-NAME';
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const ORDER_COUNTRIES = 'ORDER_COUNTRIES';



export const getCountries = () => {
    try {
        return async (dispatch) =>{
            let info = await axios.get('http://localhost:3001/countries');
            return dispatch ({
                type: GET_COUNTRIES,
                payload: info.data

            })

        }
        
    } catch (error) {
        console.log(error);
        
    }
};

export const getActivities = () => {
    try {
        return async (dispatch) =>{
            let info = await axios.get('http://localhost:3001/activities');
            return dispatch({
                type: GET_ACTIVITIES,
                payload: info.data
            })
        }
        
    } catch (error) {
        
    }
}

export const getCountryByName = (name) => {
    try {
        return async (dispatch) => {
            let info = await axios.get(`http://localhost:3001/countries?name=${name}`);
            return dispatch({
                type: GET_COUNTRY_BY_NAME,
                payload: info.data
            })
        }
        
    } catch (error) {
        
    }
};

export const getCountryById = (id) => {
    try {
        return async (dispatch) => {
            let info = await axios.get(`http://localhost:3001/countries/${id}`);
            return dispatch({
                type: GET_COUNTRY_BY_ID,
                payload: info.data
            })
        }
        
    } catch (error) {
        
    }
};

export function postActivity(input) {
    return async function () {       
        return await axios.post('http://localhost:3001/activities', input);    
    }
};

export const filterActivity = (payload) => {
    try {
        return{
            type: FILTER_ACTIVITY,
            payload
        }
        
    } catch (error) {
        
    }
};

export const filterByContinent = (payload) => {
    try {
        return{
            type: FILTER_BY_CONTINENT,
            payload
        }
        
    } catch (error) {
        
    }
}

export const orderCountries = (payload) => {
    try {
        return{
            type: ORDER_COUNTRIES,
            payload

        }
        
    } catch (error) {
        
    }
}