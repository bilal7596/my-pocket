import React from "react"
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

const SaveComponent = React.lazy(() => import("./Pages/SavePage"));

const NoMatch = () => <div>
    <h2>It looks like you're lost...</h2>
    <p>
        <Link to="/">Go to the home page</Link>
    </p>
</div>


const Router = () => <BrowserRouter>
    <Routes>
        <Route path={"/"} element={ <Layout /> }  >
            <Route index element={ <Navigate to="/saves" /> } />
            <Route path="saves" >
                <Route index element={ <SaveComponent /> } />
                <Route path="archive" element={ <SaveComponent /> } />
                <Route path="favorite" element={ <SaveComponent /> } />
                <Route path="highlights" element={ <SaveComponent /> } />
                <Route path="articles" element={ <SaveComponent /> } />
                <Route path="videos" element={ <SaveComponent /> } />
                <Route path="tags" element={ <SaveComponent /> } />
            </Route>
            <Route path="home" element={ <SaveComponent /> } />
            <Route path="discover" element={ <SaveComponent /> } />
            <Route path="collection" element={ <SaveComponent /> } />
            <Route path="*" element={ <NoMatch /> } />
        </Route>
    </Routes>
</BrowserRouter>

export default Router;