import React from "react";
import { withFormik, Form } from 'formik';

import styles from './index.module.scss';

import LoginComponent from '../login';

const MemberLoginComponent = () => {

    return(
        <main className={styles.container}>
            <Form>
                <h2>มุมสมาชิก</h2>
                <LoginComponent />
            </Form>
        </main>
    );
}

const EnhancedMemberLoginComponent = withFormik({
    mapPropsToValues: () => ({
        username: '',
        password: ''
    }),
    validate: values => {
        const errors = {};
        return errors;
    },
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 0);
    },
    displayName: 'MemberLoginComponentForm',
})(MemberLoginComponent);

export default EnhancedMemberLoginComponent;