import '../styles/Article.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Showdown  from 'showdown';
const converter = new Showdown.Converter();

const Article = () => {

    const [ articleToDisplay, setArticleToDisplay ] = useState('');
    const [ articleID, setArticleID ] = useState(null);
    const caughtSlug = useParams().articleSlug;
    const [ editButton, setEditButton ] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        fetch(`http://localhost:1337/api/articles?filters[slug][$eq]=${caughtSlug}`,
                {'Content-Type': 'Application/JSON', method: "GET"})
        .then(response => response.json())
        .then(data => {
            console.log('article fetched', data.data[0]);
            setArticleID(data.data[0].id);
            setArticleToDisplay(data.data[0].attributes);
        })
        .catch(error => console.log(error.message))
    }, [])

    const articleLayout = () => {
        const convertedContent = converter.makeHtml(articleToDisplay.content);
        return(
            <>
                <p>Créé le {articleToDisplay.createdAt}</p>
                <p>Title : {articleToDisplay.title}</p>
                {/* {
                    articleToDisplay.categories.data.map(category => (
                        <small
                            // key = {nanoid()}
                            className = "badge"
                        >
                            {category.attributes.name}
                        </small>
                    ))
                } */}
                <p>Descr : {articleToDisplay.description}</p>
                <p dangerouslySetInnerHTML={createMarkup(convertedContent)}></p>
                <p>Image URL : {articleToDisplay.imageUrl}</p>
                <button onClick = { () => switchEditButton() }>EDIT</button>
                <button onClick = { () => handleDelete() }>DEL</button>
            </>
        )
    }

    function createMarkup(convertedContent) {
        return {__html: convertedContent};
    }

    const handleDelete = () => {
        if (window.confirm("Confirm delete ?")) {
            fetch(`http://localhost:1337/api/articles/${articleID}`, {
                method: "DELETE"
                })
            console.log("IF");
        } else {
            console.log("ELSE");
        }

        navigate("/");
    }

    const switchEditButton = () => {
        setEditButton(!editButton);
        console.log(editButton);
    }

    const displayEditPanel = () =>{
        return(
            <>
                <p>EDIT PANEL</p>
                <form onSubmit = { (e)=> handleSubmitPUT(e)}>
                    <div>
                        <label htmlFor="title">
                            Title : <input
                                type = "text"
                                id = "title"
                                name = "title"
                                value = {articleToDisplay.title}
                                onChange = { (e) => handleTitleChange(e)}

                                />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="description">
                            Description : <textarea
                                id = "description"
                                name = "description"
                                value = {articleToDisplay.description}
                                onChange = { (e) => handleDescriptionChange(e)}
                                >
                            </textarea>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="content">
                            Content : <textarea
                                id = "content"
                                name = "content"
                                value = {articleToDisplay.content}
                                onChange = { (e) => handleContentChange(e)}
                                >
                            </textarea>
                        </label>
                    </div>

                    <div>
                        <input type = "submit" value = "PUT"/>
                    </div>
                </form>
            </>
        )
    }

    const handleTitleChange = (e) => {
        console.log(e.target.value);
        setArticleToDisplay({...articleToDisplay, title: e.target.value});
    }

    const handleDescriptionChange = (e) => {
        console.log(e.target.value);
        setArticleToDisplay({...articleToDisplay, description: e.target.value});
    }

    const handleContentChange = (e) => {
        console.log(e.target.value);
        setArticleToDisplay({...articleToDisplay, content: e.target.value});
    }

    const handleSubmitPUT = (e) => {
        e.preventDefault();
        console.log('articleToDisplay d\'APRES SUBMIT', articleToDisplay);

        fetch(`http://localhost:1337/api/articles/${articleID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {data: articleToDisplay}
                )
        })
        .then(response => response.json())
        .then(data => console.log('data DU PUT', data))
        .catch(error => console.log(error.message))

        switchEditButton();
    }

    return(
        <>
            <div>NAVBAR GAP</div>
            <h2>ARTICLE PAGE</h2>
            <p>useParams().articleSlug = {caughtSlug}</p>
            <p>articleToDisplay.slug = {articleToDisplay.slug}</p>
            {
                editButton ? displayEditPanel() : articleLayout()
            }
        </>
    )
}

export default Article;
