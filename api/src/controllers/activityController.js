
const {Country, Activity} = require('../db')

const getActivities = async (req,res,next) => {
    let activities = await Activity.findAll({
        include: Country
    });

    if(activities){
        activities = activities.map(activity => {
            return{
                name: activity.name,
                id: activity.id,
                difficulty: activity.difficulty,
                duration: activity.duration,
                season: activity.season,
                countries: activity.countries.length ? activity.countries.map(e => {
                    return{
                        name: e.name,
                        flag: e.flag
                    }
                }) : 'No country match'
            }
        })
    };
    res.status(200).send(activities)
}

const createActivity = async(req, res) =>{
  let{
    name,
    difficulty,
    duration,
    season,
    countries
  } = req.body;
  
  try {
  
  if(name && difficulty && duration && season && countries){

    name = name.charAt(0).toUpperCase()+name.slice(1).toLowerCase();
    
    const validateActivity = await Activity.findOne({
      where:{
        name,
        difficulty,
        duration,
        season
      }
    });
    
    if(!validateActivity){
      const addActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season
      });

      const matchCountry = await Country.findAll({
        where:{
          name: countries
        }
      });

      const results = await addActivity.addCountries(matchCountry);

      return res.status(200).send(results);
    };

    const countryMatch = await Country.findAll({
      where:{
        name: countries
      }
    });

    const results = await validateActivity.addCountries(countryMatch);

    return res.status(200).send(results);
    
  }
  } catch (error) {
      res.status(400).send('No info in Data Base');
    }
  };

  const deleteActivity = async (req,res) => {
    const {id} = req.params;
    try {
      if(id){
        await Activity.destroy({
          where:{
            id: `${id}`
          }
        })

        return res.status(200).send({message: 'Activity deleted'})
      };

      return res.status(400).send({message:'An error has ocurred'});
    } catch (error) {
      res.status(400).send('No found ID for delete')
    }
  };




module.exports = {
    getActivities,
    createActivity,
    deleteActivity,
}