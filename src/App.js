import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import Order1ProductConfigComponent from "./components/order-1-product-config"


import ShoppingComponent from "./components/shopping";
import InCartComponent from "./components/incart";

function App() {
    return (
        <div className="App">
            <NavBarComponent />
            <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/order-1-product-config" component={Order1ProductConfigComponent} />
                <Route path="/shopping" exact component={ShoppingComponent} />
                <Route path="/in_cart" exact component={InCartComponent} />
            </Switch>
        </div>
    );
}

export default App;
