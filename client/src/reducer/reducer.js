import {
     GET_COUNTRIES,
     GET_ACTIVITIES,
     GET_COUNTRY_BY_NAME,
     GET_COUNTRY_BY_ID,
     FILTER_ACTIVITY,
     FILTER_BY_CONTINENT,
     ORDER_COUNTRIES, 
     FILTER_BY_POPULATION
} from '../actions/actions'

let initialState = {
    allCountries: [],
    countries:[],
    activities: [],
    detail: [],
};

const rootReducer = (state= initialState, action) => {
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                allCountries: action.payload,
                countries: action.payload
            };

        case GET_COUNTRY_BY_NAME:
            return{
                ...state,
                allCountries: action.payload
            };

        case GET_COUNTRY_BY_ID:
            return{
                ...state,
                detail: action.payload
            };

        case GET_ACTIVITIES:
            return{
                ...state,
                activities: action.payload
            };


        case ORDER_COUNTRIES:
            if(action.payload === 'A-Z'){
                return{
                    ...state,
                    allCountries: [...state.allCountries].sort((prev, next) => {
                        if(prev.name > next.name) return 1
                        if(prev.name < next.name) return -1
                        return 0
                    })
                }
            };

            if(action.payload === 'Z-A'){
                return{
                    ...state,
                    allCountries: [...state.allCountries].sort((prev, next) => {
                        if(prev.name > next.name) return -1
                        if(prev.name < next.name) return 1
                        return 0
                    })
                }
            };

            if(action.payload === 'Min Population'){
                return{
                    ...state,
                    allCountries: [...state.allCountries].sort((prev, next) => prev.population - next.population )
                }
            };

            if(action.payload === 'Max Population'){
                return{
                    ...state,
                    allCountries: [...state.allCountries].sort((prev, next) => next.population - prev.population)
                }
            };

            if(action.payload === 'Max Area'){
                return{
                    ...state,
                    allCountries: [...state.allCountries].sort((prev, next) => next.area - prev.area )
                }
            }



                return{
                    ...state,
                    allCountries: state.countries
                };


        case FILTER_ACTIVITY:
            let activity = state.activities;
            let filter = activity.length && action.payload === 'All' ? state.countries.filter(e => e.activities.length > 0) : state.countries.filter(e => e.activities.find(el => el.name === action.payload));
            if(filter.length){
                return{
                    ...state,
                    allCountries: filter
                }
            };

            return{
                ...state,
                allCountries: state.countries
            };

        case FILTER_BY_CONTINENT:
            let continents = state.countries;
            continents =  continents && action.payload === 'All' ? continents : continents.filter(e => e.continent === action.payload);

    
            return{
                ...state,
                allCountries: continents
            };

        default:
             return state;

    }
}

export default rootReducer;

