import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import FooterComponent from "./components/footer";
import UploadFileComponent from "./components/upload-file";
import ApproveLayoutComponent from "./components/approve-layout";
import Order1ProductConfigComponent from "./components/order-1-product-config";
import FormStepShopping from "./components/form_step_shopping";


import ShoppingComponent from "./components/shopping";
import InCartComponent from "./components/incart";

function App() {
    return (
        <div className="App">
            <NavBarComponent />
            <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/upload-file" exact component={UploadFileComponent} />
                <Route path="/approve" exact component={ApproveLayoutComponent} />
                <Route path="/order-1-product-config" component={Order1ProductConfigComponent} />
                <Route path="/shopping" exact component={ShoppingComponent} />
                <Route path="/in_cart" exact component={InCartComponent} />
                <Route path="/form_step_shopping" exact component={FormStepShopping} />
            </Switch>
            <FooterComponent />
        </div>
    );
}

export default App;


