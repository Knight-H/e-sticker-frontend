import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import ApproveLayoutComponent from "./components/approve-layout";
import FormStepShopping from "./components/form_step_shopping";

import CartComponent from "./components/cart";
import CheckoutComponent from "./components/checkout";

import AdminListComponent from "./components/admin";
import AdminLoginComponent from './components/admin-login';
import AdminNavBarComponent from "./components/admin-navbar";
import AdminOrderComponent from "./components/admin-order";
import AdminProductOptionComponent from "./components/admin-product-option";

import HomeMemberComponent from "./components/home-member";
import MemberComponent from "./components/member";
import MemberSettingComponent from "./components/member-setting";
import MemberLoginComponent from "./components/member-login";
import MemberRegsterComponent from "./components/member-register";
import MemberAccountComponent from "./components/member-account";
import MemberListComponent from "./components/member-list";
import AdminDemoMTG from "./components/admin-demo-mgt";

import SuccessfulComponent from "./components/successful";
import {PDF} from "./components/pdf/index";

function App() {
    let url = window.location.pathname;
    let admin = url.search("admin")
    return (
        <div className="App">
            {`${admin}` === '-1' ? <NavBarComponent /> : <AdminNavBarComponent />}
            <Switch>
                <Route path="/" exact component={HomeComponent} /> 

                <Route path="/login" exact component={MemberLoginComponent} /> 
                <Route path="/register" exact component={MemberRegsterComponent} /> 

                <Route path="/myorder" exact component={ApproveLayoutComponent} /> 
                <Route path="/myorder/:id" exact component={ApproveLayoutComponent} /> 
                
                <Route path="/member" exact component={HomeMemberComponent} /> 
                <Route path="/member/setting" exact component={MemberAccountComponent} /> 
                 
                <Route path="/cart" exact component={CheckoutComponent} /> 
                <Route path="/checkout" exact component={CartComponent} /> 
                <Route path="/customize" exact component={FormStepShopping} /> 
                
                <Route path="/e-sticker-frontend/successful" exact component={SuccessfulComponent} /> 

                <Route path="/admin/login" exact component={AdminLoginComponent} /> 
                <Route path="/admin" exact component={AdminListComponent} /> 
                <Route path="/admin/member" exact component={MemberComponent} /> 
                <Route path="/admin/setting" exact component={MemberSettingComponent} /> 
                <Route path="/admin/customer" exact component={MemberListComponent} /> 
                <Route path="/admin/myorder/:id" exact component={AdminOrderComponent} /> 
                <Route path="/admin/product" exact component={AdminProductOptionComponent} /> 
                <Route path="/admin/demo" exact component={AdminDemoMTG} /> 

                <Route path="/admin/pdf/:id" exact component={PDF} /> 
            </Switch>

        </div>
    );
}

export default App;


