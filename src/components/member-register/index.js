import React from "react";
import styles from './index.module.scss';
import auth, { db } from '../../firebase'

import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent, { LoginCredentialsComponent2 } from '../login-credentials';

import { withFormik, Field, Form } from 'formik'
import Axios from "axios";
import { dummyHandleSubmit, dummyValidateError } from "../common-scss/common";
import { i18_th as i18 } from "../common-scss/i18_text";

const MemberRegisterComponent = () => {

    return (
        <main className={styles.pageContainer}>

            <h2>สมัครสมาชิก</h2>

            <Form className={styles.flexWrapper}>

                <section className={styles.loginCredentials}>
                    <LoginCredentialsComponent2 isRegistering={true} />
                </section>

                <section className={styles.userInfo}>
                    < LocationFieldsComponent onlyLocation={true} />
                    <Field type="submit" className={styles.greenButton} value="สมัครสมาชิก" />
                </section>

            </Form>

        </main>
    );
}

const EnchancedMemberRegisterComponent = withFormik({
    mapPropsToValues: () => {
        return {

            email: '',
            password: '',
            password_repeat: '',
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

        // Assumes that all fields are required.
        Object.entries(values).forEach(([fieldName, fieldValue]) => {
            // console.log(fieldName, "-", fieldValue, "-", Boolean(fieldValue))
            if (!fieldValue) {
                errors[fieldName] = i18.required
            }
        })

        if (values.password !== values.password_repeat) {
            errors.password = i18.password_repeat_different
        }

        return errors
    },
    // handleSubmit: dummyHandleSubmit,
    handleSubmit: async (values, { props }) => {

        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(values.email, values.password).then((userCredential) => {
                // Also logged in

                alert(i18.account_creation_successful)

                const moreUserInfo = {}
                Object.keys(values).filter((fieldName) => {
                    return !["password", "password_repeat"].includes(fieldName)
                }).forEach((fieldName) => {
                    moreUserInfo[fieldName] = values[fieldName]
                })
                
                const docRef = db.collection("customers").doc(userCredential.user.uid)
                docRef.set(moreUserInfo).then(() => {
                    console.log("registered user data saved")
                }).catch((reason) => {
                    console.log("FB", reason)
                })

                // const sess = Axios.create({ baseURL: "https://asia-east2-digitalwish-sticker.cloudfunctions.net/" })
                // Axios.post("https://asia-east2-digitalwish-sticker.cloudfunctions.net/customers", moreUserInfo).then((res) => {
                //     console.log(res)
                // }).catch((reason) => {
                //     console.log("Error", reason)
                // })

                // userCredential.user.uid
                resolve()
                props.history.push("/")
                
            }).catch((reason) => {
                console.log("error", reason)
                reject(reason)
            })

        })
    }
})(MemberRegisterComponent)

export default EnchancedMemberRegisterComponent;