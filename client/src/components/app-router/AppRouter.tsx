import React, {FC} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "../../pages/home/Home";
import {Recommendations} from "../../pages/recommendations/Recommendations";
import {Audio} from "../../pages/audio/AudioList";
import {Profile} from "../../pages/profile/Profile";

const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={Home}/>
                <Route path='/audio' element={Audio}/>
                <Route path='/recommendations' element={Recommendations}/>
                <Route path='/me' element={Profile}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;