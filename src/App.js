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

function App() {
    let url = window.location.pathname;
    let admin = url.search("admin")
    return (
        <div className="App">
            {`${admin}` === '-1' ? <NavBarComponent /> : <AdminNavBarComponent />}
            <Switch>
                <Route path="/" exact component={HomeComponent} /> {/* header done */}

                <Route path="/login" exact component={MemberLoginComponent} /> {/* header done */}
                <Route path="/register" exact component={MemberRegsterComponent} /> {/* header done */}

                <Route path="/myorder" exact component={ApproveLayoutComponent} /> {/* header done */}
                <Route path="/myorder/:id" exact component={ApproveLayoutComponent} /> {/* header done */}
                
                <Route path="/member" exact component={HomeMemberComponent} /> {/* header done */}
                <Route path="/member/setting" exact component={MemberAccountComponent} /> {/* header done */}
                 
                <Route path="/cart" exact component={CheckoutComponent} /> {/* header done */}
                <Route path="/checkout" exact component={CartComponent} /> {/* header done */}
                <Route path="/customize" exact component={FormStepShopping} /> {/* header done */}
                
                <Route path="/e-sticker-frontend/successful" exact component={SuccessfulComponent} /> {/* header done */}

                <Route path="/admin/login" exact component={AdminLoginComponent} /> {/* header done */}
                <Route path="/admin" exact component={AdminListComponent} /> {/* header done */}
                <Route path="/admin/member" exact component={MemberComponent} /> {/* header done */}
                <Route path="/admin/setting" exact component={MemberSettingComponent} /> {/* header done */}
                <Route path="/admin/customer" exact component={MemberListComponent} /> {/* header done */}
                <Route path="/admin/myorder/:id" exact component={AdminOrderComponent} /> {/* header done */}
                <Route path="/admin/product" exact component={AdminProductOptionComponent} /> {/* header done */}
                <Route path="/admin/demo" exact component={AdminDemoMTG} /> {/* header done */}
            </Switch>

        </div>
    );
}

export default App;


