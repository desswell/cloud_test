import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {MainPage} from "../src/pages/MainPage";
import '../src/styles/mainPage.css'
import {FirstPage} from "../src/pages/FirstPage";
import '../src/styles/stepper.css'
import '../src/styles/firstPage.css'
import {SecondPage} from "../src/pages/SecondPage";
import '../src/styles/secondPage.css'
import '../src/styles/App.css'
import {ThirdPage} from "../src/pages/ThirdPage";
import '../src/styles/thirdPage.css'
function App() {
    return (
        <div>
            <BrowserRouter basename='/'>
                <Routes>
                    <Route exact path='/' element={<MainPage/>}/>
                    <Route exact path='/1' element={<FirstPage/>}/>
                    <Route exact path='/2' element={<SecondPage/>}/>
                    <Route exact path='/3' element={<ThirdPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
