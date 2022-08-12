import React from 'react';
import '../styles/Hero.css';
import typewriter from '../assets/images/hero-image-typewriter.jpg';
import { Link } from 'react-router-dom'

const HeroDark = () => {
    return(
        <div id = "hero-container">
            <img src={typewriter} alt="typewriter" className='image-hero'/>
            <div id = "call-to-action-container-dark">
                <h1>Illuminez vos idées ... </h1>

                <Link to = "/write-an-article">
                    <button
                        id="call-to-action-button-dark"
                        className='btn btn-outline-warning'> ... écrivez.</button>
                </Link>

            </div>
            <div id="halo"></div>
        </div>
    )
}

export default HeroDark;