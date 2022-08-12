import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({theme, setTheme}) => {
    return(
        <>
            <nav>
                <div><Link to = "/">BLOG</Link></div>
                {/* <div><Link to = "/blog">BLOG (articles)</Link></div> */}
                {/* <div><Link to = "/write-an-article">ECRIRE UN ARTICLE</Link></div> */}
                <div><Link to = "/contact">CONTACT</Link></div>
                <div>
                    {   
                        theme ?
                            <button onClick = { () => setTheme(!theme)}>MODE NUIT</button> :
                            <button onClick = { () => setTheme(!theme)}>MODE JOUR</button>
                    }

                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar;
