import React from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import { LoginCredentialsComponent2 } from '../login-credentials';
import { Form, Field, withFormik } from 'formik'


const EnhancedLoginCredentialsComponent = withFormik({
    mapPropsToValues: () => {
        return {
            email: '',
            password: '',
            password_repeat: '',
        }
    },
    validate: (values) => {
        const errors = {}

        // TODO validation

        return errors
    },
    handleSubmit: (values) => {
        setTimeout(() => {
            console.log(values)
            alert(JSON.stringify(values, null, 2))
        }, 0)
    }
})(() => {
    return (
        <Form>
            <section className={styles.loginCredentials}>
                <LoginCredentialsComponent2 isRegistering={false} />
            </section>
        </Form>
    )
})

const EnchancedLocationFieldsComponent = withFormik({
    mapPropsToValues: () => {
        return {
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

        // TODO validation

        return errors
    },
    handleSubmit: (values) => {
        setTimeout(() => {
            console.log(values)
            alert(JSON.stringify(values, null, 2))
        }, 0)
    }
})(() => {
    return (
        <Form>
            <section className={styles.userInfo}>
                < LocationFieldsComponent onlyLocation={true} />
            </section>

            <Field type="submit" className={styles.greenButton} value="อัปเดตข้อมูล" />
        </Form>
    )
})

const MemberAccountComponent = () => {
    return (
        <main className={styles.container}>

            <h2>รายการสมาชิก</h2>
            <h3>หมายเลขสมาชิก MEM0001</h3>

            <div className={styles.flexWrapper}>

                <EnhancedLoginCredentialsComponent />
                <EnchancedLocationFieldsComponent />

            </div>


        </main>
    );
}


const EnhancedMemberAccountComponent = withFormik({
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

        return errors
    },
    handleSubmit: (values) => {
        setTimeout(() => {
            console.log(values)
            alert(JSON.stringify(values, null, 2))
        }, 0)
    }
})(MemberAccountComponent)

export default MemberAccountComponent;