import React from "react";
import AdminKpi from "../admin-kpi";
import styles from './index.module.scss';
import { Field, ErrorMessage, withFormik } from 'formik';

import { i18_th as i18 } from '../common-scss/i18_text'


const PasswordChangeComponent = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props
    return (
        <div className={styles.container}>
            <form className={styles.passwordChange} onSubmit={handleSubmit}>

                <h2>เปลี่ยนรหัสผ่าน</h2>
                <div className={styles.formControl}>
                    <p>เปลี่ยนรหัสผ่าน <ErrorMessage name="password" render={msg => <span style={{ color: "red" }}>{msg}</span>} /></p>
                    <div>
                        <Field name="password" type="password" placeholder="" />
                    </div>
                    <div>
                        <Field name="password_repeat" type="password" placeholder="รหัดผ่านอีกครัง" />
                    </div>
                    <button type="submit" className={styles.buttonGreen}>เปลี่ยนรหัสผ่าน</button>
                </div>

            </form>
        </div>
    )
}

const EnhancedPasswordChangeComponent = withFormik({
    mapPropsToValues: () => ({
        password: '',
        password_repeat: ''
    }),
    validate: values => {
        const errors = {}

        if (values.password === "") {
            errors.password = i18.required
        }
        else if (values.password_repeat === "") {
            errors.password = i18.required
        }
        else if (values.password !== values.password_repeat) {
            errors.password = i18.password_repeat_different
        }

        return errors;
    },
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
        }, 100)
    },
    displayName: 'PasswordChangeComponentForm',
})(PasswordChangeComponent)

const AdminPassword = () => {
    return (
        <React.Fragment>
            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>
            <section className={styles.section1}>
                <EnhancedPasswordChangeComponent />
            </section>
        </React.Fragment>
    )
}

export default AdminPassword
