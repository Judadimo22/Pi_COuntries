import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, createActivity } from "../../actions/actions";
import Style from './CreateActivity.module.css';
import NavBar from "../NavBar/NavBar";

const validateForm = (input) => {
    const error = {};
    if(!input.name.length) error.name = <h3>Name is required</h3>;
    if(!input.difficulty.length) error.difficulty = <h3>Difficulty is required</h3>;
    if(!input.duration.length) error.duration = <h3>Duration is required</h3>;
    if(!input.season.length) error.season = <h3>Season is required</h3>;
    if(!input.countries.length) error.countries = <h3>Country is required</h3>;
    
    return error;

};

export default function CreateActivity() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state)=> state.countries).sort((a, b) => {
      if(a.name < b.name){
          return -1;
      }
      if(a.name > b.name){
          return 1;
      }
      return 0;
  });

  useEffect(()=>{
    dispatch(getCountries());
  },[dispatch]);


    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    });

    
    const [error, setError] = useState({});

    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setError(validateForm({
            ...input,
            [e.target.name]: e.target.value
        })
        )
    };


    
    function handleSelectCountry(e) {
      if(!input.countries.includes(e.target.value)) {
        
        setInput({
          ...input,
          countries: [...input.countries, e.target.value]
        });
           
        setError(validateForm({
          ...input,
          [e.target.name]: e.target.value
        })
        );
      }

      else {alert('Country in use');}
      
    };


    function handleSubmit(e){
      e.preventDefault();
      if(input.countries.length>0 && input.name && input.difficulty && input.duration && input.season){
        dispatch(createActivity(input));
        alert("Activity created");
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []
        });
      }
        else alert('Complete all fields');
    };


    function handleButtonDelete(countryDel){
      setInput({
        ...input,
        countries: input.countries.filter(c => c !== countryDel)
      })
    };



    const difficulty = [1, 2, 3, 4, 5];
    const season = ['Winter', 'Spring', 'Autumn', 'Summer'];
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className={Style.form}>
                <h3 className={Style.titleCreate}>Create an activity</h3>
                <div className={Style.inputs}>
                    <div className={Style.containerOptions}>
                        <label>Name</label>
                        <input className={Style.inputName} type="text" name="name" value={input.name} onChange={(e) => handleInputChange(e)} placeholder='Activity'></input>
                    </div>

                    <div className={Style.error}>
                            {error.name && <span>{error.name}</span>}
                        </div>

                    <div className={Style.containerOptions}>
                        <label>Difficulty</label>
                        <select name="difficulty" required onChange={(e) => handleInputChange(e)}>
                            <option value="">Select difficulty</option>
                            {
                                difficulty.map(num => (
                                    <option value={num} key={num}>{num}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className={Style.error}>
                            {error.difficulty && <span>{error.difficulty}</span>}
                        </div>

                    <div className={Style.containerOptions}>
                        <label>Duration</label>
                        <input className={Style.inputDuration} type="text" name="duration" value={input.duration} onChange={(e) => handleInputChange(e)} placeholder='Duration'></input>
                    </div>

                    <div className={Style.error}>
                            {error.name && <span>{error.duration}</span>}
                        </div>

                    <div className={Style.containerOptions}>
                        <label>Season</label>
                        <select name="season" required onChange={(e) => handleInputChange(e)}>
                            <option value="">Select season</option>
                            {
                                season.map(season => (
                                    <option value={season} key={season}>{season}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className={Style.error}>
                            {error.season && <span>{error.season}</span>}
                        </div>

                    <div className={Style.containerOptions}>
                        <label >Country</label>
                        <select name="countries" required onChange={(e) => handleSelectCountry(e)}>
                            <option value="" hidden>Select Country</option>
                            {
                                allCountries.map(country => (
                                      <option value={country.name} key={country.id}>{country.name}</option>
                            ))
                        }
                       </select>
                   </div>

                   <div className={Style.error}>
                        {error.countries && <span>{error.countries}</span>}
                    </div>

                <section className={Style.area}>
                    <div className={Style.containerItems}>
                        {
                            input.countries?.map(country => (
                                <div className={Style.items} key={country}>
                                    <input className={Style.close} type="button" value="X" onClick={()=>handleButtonDelete(country)} />
                                    <p>{country}</p>
                                </div>
                            ))
                        }
                    </div>
                </section>

                </div>
                                
                <div className={Style.containerButton}>
                    <button className={Style.submit} type="submit">Create Activity</button>
                   </div>
            </form>

            </div>
    )
}

