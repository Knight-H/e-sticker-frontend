import React, { useEffect, useState } from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import { LoginCredentialsComponent2 } from '../login-credentials';
import { Form, Field, withFormik } from 'formik'


import { i18_th as i18 } from '../common-scss/i18_text'
import { axiosInst } from '../common-scss/common'
import { auth } from "../../firebase";
import Firebase from 'firebase'


export const EnhancedLoginCredentialsComponent = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            email: props.userInfo.email || '',
            password_previous: '',
            password: '',
            password_repeat: '',
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
    handleSubmit: async (values, { props }) => {

        const oldPassword = values.password_previous
        const newPassword = values.password

        // get credential
        let freshCredential = null
        try {
            freshCredential = Firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, oldPassword)
        } catch (e) {
            return props.setUpdateStatusText("Error:" + JSON.stringify(e))
        }

        // Referesh credential
        try {
            await auth.currentUser.reauthenticateWithCredential(freshCredential)
        } catch (e) {
            if (e.code === "auth/wrong-password") {
                return props.setUpdateStatusText(i18.password.wrong_previous_password)
            } else {
                return props.setUpdateStatusText(i18.password.wrong_general)
            }
        }

        // Update password
        try {
            await auth.currentUser.updatePassword(newPassword)

            return props.setUpdateStatusText(i18.account_password_change_success)
        } catch (e) {
            return props.setUpdateStatusText(i18.account_password_change_failed_general, e)
        }

    }
})((props) => {
    return (
        <Form className={styles.loginCredentials}>
            <LoginCredentialsComponent2 isRegistering={false} {...props} />
        </Form>
    )
})

const EnchancedLocationFieldsComponent = withFormik({

    enableReinitialize: true,
    mapPropsToValues: () => {

        return {

            customerID: '',
            status: '',

            email: '',
            phone: '',

            address: '',
            fullname: '',

            county: '',
            city: '',

            provice: '',
            zip: '',
        }
    },
    validate: (values) => {
        const errors = {}

        Object.entries(values).forEach(([fieldName, fieldValue]) => {
            if (!fieldValue) {
                errors[fieldName] = i18.required
            }
        })

        return errors
    },

    handleSubmit: async (values, { props }) => {

        const api = {
            customers: "customers",
            cart: "cart",
            noti: "noti",
            orders: "orders",
            paymentOptions: "paymentOptions",
            productOptions: "productOptions",
            shippingOptions: "shippingOptions"
        }

        // props.setUpdateStatusText(i18.account_information_update_success)
        // console.log(values)
        // return

        auth.onAuthStateChanged((user) => {
            axiosInst.get(api.customers + "/" + user.uid).then((res) => {

                console.log(res.data)

                const customerInfo = {}
                Object.assign(customerInfo, { customerID: user.uid }) // ensure customerID exists
                // Object.assign(customerInfo, res.data) //
                // customerInfo = res.data

                // // Temp filter asdf
                // res.data.forEach((value) => {
                //     if (value['customerID'] === user.uid) return Object.assign(customerInfo, value)
                // })

                // Assign updated values
                Object.assign(customerInfo, values)

                const customerSchemaInfo = {
                    customerID: customerInfo?.customerID || '',
                    status: customerInfo?.status || '',
                    email: customerInfo?.email || '',
                    shippingAddress: {
                        address: customerInfo.address || '',
                        zip: customerInfo.zip || '',
                        county: customerInfo.county || '',
                        provice: customerInfo.provice || '',
                        fullname: customerInfo.fullname || '',
                        city: customerInfo.city || ''
                    },
                    fullname: customerInfo?.fullname || '',
                    phone: customerInfo?.phone || ''
                }

                console.log("prep cust info", customerSchemaInfo)

                // console.log("asdf", customerSchemaInfo)

                const documentKey = values.id || null

                if (!documentKey) {
                    // Make new if doesn't exist

                    const pack = {
                        uid: user.uid,
                        data: customerSchemaInfo
                    }

                    axiosInst.post(api.customers, pack).then((res) => {
                        // alert(i18.account_information_update_success)
                        props.setUpdateStatusText(i18.account_information_update_success)
                    }).catch((reason) => {
                        // alert(i18.account_information_update_failed_general, reason)
                        props.setUpdateStatusText(i18.account_information_update_failed_general)
                    })
                } else {
                    // Otherwise update
                    axiosInst.put(api.customers + `/${documentKey}`, customerSchemaInfo).then((res) => {
                        // alert(i18.account_information_update_success)
                        props.setUpdateStatusText(i18.account_information_update_success)
                    }).catch((reason) => {
                        // alert(i18.account_information_update_failed_general, reason)
                        props.setUpdateStatusText(i18.account_information_update_failed_general)
                    })
                }
            })
        })
    }
})((props) => {

    const { userInfo } = props

    useEffect(() => {
        Object.entries(userInfo).forEach(([fieldName, fieldValue]) => {
            props.setFieldValue(fieldName, fieldValue)
        })
    }, [userInfo])

    return (
        <Form className={styles.userInfo} >
            <LocationFieldsComponent {...props} />
            <Field type="submit" className={styles.greenButton} value="อัปเดตข้อมูล" />
        </Form>
    )
})

