import React from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import { LoginCredentialsComponent2 } from '../login-credentials';
import { Form, Field, withFormik } from 'formik'


const EnhancedLoginCredentialsComponent = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            email: props.email,
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
})((props) => {
    return (
        <Form className={styles.loginCredentials}>
            <LoginCredentialsComponent2 isRegistering={false} {...props} />
        </Form>
    )
})

const EnchancedLocationFieldsComponent = withFormik({
    mapPropsToValues: () => {
        return {

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

        // TODO validation

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

const MemberAccountComponent = () => {
    return (
        <main className={styles.pageContainer}>


            <div style={{ padding: "0px 0px 10px 0px" }}>

                <h2>มุมสมาชิก - จัดการบัญชี</h2>
                <h3>สวัสดีคุณ  customer_name  เลือกเมนูการใช้งานได้เลยค่ะ</h3>
                <h3>หมายเลขสมาชิก MEM0001</h3>

            </div>

            <div className={styles.flexWrapper}>

                <EnhancedLoginCredentialsComponent email="demo@asd" emailDisabled={true} />
                {/* <div style={{ padding: "0px 52px 0px 0px" }}></div> */}
                <EnchancedLocationFieldsComponent onlyLocation={false} email="demo@asd" emailDisabled={true} />

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