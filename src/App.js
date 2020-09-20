import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import Order1ProductConfigComponent from "./components/order-1-product-config"



function App() {
    return (
        <div className="App">
            <NavBarComponent />
            <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/order-1-product-config" component={Order1ProductConfigComponent} />
            </Switch>
        </div>
    );
}

export default App;
