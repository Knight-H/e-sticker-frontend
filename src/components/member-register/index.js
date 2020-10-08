import React from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent, { LoginCredentialsComponent2 } from '../login-credentials';

import { withFormik, Field, Form } from 'formik'

const MemberRegisterComponent = () => {

    return (
        <main className={styles.container}>

            <h2>สมัครสมาชิก</h2>
            <div className={styles.flexWrapper}>

                <Form>
                    <section className={styles.loginCredentials}>
                        <LoginCredentialsComponent2 isRegistering={true} />
                    </section>

                    <section className={styles.userInfo}>
                        < LocationFieldsComponent onlyLocation={true} />
                    </section>

                    <Field type="submit" className={styles.greenButton} value="สมัครสมาชิก" />
                </Form>
            </div>

        </main>
    );
}

const EnchancedMemberRegisterComponent = withFormik({
    mapPropsToValues: () => {
        return {

            email: '',
            password: '',
            password_repeat: '',
            phoneNumber: '',

            address: '',
            fullname: '',

            district: '',
            zone: '',

            provice: '',
            zip: '',
        }
    },
    validate: (values) => {
        const errors = {}

        // TODO add validation

        return errors
    },
    handleSubmit: (values) => {
        setTimeout(() => {
            console.log(values)
            alert(JSON.stringify(values, null, 2))
        }, 0)
    }
})(MemberRegisterComponent)

export default EnchancedMemberRegisterComponent;