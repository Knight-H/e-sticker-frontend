import React from "react";
import {Field, ErrorMessage} from 'formik';

import styles from './index.module.scss';

const LoginComponent = () => {
    return (
    <>
        
            <div className={styles.formControl}>
                <p>อีเมล <ErrorMessage name="email" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                <Field name="email" type="text" placeholder=""/>
            </div>

            <div className={styles.formControl}>
                <p>รหัสผ่าน <ErrorMessage name="password" render={msg => <span style={{color: "red"}}>{msg}</span>}/></p>
                <Field name="password" type="text" placeholder=""/>
            </div>
            <div className={styles.containerRow}>
                <button type="submit" className={styles.buttonGreen}>เข้าสู่ระบบ</button>
                <button className={styles.buttonBlue}>เข้าสู่ระบบด้วย Facebook</button>
                <button className={styles.buttonLine}>เข้าสู่ระบบด้วย Line</button>
            </div>
            <br/><br/>
            <div className={styles.containerRow}>
                <div className={styles.containerCol}>
                    <p className={styles.smallText}>ยังไม่เป็นสมาชิก?</p>
                    <div className={styles.containerRow}>
                    <button className={styles.buttonWhile}>สมัครสมาชิก</button>
                    <button className={styles.buttonBlue}>สมัครด้วย Facebook</button>
                    <button className={styles.buttonLine}>สมัครด้วย Line</button>
                    </div>
                </div>
            </div>

    </>
    );
}
export default LoginComponent;