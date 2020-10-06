import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import ApproveLayoutComponent from "./components/approve-layout";
import FormStepShopping from "./components/form_step_shopping";

import CheckoutComponent from "./components/checkout";
import CartComponent from "./components/cart";

import AdminListComponent from "./components/admin";
import AdminLoginComponent from './components/admin-login';
import AdminNavBarComponent from "./components/admin-navbar";
import AdminOrderComponent from "./components/admin-order";

import HomeMemberComponent from "./components/home-member";
import MemberComponent from "./components/member";
import MemberSettingComponent from "./components/member-setting";
import MemberLoginComponent from "./components/member-login";
import MemberRegsterComponent from "./components/member-register";
import MemberAccountComponent from "./components/member-account";
import MemberListComponent from "./components/member-list";

function App() {
    let url = window.location.pathname;
    let admin = url.search("admin")
    return (
        <div className="App">
            {`${admin}` === '-1' ? <NavBarComponent /> : <AdminNavBarComponent />}
            <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/myorder" exact component={ApproveLayoutComponent} />
                <Route path="/customize" exact component={FormStepShopping} />

                <Route path="/admin/login" exact component={AdminLoginComponent} />
                <Route path="/admin/myorder" exact component={AdminOrderComponent} />

                <Route path="/member" exact component={HomeMemberComponent} />
                <Route path="/checkout" exact component={CheckoutComponent} />
                <Route path="/cart" exact component={CartComponent} />
                <Route path="/form_step_shopping" exact component={FormStepShopping} />

                <Route path="/admin" exact component={AdminListComponent} />

                <Route path="/admin/member" exact component={MemberComponent} />
                <Route path="/admin/member-setting" exact component={MemberSettingComponent} />
                <Route path="/member-login" exact component={MemberLoginComponent} />
                <Route path="/member-register" exact component={MemberRegsterComponent} />
                <Route path="/member-account" exact component={MemberAccountComponent} />
                <Route path="/admin/customer" exact component={MemberListComponent} />
                <Route path="/login" exact component={MemberLoginComponent} />
                <Route path="/register" exact component={MemberRegsterComponent} />
                <Route path="/member/setting" exact component={MemberAccountComponent} />
            </Switch>

        </div>
    );
}

export default App;


