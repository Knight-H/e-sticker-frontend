import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";

function App() {
    return (
        <div className="App">
            <NavBarComponent />
            <Switch>
                <Route path="/" exact component={HomeComponent} />
            </Switch>
        </div>
    );
}

export default App;
