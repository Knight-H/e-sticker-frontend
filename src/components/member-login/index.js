import React from "react";
import { withRouter } from 'react-router-dom'
import { withFormik, Form } from 'formik';

import styles from './index.module.scss';

import LoginComponent from '../login';
import { auth } from '../../firebase';

import { i18_th as i18 } from "../common-scss/i18_text";


const MemberLoginComponent = (props) => {

    return (
        <main className={styles.container}>
            <Form>
                <h2>มุมสมาชิก</h2>
                <LoginComponent />
            </Form>
        </main>
    );
}

export const EnhancedMemberLoginComponent = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validate: values => {
        const errors = {};

        if (values.email === "") {
            errors.email = i18.required
        }

        if (values.password === "") {
            errors.password = i18.required
        }

        return errors;
    },
    // handleSubmit: dummyHandleSubmit,

    handleSubmit: (values, { props }) => {
        auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then((res) => {
                // alert(i18_th.login_successful)
                props.history.push("/cart")
            })
            .catch((error) => {
                alert(i18.login_failed)
            })
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 0);
    },
    displayName: 'MemberLoginComponentForm',
})(withRouter(MemberLoginComponent));

export default EnhancedMemberLoginComponent;