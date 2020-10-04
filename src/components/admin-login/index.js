import React from "react";
import styles from './index.module.scss';
import { withFormik } from 'formik';
import { Field, Form, ErrorMessage } from 'formik';

const AdminLoginComponent = () => {
    return (
        <main>
            <Form className={styles.formAdminLogin}>
                <h3>Stickerwish Admin Login</h3>
                <label>อีเมล<ErrorMessage name="email" render={msg => <span className="error">{msg}</span>} /></label>
                <Field name="email" type="email" className={styles.inputText} placeholder="" />

                <label>รหัสผ่าน<ErrorMessage name="password" render={msg => <span className="error">{msg}</span>} /></label>
                <Field name="password" type="password" className={styles.inputText} placeholder="" />

                <button type="submit">เข้าสู่ระบบ</button>
            </Form>
        </main >
    );
};

const EnhancedAdminLoginComponent = withFormik({
    mapPropsToValues: (props) => ({
        email: '',
        password: ''
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
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 0);
    }
})(AdminLoginComponent);

export default EnhancedAdminLoginComponent;