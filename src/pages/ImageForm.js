// import '../styles/WriteAnArticle.css';
import React, { useState } from 'react';

const ImageForm = ({setImageUploadStatus, setUploadedImage}) => {

    const [ imageToUpload, setImageToUpload ] = useState(null);

    const handleUpload = (e) => {
        console.log('fichier à uploader => e.target.files[0]', e.target.files[0]);
        setImageToUpload(e.target.files[0]);
        // setUploadedFileName(e.target.files[0].name);
    }

    const handleSubmitUpload = (e) => {
        e.preventDefault();
        console.log("Vérif avant submit : imageToUpload", imageToUpload);

        const data = new FormData();
        data.append('files', imageToUpload);
        // console.log('data', data);

        fetch("http://localhost:1337/api/upload", {
            method: "POST",
            // headers: {'Content-Type': 'image/jpeg'}, le header fait planter l'upload.
            body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log('image Uploadée => ', data[0]);
            setUploadedImage(data[0]);
        })
        
        .catch(error => console.log(error.message))

        setImageUploadStatus(true);
        // setUploadedImage(imageToUpload);
        alert("L'image a été uploadée, passez à l'article.")
        // fetchUploadFolder();
        // getUploadedImageId();
    }

    return(        
        <>
            IMAGE FORM

            <form onSubmit = { (e) => handleSubmitUpload(e) }>
                <input type = "file" onChange = { (e) => handleUpload (e) }/>
                <input type = "submit" value = "UPLOAD!"/>
            </form>

        </>
    )
}

export default ImageForm