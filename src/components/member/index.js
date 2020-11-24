import React, { useState, useEffect, useContext } from "react";
import { withRouter } from 'react-router-dom'

import styles from './index.module.scss';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import LocationFieldsComponent from '../location-fields';
import { LoginCredentialsComponent2 } from '../login-credentials';
import AdminKpi from '../admin-kpi';
import { Formik, Field, Form, withFormik } from "formik";
import { dummyHandleSubmit, dummyValidateError, DummyDiv, axiosInst } from "../common-scss/common"

import { EnhancedLoginCredentialsComponent } from '../member-account/index'

import { auth } from "../../firebase";
import Firebase from 'firebase'
import qs from 'qs'

// import axios from 'axios'
import { i18_th as i18 } from "../common-scss/i18_text";

// const useInputChange = () => {
//     const [input, setInput] = useState({})

//     const handleInputChange = (e) => setInput({
//         ...input,
//         [e.currentTarget.name]: e.currentTarget.value
//     })

//     return [input, handleInputChange]
// }

let EnhancedLoginComponent = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { userInfo } = props
        return {
            email: userInfo.email || userInfo.Email || props.email || "",
            password_previous: "",
            password: "",
            password_repeat: ""
        }
    },
    validate: (values) => {
        const errors = {}

        if (values.password_previous === "") {
            errors.password_previous = i18.required
        }

        if (values.email === "") {
            errors.email = i18.required
        }

        if (values.password !== values.password_repeat) {
            errors.password = i18.password_repeat_different
        }

        return errors
    },
    handleSubmit: async (values) => {

        const oldPassword = values.password_previous
        const newPassword = values.password

        // get credential
        let freshCredential = null
        try {
            freshCredential = Firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, oldPassword)
        } catch (e) {
            return alert("Fail to get credential", e)
        }

        // Referesh credential
        try {
            await auth.currentUser.reauthenticateWithCredential(freshCredential)
        } catch (e) {
            return alert(e)
        }

        // Update password
        try {
            await auth.currentUser.updatePassword(newPassword)

            console.log("password changed ok")
            return alert(i18.account_password_change_success)
        } catch (e) {
            console.log("failed to change", e)
            return alert(i18.account_password_change_failed_general, e)
        }

    }
})((props) => {
    return (
        <Form className={styles.loginCredentials}>
            <LoginCredentialsComponent2 isRegistering={false} {...props} />
        </Form>
    )
})

export let EnhancedLocationFields = withRouter(withFormik({
    enableReinitialize: true,
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

            accountState: 0
        }
    },
    validate: (values) => {
        const errors = {}

        // console.log(values)
        Object.entries(values).forEach(([fieldName, fieldValue]) => {

            // Ignore accountState because the value 0 is used
            // to indicate "Normal"
            if (["accountState"].includes(fieldName)) { return }
            if (!fieldValue) {
                errors[fieldName] = i18.required
            }
        })

        return errors
    },
    handleSubmit: (values, { props }) => {

        const moreUserInfo = Object.fromEntries(Object.entries(values).filter(([key, value]) => {
            // 
            return true
        }))
        Object.assign(values, moreUserInfo)
        console.log("moreUserInfo", moreUserInfo)

        auth.onAuthStateChanged((userCredential) => {

            const uid = userCredential.uid

            const customerSchemaInfo = {
                email: moreUserInfo?.email || moreUserInfo?.email || '',
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
                customerID: uid,
                status: moreUserInfo?.accountState || moreUserInfo?.state || "ปกติ"
            }
            console.log("sent", customerSchemaInfo)

            axiosInst.put(`customers/${uid}`, customerSchemaInfo).then((res) => {
                // console.log(customerSchemaInfo)
                // console.log(props.setUserInfo)
                props.setUserInfo(customerSchemaInfo)
                props.setUpdateStatusText(i18.account_information_update_success)
                console.log("Update sucessful")
            }).catch((reason) => {
                props.setUpdateStatusText(i18.account_information_update_failed_general)
                console.log(reason)
            }).finally(() => {
                // console.log(props)
                // props.history.push("/")
            })
        })
    }
})((props) => {
    const [dropDawn, setDropDawn] = useState(0);

    const { values, setFieldValue, userInfo } = props

    const handleChangeDropDawn = (e) => {
        values.accountState = parseInt(e.value) || 0 // If error value then assume be 0 (Normal)
        setDropDawn(e.value);
    }

    useEffect(() => {
        Object.entries(userInfo).forEach(([fieldKey, fieldValue]) => {
            setFieldValue(fieldKey, fieldValue)
        })
    }, [userInfo])

    return (
        <Form className={styles.userInfo}>
            <LocationFieldsComponent onlyLocation={false} {...props} />

            <div className={styles.row}>
                <p>สถานะ</p>
                <div className={styles.selectBox}>

                    <div className={styles.selectBoxCurrent} tabIndex="0">
                        <div className={`${styles.selectBoxValue}`}>
                            <Field className={styles.selectBoxInput} type="radio" id="0" value="0" checked={`${values.accountState}` === `${0}` ? true : false} onChange={(e) => handleChangeDropDawn(e.target)} />
                            <p className={`${styles.selectBoxInputText}  ${styles.comboBoxStatusGreen}`}>ปกติ</p>
                        </div>
                        <div className={styles.selectBoxValue}>
                            <Field className={styles.selectBoxInput} type="radio" id="1" value="1" checked={`${values.accountState}` === `${1}` ? true : false} onChange={(e) => handleChangeDropDawn(e.target)} />
                            <p className={`${styles.selectBoxInputText}  ${styles.comboBoxStatusRed}`}>แบน</p>
                            <IconArrow />
                        </div>
                    </div>

                    <ul className={styles.selectBoxList}>
                        <li><label className={`${styles.selectBoxOption} ${styles.comboBoxStatusGreen}`} for="0">ปกติ</label></li>
                        <li><label className={`${styles.selectBoxOption} ${styles.comboBoxStatusRed}`} for="1">แบน</label></li>
                    </ul>

                </div>
            </div>

            <Field name="submit" type="submit" className={styles.greenButton} value="บันทึก" />
        </Form>
    )
}))

