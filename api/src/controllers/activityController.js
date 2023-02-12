
const {Country, Activity} = require('../db')

const getActivities = async (req,res,next) => {
    let activities = await Activity.findAll({
        include: Country
    });
    try {
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
        });
    };
    res.status(200).send(activities)
    } catch (error) {
      res.status(400).send(next(error))
    }
}

const createActivity = async (req,res,next) => {
  let {
    name,
    difficulty,
    duration,
    season,
    countries
  } = req.body;

  try {
    if(name && difficulty && duration && season && countries){
      const validateActivity = await Activity.findOne({
        where: {
          name,
          difficulty,
          duration,
          season
        },
      });

      if(!validateActivity){
        const addActivity = await Activity.create({
          name,
          difficulty,
          duration,
          season
        });

        const matchCountry = await Country.findAll({
          where: {
            name: countries
          }
        });

        const results = await addActivity.addCountries(matchCountry);

        res.status(200).send(results);
      };

      const countryMatch = await Country.findAll({
        where: {
          name: countries
        }
      });

      const results = await validateActivity.addCountries(countryMatch);

      res.status(200).send(results);
    }
  } catch (error) {
    res.status(400).send(next(error))
    
  }
}

// async function createActivity(req, res){

//   let { name, difficulty, duration, season, countries } = req.body;  
  
//   try {
  
//   if(name && difficulty && duration && season && countries){
  
//     name = name.charAt(0).toUpperCase()+name.slice(1).toLowerCase();
    
//       const validAct = await Activity.findOne({                  //Compruebo si ya existe dicha actividad...
//         where: {
//           name,
//           difficulty,
//           duration,
//           season
//         },
//         attributes: {exclude: ['updatedAt', 'createdAt']} 
//       });
    
//       if (!validAct) {
    
//         const addAct = await Activity.create({                //Creo la actividad y luego busco su pais para conectarlos...
//           name,
//           difficulty,
//           duration,
//           season
//         });
        
//         const matchCountry = await Country.findAll({
//           where: {
//             name: countries,
//           }
//         });
    
//         const result = await addAct.addCountries(matchCountry);
    
//         return res.status(200).send(result);
//       };
    
    
//       //Busco pais que coincida para conectar la actividad existente..
    
//       const countryMatch = await Country.findAll({
//         where: {
//           name: countries,
//         },
//       });
     
    
//       const result = await validAct.addCountries(countryMatch);
    
//       return res.status(200).send(result);
    
      
//     }
//   } catch (error) {
//       res.status(400).send('No info in Data Base');
//     }
//   };



module.exports = {
    getActivities,
    createActivity
}