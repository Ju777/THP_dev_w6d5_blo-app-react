import './App.css';
// import './assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarLight from './components/NavbarLight';
import NavbarDark from './components/NavbarDark'; 
import Blog from './pages/Blog';
import WriteAnArticle from './pages/WriteAnArticle';
import Article from './pages/Article';
import Contact from './pages/Contact';

function App() {

  const [ theme, setTheme ] = useState(true)

  return (
  
   <div className={`light-${theme.toString()}`}>
    <BrowserRouter>
      <Routes>
        
        <Route path = "/" element = { theme ?
                                      <NavbarLight theme = {theme} setTheme = {setTheme}/> :
                                      <NavbarDark theme = {theme} setTheme = {setTheme}/>
                                    }> 
          <Route index element = {<Blog theme = {theme}/>}/>
          <Route path = "/blog/:articleSlug" element = {<Article/>}/>
          <Route path = "/write-an-article" element = {<WriteAnArticle/>}/>
          <Route path = "contact" element = {<Contact/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
