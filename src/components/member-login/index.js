import React from "react";
import styles from './index.module.scss';

import LoginComponent from '../login';

const MemberLoginComponent = () => {

    return(
        <main className={styles.container}>
            <h2>มุมสมาชิก</h2>

            <LoginComponent />
        </main>
    );
}

export default MemberLoginComponent;