let MemberComponent = (props) => {

    const [userInfo, setUserInfo] = useState({})
    const [updateStatusText, setUpdateStatusText] = useState("　")

    useEffect(() => {
        const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        // console.log(urlParams)

        axiosInst.get(`customers/${urlParams.user_id}`).then((res) => {

            // React.setC
            const custInfo = res.data

            const formikSchema = {
                email: custInfo.Email || custInfo.email,

                address: custInfo?.shippingAddress?.address || '',
                zip: custInfo?.shippingAddress?.zip || '',
                zone: custInfo?.shippingAddress?.zone || '',
                district: custInfo?.shippingAddress?.county || '',
                provice: custInfo?.shippingAddress?.provice || '',

                fullname: custInfo?.fullname || '',
                phone: custInfo?.phone || '',

                accountState: custInfo.status === "ปกติ" ? 0 : 1
            }

            console.log("Receive", formikSchema)

            setUserInfo(formikSchema)

        }).catch((reason) => {
            console.log(reason)
        })
    }, [])

    const currentEmail = "123@123.123"

    return (
        <main className={styles.pageContainer}>

            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            <section className={styles.section2}>

                <h2>รายสมาชิก - จัดการบัญชี</h2>
                <h3>สมาชิกหมายเลข MEM0001</h3>

                {(() => {
                    if (updateStatusText === i18.account_information_update_success) {
                        return (<p className={styles.accountCreateSuccess}>{updateStatusText}</p>)
                    } else if (updateStatusText !== null) {
                        return (<p className={styles.accountCreateFailed}>{updateStatusText}</p>)
                    }
                    return (<p>　</p>)
                })()}
                <div className={styles.flexWrapper}>

                    <EnhancedLoginCredentialsComponent email={currentEmail} emailDisabled={true} userInfo={userInfo} setUpdateStatusText={setUpdateStatusText} setUserInfo={setUserInfo} />
                    <EnhancedLocationFields email={currentEmail} emailDisabled={true} userInfo={userInfo} setUpdateStatusText={setUpdateStatusText} setUserInfo={setUserInfo} />

                </div>
            </section>
        </main>
    )
}


// const EnhancedMemberComponent = withFormik({
//     mapPropsToValues: () => ({

//         email: '',
//         phone: '',
//         address: '',
//         fullname: '',

//         district: '',
//         zone: '',
//         provice: '',
//         zip: '',

//         accountState: 0
//     }),
//     validate: (values) => {
//         const errors = {}

//         // TODO add validation for the values

//         return errors
//     },
//     handleSubmit: (values) => {
//         setTimeout(() => {
//             alert(JSON.stringify(values, null, 2))
//         }, 0)
//     }
// })(MemberComponent)

// MemberComponent = EnhancedMemberComponent
// let memberComponent = MemberComponent


export default MemberComponent