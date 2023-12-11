import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getArticlesApi } from "../../Backend/articles";
import { toObject } from "../../Utilities/Utility";
import { gridViewType } from "../../Utilities/Constants";

const initialState = {
    lists: {},
    totalCount: 0,
    page: 1,
    size: 30,
    loading: false,
    viewType: gridViewType
}

export const getArticlesApiThunk = createAsyncThunk(
    'getArticles',
    async ({ size, page }, thunkAPI) => new Promise( (res, rej) => setTimeout(() => res(getArticlesApi(size, page)), 1000) )
)

export const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setViewType: (state, action) => {
            state.viewType = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(getArticlesApiThunk.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getArticlesApiThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.lists = {
                ...state.lists,
                ...toObject(action.payload, 'id')
            }
        })
})

export const { setPage: setPageReducer, setViewType: setViewTypeReducer } = articleSlice.actions;

export const listsSelector = state => state.articles.lists;
export const totalCountSelector = state => state.articles.totalCount;
export const pageSelector = state => state.articles.page;
export const sizeSelector = state => state.articles.size;
export const loaderSelector = state => state.articles.loading;
export const viewTypeSelector = state => state.articles.viewType;


export default articleSlice.reducer;