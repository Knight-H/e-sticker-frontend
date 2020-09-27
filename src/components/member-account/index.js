import React from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent from '../login-credentials';

const MemberAccountComponent = () => {

    return (
        <main className={styles.container}>

            <h2>มุมสมาชิก - จัดการบัญชี</h2>
            <h3>สวัสดีคุณ  customer_name  เลือกเมนูการใช้งานได้เลยค่ะ</h3>
            <h3>หมายเลขสมาชิก MEM0001</h3>

            <div className={styles.flexWrapper}>

                <section className={styles.loginCredentials}>
                    <LoginCredentialsComponent isRegistering={false}/>
                </section>

                <section className={styles.userInfo}>
                    < LocationFieldsComponent />

                    <button className={styles.greenButton}>สมัครสมาชิก</button>

                </section>

            </div>


        </main>
    );
}

export default MemberAccountComponent;