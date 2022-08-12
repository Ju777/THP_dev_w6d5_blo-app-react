// import '../styles/WriteAnArticle.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function convertToSlug(text){
    return text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
            ;
}

const ArticleForm = ({uploadedImage}) => {

    const [ allUploadedImages, setAllUploadedImages ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ content, setContent ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ categoriesList, setCategoriesList ] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        fetch('http://localhost:1337/api/upload/files')
            .then(response => response.json())
            .then(data => {
                console.log('fetchUploadFolder() => ', data);
                setAllUploadedImages(data);
            })

        fetch('http://localhost:1337/api/categories')
        .then(response => response.json())
        .then(data => {
            console.log('fetchCategoriesList() => ', data.data);
            setCategoriesList(data.data);
        })
    }, [])

    const handleSubmitPOST = (e) => {
        e.preventDefault();
        console.log(title, description, content, uploadedImage.id, category.id);

        const articleToPOST = {
            title: title,
            description: description,
            slug: convertToSlug(title),
            content: content,
            image: uploadedImage.id,
            categories: category
        }

        fetch('http://localhost:1337/api/articles', {
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({
                data: articleToPOST
            }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            console.log(error.message);
        })
        
        navigate("/");
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleSelectChange = (e) => {
        console.log(e.target.value);

        categoriesList.map(category => {
            // category.attributes.name === e.target.value ? setCategory(category) :  setCategory("unknown")
            // console.log('dans le map', typeof category.attributes.name)
            if (category.attributes.name === e.target.value) {
                console.log("ca match => ", category.attributes.name, e.target.value);
                setCategory(category);
            } 
        })

        

        // setCategory(e.target.value);
        
    }

    return(        
        <>
            <button onClick = { () => console.log(allUploadedImages)}>CLICK</button>
            <form onSubmit = { (e)=> handleSubmitPOST(e)}>
                    <div>
                        <label htmlFor="title">
                            Title : <input
                                type = "text"
                                id = "title"
                                name = "title"
                                onChange = { (e) => handleTitleChange(e)}/>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="description">
                            Description : <textarea
                                id = "description"
                                name = "description"
                                onChange = { (e) => handleDescriptionChange(e)}>
                            </textarea>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="content">
                            Content : <textarea
                                id = "content"
                                name = "content"
                                onChange = { (e) => handleContentChange(e)}>
                            </textarea>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="category">
                            <select
                                id = "select"
                                name = "select"
                                onChange = { (e) => handleSelectChange(e)}
                                defaultValue = "-- choose category --">
                                    <option> -- choose category -- </option>
                                    {/* <option> cooking </option>
                                    <option> techno </option>
                                    <option> culture </option> */}
                                    {
                                        categoriesList.map(category => (
                                            <option>{category.attributes.name}</option>
                                        ))
                                    }
                            </select>
                        </label>
                    </div>


                    <div>
                        <input type = "submit" value = "POST"/>
                    </div>

                    

                </form>
                {/* <button onClick = { () => {console.log('categoriesList', categoriesList)}}>DISPLAY categoriesList</button> */}

        </>
    )
}

export default ArticleForm