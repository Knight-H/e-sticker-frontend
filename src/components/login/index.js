import React from "react";
import { Field, ErrorMessage, useFormikContext } from 'formik';

import styles from './index.module.scss';
import { Link } from "react-router-dom";

const LoginComponent = (props) => {
    const { values } = useFormikContext();
    
    return (
        <>

            <div className={styles.formControl}>
                <p>อีเมล <ErrorMessage name="email" render={msg => <span className="error">{msg}</span>} /></p>
                <Field name="email" type="email" placeholder="" />
            </div>

            <div className={styles.formControl}>
                <p>รหัสผ่าน <ErrorMessage name="password" render={msg => <span className="error">{msg}</span>} /></p>
                <Field name="password" type="password" placeholder="" />
                {values.checkLoginComponant && <p className={`error ${styles.marginBottom}`}>username หรือ password ไม่ถูกต้อง</p>}
            </div>
            <div className={styles.containerRow}>
                <button type="submit" className={styles.buttonGreen}>เข้าสู่ระบบ</button>
                {/* <button type="button" className={styles.buttonBlue}>เข้าสู่ระบบด้วย Facebook</button> */}
                <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655248592&redirect_uri=http://localhost:3100&state=12345abcde&scope=openid%20email"><button type="button" className={styles.buttonLine}>เข้าสู่ระบบด้วย Line</button></a>
            </div>
            <br />
            <br />
            
                <div className={styles.containerCol}>
                <div className={styles.containerRow}>
                    <p className={styles.smallText}>ยังไม่เป็นสมาชิก?</p>
                    </div>
                    <div className={styles.containerRow}>
                        <div>
                            <Link to="/register"><button type="button" className={styles.buttonWhile}>สมัครสมาชิก</button></Link>
                            {/* <button type="button" className={styles.buttonBlue}>สมัครด้วย Facebook</button> */}
                            <a href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655248592&redirect_uri=http://localhost:3100&state=12345abcde&scope=openid%20email"><button type="button" className={styles.buttonLine}>สมัครด้วย Line</button></a>
                        </div>
                    </div>
                </div>
           

        </>
    );
}
export default LoginComponent;