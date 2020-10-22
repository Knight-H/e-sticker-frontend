import React from "react";
import styles from './index.module.scss';
import { Field, ErrorMessage } from 'formik'
import { i18_th as i18 } from "../common-scss/i18_text";

const LoginCredentialsComponent = ({ isRegistering = true }) => {
    return (
        <>
            <div className={styles.formControl}>
                <p>อีเมล</p>
                <div ><input type="text" value="" /></div>
            </div>

            <div className={styles.formControl}>
                <p>เปลี่ยนรหัสผ่าน</p>
                <div ><input type="text" value="" /></div>
                <div ><input type="text" value="" /></div>
            </div>

            {isRegistering ?
                <>
                    <div className={styles.formControl}>
                        <p>เบอร์โทรศัพท์</p>
                        <div ><input type="text" value="" /></div>
                    </div>
                </> :
                <>
                    <button className={styles.greenButton}>
                        เปลี่ยนรหัสผ่าน
                    </button>
                </>
            }


        </>
    );
}

export const LoginCredentialsComponent2 = ({ isRegistering = true, emailDisabled = false }) => {
    return (
        <>
            <div className={styles.formControl}>
                <p>อีเมล <ErrorMessage name="email" render={msg => <span style={{ color: "red" }}>{msg}</span>} /></p>
                <div>
                    <Field name="email" type="email" disabled={emailDisabled} />
                </div>
            </div>

            {isRegistering ?
                <></>
                :
                <div className={styles.formControl}>
                    <p>{i18.label.password_previous} <ErrorMessage name="password_previous" render={msg => <span style={{ color: "red" }}>{msg}</span>} /></p>
                    <div>
                        <Field name="password_previous" type="password" />
                    </div>
                </div>
            }

            <div className={styles.formControl}>
                <p>เปลี่ยนรหัสผ่าน <ErrorMessage name="password" render={msg => <span style={{ color: "red" }}>{msg}</span>} /></p>
                <div>
                    <Field name="password" type="password" />
                </div>
                <div>
                    <Field name="password_repeat" type="password" placeholder="รหัสผ่านอีกครัง" />
                </div>
            </div>

            {isRegistering ?
                <>
                    <div className={styles.formControl}>
                        <p>เบอร์โทรศัพท์ <ErrorMessage name="phone" render={msg => <span style={{ color: "red" }}>{msg}</span>} /></p>
                        <div>
                            <Field name="phone" type="text" />
                        </div>
                    </div>
                </> :
                <>
                    <Field name="submit" type="submit" className={styles.greenButton} value="เปลี่ยนรหัสผ่าน" />
                </>
            }


        </>
    );
}

export default LoginCredentialsComponent;