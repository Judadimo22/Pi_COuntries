import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../../actions/actions';
import './Form.css';

function validateForm(input){
    const error = {};
    if(!input.name.length) error.name = <h3>Name is required</h3>;
    if(!input.difficulty.length) error.difficulty = <h3>Difficulty is required</h3>;
    if(!input.duration.length) error.duration = <h3>Duration is required</h3>;
    if(!input.season.length) error.season = <h3>Season is required</h3>;
    if(!input.countries.length>0) error.countries = <h3>Country is required</h3>;
    
    return error;
};

function Form() {

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

  return (
    <div>
      <form onSubmit={(e)=> handleSubmit(e)} className='form'>
        <div className='inputs'>
          <div>
            <label>Name </label>
            <input className='inputName' type='text' name='name' value={input.name} onChange={(e)=>handleInputChange(e)} required placeholder='Activity...'></input>
            
            <div className='error'>
              {error.name && <span>{error.name}</span>}
            </div>
                
          </div>
            
          <div>
            <label>Difficulty </label>
            <select name='difficulty' required onChange={(e)=>handleInputChange(e)} >
              <option value='' >Select difficulty</option>
              {
                difficulty.map(num => (
                  <option value={num}  key={num}>{num}</option>
                ))
              }
            </select>
            
            <div className='error'>
              {error.difficulty && <span>{error.difficulty}</span>}
            </div>

          </div>

          <div>
            <label>Duration </label>
            <select name='duration' required onChange={(e)=>handleInputChange(e)} >
              <option value='' >Select duration</option>
              {
                duration.map(n => (
                  <option value={n}  key={n} >{n}hs</option>
                ))
              }
            </select>

            <div className='error'>
              {error.duration && <span>{error.duration}</span>} 
            </div>

            </div>
            
            <div>
              <label>Season </label>
              <select name='season' required onChange={(e)=>handleInputChange(e)} >
                <option value='' >Select season</option>
                {
                  season.map(s => (
                    <option value={s}  key={s} >{s}</option>
                  ))
                }
              </select>

              <div className='error'>
              {error.season && <span>{error.season}</span>}
              </div>

            </div>
        </div>

            <div className='country'>
              <label>Country </label>
              <select name='countries' required onChange={(e)=> handleSelectCountry(e)}>
                <option value='' hidden >Select country</option>
                {
                  allCountries.map(c => (
                    <option value={c.name} key={c.id} >{c.name}</option>
                  ))
                }
              </select>

              <div className='error'>
              {error.countries && <span>{error.countries}</span>}
              </div>

            </div>
          

            <section className='area'>
              <div className='containerItems'>
                {
                input.countries?.map(country => (
                  <div className='items' key={country}>
                    <input className='close' type='button' value='X' onClick={()=>handleButtonDelete(country)}/>
                    <p>{country}</p>
                  </div>
                ))
                }
              </div>
                              
            </section>
                        
          
          <div>
            <button className='submit' type='submit'>Create</button>
          </div>

      </form>
    </div>
  )
};

export default Form;
