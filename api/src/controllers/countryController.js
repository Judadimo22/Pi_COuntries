const {Country, Activity} = require('../db')
const axios = require('axios');

const addCountriesToDb = async () => {
    try {
        const infoDb = await Country.findAll({
            include: Activity
        });
    
        if(infoDb.length) return infoDb;
    
        let infoApi = await axios.get('https://restcountries.com/v3/all');
        let resultsApi = infoApi.data.map(country => {
            return{
                name: country.name.common,
                id: country.cca3,
                flag: country.flags[1] ? country.flags[1] : 'Empty flag',
                continent: country.continents.toString(),
                capital: country.capital ? String(country.capital[0]) : 'No capital found',
                subregion: country.subregion ? country.subregion : 'No subregion found',
                area: country.area,
                population: country.population,
    
            }
        });
    
        resultsApi.forEach(async (country) => {
            await Country.findOrCreate({
                where:{
                    id: country.id
                },
                defaults:{
                    name: country.name,
                    flag: country.flag,
                    continent: country.continent,
                    capital: country.capital,
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population
    
                }
            })
        });
    
        const countries = await Country.findAll({
            include: Activity
        });
        return countries; 
    } catch (error) {
        return res.status(400).send('No found data in the database')
    }

}

const getCountryByName = async (req,res) => {
    let allCountries = await addCountriesToDb();

    const {name} = req.query;
    
    try {
        if(name){
            let countryName = allCountries.filter(country => country.name.toLowerCase().startsWith(name.toLowerCase()));
            if(countryName) res.status(200).send(countryName);
    
        }else{
            res.status(200).send(allCountries)
        }
    } catch (error) {
        return res.status(400).send(error, 'No country found by name')
    }

}


const getCountryById = async (req,res) => {
    let {id} = req.params;
    id = id.toUpperCase();

    try {
        if(id){
            let countryMatchId = await Country.findByPk(id, {
                include:Activity
            });
    
            countryMatchId={
                name: countryMatchId.name,
                id: countryMatchId.id,
                flag: countryMatchId.flag,
                continent: countryMatchId.continent,
                capital: countryMatchId.capital,
                subregion: countryMatchId.subregion,
                area: countryMatchId.area,
                population: countryMatchId.population,
                activities: countryMatchId.activities.map((activity) => {
                    return{
                        name: activity.name,
                        id: activity.id,
                        difficulty: activity.difficulty,
                        duration: activity.duration,
                        season: activity.season
    
                    }
                })
            };
    
            if(countryMatchId) res.status(200).send(countryMatchId);
        };
    } catch (error) {
        res.status(400).send('No country found by ID')
    }
    
};


module.exports = {
    getCountryByName,
    getCountryById
}

