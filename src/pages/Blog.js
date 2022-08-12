import '../styles/Blog.css';
import '../assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import HeroDark from '../components/HeroDark';
import HeroLight from '../components/HeroLight';
import defaultImage from '../assets/images/default-image.jpg'

const Blog = ({theme}) => {

    const [ allArticles, setAllArticles ] = useState([]);

    useEffect( () => {
        console.log('defaultImage => ', defaultImage);

        fetch("http://localhost:1337/api/articles?populate=*", { 'Content-Type:': 'Application/JSON', method: "GET"})
          .then(response => response.json())
          .then(data => {
            console.log('fetched data => ', data);
            setAllArticles(data.data);
          })
          .catch(error => console.log('fetched error => ', error.message))
      }, []);

      const displayDefaultImage = () => {
        // console.log()
        return(
            <img src = {defaultImage} alt="default" className='image-article'/>
        )
      }

    return(
        <>
            {/* <div>NAVBAR GAP</div>
            <h2>BLOG PAGE</h2> */}
            
                {
                    theme ? <HeroLight/> : <HeroDark/>
                }
                
                

                <div id = "blog-container">
                {/* <h2>BLOG</h2> */}
                {
                    allArticles.map(article => (
                        <Link to = {`/blog/${article.attributes.slug}`} className={theme ? "link-article-card-light" : "link-article-card-dark"}>
                            <div key = {nanoid()} className='article-card'>
                                {
                                    article.attributes.categories.data.map(category => (
                                        <small
                                            key = {nanoid()}
                                            className = "badge"
                                        >
                                            {category.attributes.name}
                                        </small>
                                    ))
                                }

                                <p key = {nanoid()} >{article.attributes.title}</p>

                                <div className='image-article-container'>
                                    {/* <Link to = {`/blog/${article.attributes.slug}`}> */}
                                        {
                                            article.attributes.image.data === null ?
                                            displayDefaultImage :
                                                <img 
                                                    src = {"http://localhost:1337" + article.attributes.image.data.attributes.url}alt="default" 
                                                    className='image-article'/>      
                                        }
                                    {/* </Link> */}
                                </div>
                                
                                
                                <p key = {nanoid()} >{article.attributes.description}</p>
                   
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default Blog;
