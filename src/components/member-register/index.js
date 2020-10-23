import React from "react";
import styles from './index.module.scss';
import { db, auth } from '../../firebase'

import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent, { LoginCredentialsComponent2 } from '../login-credentials';

import { withFormik, Field, Form, useFormikContext } from 'formik'
import { dummyHandleSubmit, dummyValidateError, axiosInst } from "../common-scss/common";
import { i18_th as i18 } from "../common-scss/i18_text";

const MemberRegisterComponent = (props) => {
    const { values } = useFormikContext()

    return (
        <main className={styles.pageContainer}>

            <h2>สมัครสมาชิก</h2>

            {(() => {
                if (values.isRegisterSuccessfulText === i18.account_creation_successful) {
                    return (<p className={styles.accountCreateSuccess}>{values.isRegisterSuccessfulText}</p>)
                } else if (values.isRegisterSuccessfulText !== null) {
                    return (<p className={styles.accountCreateFailed}>{values.isRegisterSuccessfulText}</p>)
                }
                return (<p>　</p>)
            })()}

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
    enableReinitialize: true,
    mapPropsToValues: () => {
        return {

            isRegisterSuccessfulText: null,

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
        Object.entries(values).filter(([fieldName, fieldValue]) => {
            return !["isRegisterSuccessfulText"].includes(fieldName)
        }).forEach(([fieldName, fieldValue]) => {
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
    handleSubmit: (values, { props, setFieldValue }) => {

        auth.createUserWithEmailAndPassword(values.email, values.password).then((userCredential) => {
            // Also logged in

            const moreUserInfo = {}
            Object.assign(moreUserInfo, { customerID: userCredential.user.uid })

            Object.keys(values).filter((fieldName) => {
                return !["password", "password_repeat", "isRegisterSuccessfulText"].includes(fieldName)
            }).forEach((fieldName) => {
                moreUserInfo[fieldName] = values[fieldName]
            })

            const customerSchemaInfo = {
                email: moreUserInfo?.email || '',
                shippingAddress: {
                    address: moreUserInfo?.address || '',
                    zip: moreUserInfo?.zip || '',
                    zone: moreUserInfo?.zone || '',
                    county: moreUserInfo?.district || '',
                    provice: moreUserInfo?.provice || '',
                    fullname: moreUserInfo?.fullname || '',
                },
                fullname: moreUserInfo?.fullname || '',
                phone: moreUserInfo?.phone || '',
                customerID: userCredential.user.uid,
                status: "ปกติ"
            }
            console.log(customerSchemaInfo)

            axiosInst.post("customers", {
                uid: userCredential.user.uid,
                data: customerSchemaInfo
            })

            props.history.push("/")

        }).catch((reason) => {
            const { code, message } = reason

            if (code === "auth/email-already-in-use") {
                setFieldValue("isRegisterSuccessfulText", i18.account_creation_failed_email_already_exists, false)
            } else {
                setFieldValue("isRegisterSuccessfulText", i18.account_creation_failed_general, false)
            }
        })
    }
})(MemberRegisterComponent)

export default EnchancedMemberRegisterComponent;