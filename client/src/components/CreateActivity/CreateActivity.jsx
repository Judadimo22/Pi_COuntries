import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../../actions/actions";
import Style from './CreateActivity.module.css';
import { Link } from "react-router-dom";

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
    const allCountries = useSelector((state)=> state.backupCountries).sort((a, b) => {
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
        dispatch(postActivity(input));
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
    const duration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const season = ['Winter', 'Spring', 'Autumn', 'Summer'];
    return(
        <div>
            <div className={Style.containerHome}>
            <div>
                <div className={Style.containerFilters}>
                    <Link to={'/home'}>
                    <button className={Style.buttonHome}></button>
                    <h5 className={Style.textHome}>Home</h5>
                    </Link>

                </div>



            </div>


        </div>
            <form onSubmit={(e) => handleSubmit(e)} className={Style.form}>
                <div className={Style.inputs}>
                    <div>
                        <label>Name</label>
                        <input className={Style.inputName} type="text" name="name" value={input.name} onChange={(e) => handleInputChange(e)} placeholder='Activity'></input>
                        <div className={Style.error}>
                            {error.name && <span>{error.name}</span>}
                        </div>
                    </div>

                    <div>
                        <label>Difficulty</label>
                        <select name="difficulty" required onChange={(e) => handleInputChange(e)}>
                            <option value="">Select difficulty</option>
                            {
                                difficulty.map(num => (
                                    <option value={num} key={num}>{num}</option>
                                ))
                            }
                        </select>
                        <div className={Style.error}>
                            {error.difficulty && <span>{error.difficulty}</span>}
                        </div>
                    </div>

                    <div>
                        <label>Duration</label>
                        <select name="duration" required onChange={(e) => handleInputChange(e)}>
                            <option value="">Select duration</option>
                            {
                                duration.map(n => (
                                    <option value={n} key={n}>{n}hs</option>
                                ))
                            }
                        </select>
                        <div className={Style.error}>
                            {error.duration && <span>{error.duration}</span>} 
                        </div>
                    </div>

                    <div>
                        <label>Season</label>
                        <select name="season" required onChange={(e) => handleInputChange(e)}>
                            <option value="">Select season</option>
                            {
                                season.map(season => (
                                    <option value={season} key={season}>{season}</option>
                                ))
                            }
                        </select>
                        <div className={Style.error}>
                            {error.season && <span>{error.season}</span>}
                        </div>
                    </div>
                </div>

                <div className={Style.country}>
                    <label>Country</label>
                    <select name="countries" required onChange={(e) => handleSelectCountry(e)}>
                        <option value="" hidden>Select Country</option>
                        {
                            allCountries.map(country => (
                                <option value={country.name} key={country.id}>{country.name}</option>
                            ))
                        }
                    </select>
                    <div className={Style.error}>
                        {error.countries && <span>{error.countries}</span>}
                    </div>
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

                <div>
                    <button className={Style.submit} type="submit">Create Activity</button>
                </div>
            </form>
        </div>
    )
}

