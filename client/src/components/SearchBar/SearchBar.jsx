import react from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountryByName } from '../../actions/actions';
import Style from './SearchBar.module.css'

const SearchBar = ({setPage}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInput = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getCountryByName(name));
        setPage(1);
        setName('');
    };

    return(
        <div className={Style.SearchBar}>
            <button className={Style.button} type='submit' onClick={(e) => handleClick(e)}> <ion-icon name="search-outline"></ion-icon></button>
            <input className={Style.input} div type="text" placeholder='Country' value={name} onChange={(e) => handleInput(e)} />

        </div>
    )
}

export default SearchBar