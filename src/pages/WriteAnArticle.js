import '../styles/WriteAnArticle.css';
import React, { useState } from 'react';
import ImageForm from './ImageForm';
import ArticleForm from './ArticleForm';

const WriteAnArticle = () => {

    const [ imageUploadStatus, setImageUploadStatus ] = useState(false);
    const [ uploadedImage, setUploadedImage ] = useState(null)

    return(        
        <>
            <br/><br/>
            <div>NAVBAR GAP</div>
            <h2>WriteAnArticle PAGE</h2>
            
            {
                imageUploadStatus ?
                    <ArticleForm
                        uploadedImage = {uploadedImage}
                    /> :
                    <ImageForm
                        setImageUploadStatus = {setImageUploadStatus}
                        setUploadedImage = {setUploadedImage}
                    />
            }

            
                

        </>
    )
}

export default WriteAnArticle