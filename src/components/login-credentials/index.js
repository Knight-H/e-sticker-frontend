import React from "react";
import styles from './index.module.scss';
import { Field } from 'formik'

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

export const LoginCredentialsComponent2 = ({ isRegistering = true }) => {
    return (
        <>
            <div className={styles.formControl}>
                <p>อีเมล</p>
                <div>
                    <Field name="email" type="text" />
                </div>
            </div>

            <div className={styles.formControl}>
                <p>เปลี่ยนรหัสผ่าน</p>
                <div>
                    <Field name="password" type="password" />
                </div>
                <div>
                    <Field name="password_repeat" type="password" placeholder="รหัดผ่านอีกครัง" />
                </div>
            </div>

            {isRegistering ?
                <>
                    <div className={styles.formControl}>
                        <p>เบอร์โทรศัพท์</p>
                        <div>
                            <Field name="phoneNumber" type="text" />
                        </div>
                    </div>
                </> :
                <>
                    <Field type="submit" className={styles.greenButton}>
                        เปลี่ยนรหัสผ่าน
                    </Field>
                </>
            }


        </>
    );
}

export default LoginCredentialsComponent;