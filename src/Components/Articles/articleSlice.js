import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articles: {}
}

export const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addArticles: (state, action) => {
            state.articles = {
                ...state.articles,
                ...action.payload
            }
        }
    }
})

export const { addArticles } = articleSlice.actions;

export const articles = state => state.articles.articles;

export default articleSlice.reducer;