import React from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent from '../login-credentials';

const MemberRegisterComponent = () => {

    return (
        <main className={styles.container}>

            <h2>สมัครสมาชิก</h2>
            <div className={styles.flexWrapper}>

                <section className={styles.loginCredentials}>
                    <LoginCredentialsComponent />
                </section>

                <section className={styles.userInfo}>
                    < LocationFieldsComponent onlyLocation={true}/>

                    <button className={styles.greenButton}>สมัครสมาชิก</button>

                </section>

            </div>


        </main>
    );
}

export default MemberRegisterComponent;