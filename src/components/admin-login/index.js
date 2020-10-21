import React, { useEffect } from "react";
import styles from './index.module.scss';
import { withFormik, useFormikContext } from 'formik';
import { Field, Form, ErrorMessage } from 'formik';

import { auth } from '../../firebase/index.js'

const AdminLoginComponent = () => {
    const { values } = useFormikContext();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log("user", user)
        })
    }, []);

    return (
        <main>
            <Form className={styles.formAdminLogin}>
                <h3>Stickerwish Admin Login</h3>
                <label>อีเมล<ErrorMessage name="email" render={msg => <span className="error">{msg}</span>} /></label>
                <Field name="email" type="email" className={styles.inputText} placeholder="" />

                <label>รหัสผ่าน<ErrorMessage name="password" render={msg => <span className="error">{msg}</span>} /></label>
                <Field name="password" type="password" className={styles.inputText} placeholder="" />
                
                {values.checkLogin && <p className={`error ${styles.marginBottom}`}>username หรือ password ไม่ถูกต้อง</p>}
                <button type="submit">เข้าสู่ระบบ</button>
            </Form>
        </main >
    );
};

const EnhancedAdminLoginComponent = withFormik({
    mapPropsToValues: (props) => ({
        email: '',
        password: '',

        checkLogin: false
    }),
    validate: values => {
        const errors = {};

        if (values.email === "") {
            errors.email = "กรุณากรอกอีเมล"
        }

        if (values.password === "") {
            errors.password = "กรุณากรอกใส่รหัสผ่าน"
        }

        return errors;
    },
    handleSubmit: (values, { setFieldValue, props }) => {
        auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                console.log("uid", res.user.uid, "email", res.user.email)
                setFieldValue("checkLogin", false, false);
                props.history.push("/admin")
            })
            .catch(error => {
                console.log("Error", error)
                setFieldValue("checkLogin", true, false);
            })
    }
})(AdminLoginComponent);

export default EnhancedAdminLoginComponent;
