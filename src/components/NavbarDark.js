import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Navbar.css';
import '../assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf';

const NavbarDark = ({theme, setTheme}) => {
    return(
        <>
            <nav className='nav-dark'>
                <div><Link to = "/" className='link-navbar-dark'>BLOG</Link></div>
                {/* <div><Link to = "/blog">BLOG (articles)</Link></div> */}
                {/* <div><Link to = "/write-an-article">ECRIRE UN ARTICLE</Link></div> */}
                <div><Link to = "/contact" className='link-navbar-dark'>CONTACT</Link></div>
                {/* <div>
                    {   
                        theme ?
                            <button onClick = { () => setTheme(!theme)} >MODE NUIT</button> :
                            <button onClick = { () => setTheme(!theme)} >MODE JOUR</button>
                    }

                </div> */}
                <div className='sun-background' onClick = { () => setTheme(!theme)}>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default NavbarDark;
