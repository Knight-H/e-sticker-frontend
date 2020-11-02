import React from "react";
import { withRouter } from 'react-router-dom'
import { withFormik, Form } from 'formik';

import styles from './index.module.scss';

import LoginComponent from '../login';
import { auth } from '../../firebase';
import { dummyHandleSubmit } from "../common-scss/common";
import { i18_th } from "../common-scss/i18_text";

const MemberLoginComponent = (props) => {

    return(
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
            errors.email = "Required"
        }

        if (values.password === "") {
            errors.password = "Required"
        }

        return errors;
    },
    // handleSubmit: dummyHandleSubmit,

    handleSubmit: (values, {props}) => {
        auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then((res) => {
                // alert(i18_th.login_successful)
                props.history.push("/customize")
            })
            .catch((error) => {
                alert(i18_th.login_failed)
            })
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 0);
    },
    displayName: 'MemberLoginComponentForm',
})(withRouter(MemberLoginComponent));

export default EnhancedMemberLoginComponent;