export const Intermediate = ({setName}) => {

    const [userInfo, setUserInfo] = useState({})
    const [updateStatusText, setUpdateStatusText] = useState("　")

    useEffect(() => {
        // console.log(currentEmail)
        auth.onAuthStateChanged((userCredential) => {

            const urlPath = `customers/${userCredential.uid}`

            axiosInst.get(urlPath).then((res) => {
                // console.log(res, auth.currentUser.uid)

                // Temporary for filtering the customer data
                const custInfo = res.data
                setName(custInfo?.fullname || '')
                console.log("got cust info", custInfo)
                const formikSchema = {
                    id: custInfo.id,
                    customerID: custInfo.customerID,
                    status: custInfo.status,
                    email: custInfo.Email || userCredential.email,

                    address: custInfo?.shippingAddress?.address || '',
                    zip: custInfo?.shippingAddress?.zip || '',
                    city: custInfo?.shippingAddress?.city || '',
                    county: custInfo?.shippingAddress?.county || '',
                    provice: custInfo?.shippingAddress?.provice || '',

                    line_channel: custInfo.line_channel ? custInfo.line_channel : '',
                    line_token: custInfo.line_token ? custInfo.line_token : '',

                    fullname: custInfo?.fullname || '',
                    phone: custInfo?.phone || ''
                }

                setUserInfo(formikSchema)
            })
        })
    }, [])

    return (
        <>
            {(() => {
                if (updateStatusText === i18.account_information_update_success) {
                    return (<p className={styles.accountCreateSuccess}>{updateStatusText}</p>)
                } else if (updateStatusText !== null) {
                    return (<p className={styles.accountCreateFailed}>{updateStatusText}</p>)
                }
                return (<p>　</p>)
            })()}

            <div className={styles.flexWrapper}>
                {userInfo.line_channel ?
                    <div className={styles.loginCredentialsNoneDisplay}>

                    </div>
                    :
                    <EnhancedLoginCredentialsComponent emailDisabled={true} userInfo={userInfo} setUserInfo={setUserInfo} setUpdateStatusText={setUpdateStatusText} />
                }
                <EnchancedLocationFieldsComponent onlyLocation={false} emailDisabled={true} userInfo={userInfo} setUserInfo={setUserInfo} setUpdateStatusText={setUpdateStatusText} />

            </div>
        </>
    );
}

const MemberAccountComponent = () => {
    const [name, setName] = useState("")

    return (
        <main className={styles.pageContainer}>
            <h2>มุมสมาชิก - จัดการบัญชี</h2>
            <h3>สวัสดีคุณ {name} เลือกเมนูการใช้งานได้เลยค่ะ</h3>
            {/* <h3>หมายเลขสมาชิก MEM0001</h3> */}
            <Intermediate setName={setName} />
        </main>
    );
}

export default MemberAccountComponent;
