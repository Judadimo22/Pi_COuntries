import React from 'react';
import {Link} from 'react-router-dom';
import  Style  from './LandingPage.module.css';
import imagenBanner from '../../img/297005.jpg'
import NavBar from '../NavBar/NavBar';

const LandingPage = () => {
    return(
        <div className={Style.containerLanding}>
                <div className={Style.bannerLanding}>
                     <img src={imagenBanner} alt="" />
                     <h1 className={Style.titleLanding}> ¿ What do you know about countries ?</h1>
                     <Link to={'/home'}>
                     <button className={Style.buttonGoHome}></button>
                     </Link>
                     <h5 className={Style.textHome}>Home</h5>
                </div>


        </div>

    )
}

export default LandingPage;