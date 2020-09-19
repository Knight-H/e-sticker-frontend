import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import ShoppingCart from "./components/shopping_cart";

function App() {
    return (
        <div className="App">
            <NavBarComponent />
            <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/shopping_cart" exact component={ShoppingCart} />
            </Switch>
        </div>
    );
}

export default App;
