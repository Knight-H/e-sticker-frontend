import React from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import { LoginCredentialsComponent2 } from '../login-credentials';
import { Form, Field, withFormik } from 'formik'


import { i18_th } from '../common-scss/i18_text'

const EnhancedLoginCredentialsComponent = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            email: props.email || '',
            password: '',
            password_repeat: '',
        }
    },
    validate: (values) => {
        const errors = {}

        Object.entries(values).forEach(([fieldName, fieldValue]) => {
            if (!fieldValue) {
                errors[fieldName] = i18_th.required
            }
        })

        if (values.password !== values.password_repeat) {
            errors["password"] = i18_th.password_repeat_different
        }

        return errors
    },
    handleSubmit: (values) => {
        setTimeout(() => {
            console.log(values)
            alert(JSON.stringify(values, null, 2))
        }, 0)
    }
})((props) => {
    return (
        <Form className={styles.loginCredentials}>
            <LoginCredentialsComponent2 isRegistering={false} {...props} />
        </Form>
    )
})

const EnchancedLocationFieldsComponent = withFormik({
    mapPropsToValues: (props) => {
        return {

            email: props.email || '',
            phone: '',

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

        Object.entries(values).forEach(([fieldName, fieldValue]) => {
            if (!fieldValue) {
                errors[fieldName] = i18_th.required
            }
        })

        return errors
    },
    handleSubmit: (values) => {
        setTimeout(() => {
            console.log(values)
            alert(JSON.stringify(values, null, 2))
        }, 0)
    }
})((props) => {
    return (
        <Form className={styles.userInfo} >
            <LocationFieldsComponent {...props} />
            <Field type="submit" className={styles.greenButton} value="อัปเดตข้อมูล" />
        </Form>
    )
})

const MemberAccountComponent = (props) => {

    const currentEmail = "demo123@mail.com"

    return (
        <main className={styles.pageContainer}>

            <h2>มุมสมาชิก - จัดการบัญชี</h2>
            <h3>สวัสดีคุณ  customer_name  เลือกเมนูการใช้งานได้เลยค่ะ</h3>
            <h3>หมายเลขสมาชิก MEM0001</h3>

            <div className={styles.flexWrapper}>

                <EnhancedLoginCredentialsComponent email={currentEmail} emailDisabled={true} />
                <EnchancedLocationFieldsComponent onlyLocation={false} email={currentEmail} emailDisabled={true} />

            </div>

        </main>
    );
}

export default MemberAccountComponent;