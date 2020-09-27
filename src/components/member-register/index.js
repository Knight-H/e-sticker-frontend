import React from "react";
import styles from './index.module.scss';

import LoginComponent from '../login';

const MemberRegisterComponent = () => {

    return(
        <main className={styles.container}>

            <section className={styles.loginCredentials}>

            </section>

            <section className={styles.userInfo}>
            </section>
            <h2>สมัครสมาชิก</h2>

            <LoginComponent />
        </main>
    );
}

export default MemberRegisterComponent;