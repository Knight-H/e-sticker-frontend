import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import UploadFileComponent from "./components/upload-file";
import ApproveLayoutComponent from "./components/approve-layout";
import Order1ProductConfigComponent from "./components/order-1-product-config";
import FormStepShopping from "./components/form_step_shopping";


import ShoppingComponent from "./components/shopping";
import InCartComponent from "./components/incart";
import AdminLoginComponent from './components/admin-login';
import AdminNavBarComponent from "./components/admin-navbar";
import AdminOrderComponent from "./components/admin-order";


import HomeMemberComponent from "./components/home-member";

function App() {
    let url = window.location.pathname;
    let admin = url.search("admin")
    return (
        <div className="App">
            {`${admin}` === '-1' ? <NavBarComponent /> : <AdminNavBarComponent />}
            <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/customize-2" exact component={UploadFileComponent} />
                <Route path="/myorder" exact component={ApproveLayoutComponent} />
                <Route path="/order-1-product-config" component={Order1ProductConfigComponent} />
                <Route path="/shopping" exact component={ShoppingComponent} />
                <Route path="/in_cart" exact component={InCartComponent} />
                <Route path="/form_step_shopping" exact component={FormStepShopping} />

                <Route path="/admin/login" exact component={AdminLoginComponent} />
                <Route path="/admin/myorder" exact component={AdminOrderComponent} />

                <Route path="/member" exact component={HomeMemberComponent} />
            </Switch>
            
        </div>
    );
}

export default App;


