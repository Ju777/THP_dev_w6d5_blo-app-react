import React, { createContext } from 'react';

export default React.createContext({
    articlesCollection : [],
    updateArticlesCollection : (collection) => {}
});