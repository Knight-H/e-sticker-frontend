import React from 'react';
import { Route, Switch } from "react-router-dom";

import NavBarComponent from "./components/navbar";
import HomeComponent from "./components/home";
import FooterComponent from "./components/footer";
import UploadFileComponent from "./components/upload-file";
import ApproveLayoutComponent from "./components/approve-layout";

function App() {
    return (
        <div className="App">
            <NavBarComponent />
            <Switch>
                <Route path="/" exact component={HomeComponent} />
                <Route path="/upload-file" exact component={UploadFileComponent} />
                <Route path="/approve" exact component={ApproveLayoutComponent} />
            </Switch>
            <FooterComponent />
        </div>
    );
}

export default App;
