import React from 'react';
import '../styles/Hero.css';
import typewriter from '../assets/images/hero-image-typewriter.jpg';
import pencil from '../assets/images/hero-image-pencil.jpg';
import { Link } from 'react-router-dom'

const HeroLight = () => {
    return(
        <div id = "hero-container">
            <img src={pencil} alt="typewriter" className='image-hero'/>
            <div id = "call-to-action-container-light">
                <h1>Gardez bonne mine ...</h1>

                <Link to = "/write-an-article">
                    <button
                        id="call-to-action-button-light"
                        className='btn btn-warning'> ... écrivez.</button>
                </Link>

            </div>
           
        </div>
    )
}

export default HeroLight;