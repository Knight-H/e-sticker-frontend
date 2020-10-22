import React, { useEffect, useState } from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import { LoginCredentialsComponent2 } from '../login-credentials';
import { Form, Field, withFormik } from 'formik'


import { i18_th as i18 } from '../common-scss/i18_text'
import { axiosInst } from '../common-scss/common'
import { db, auth } from "../../firebase";
const EnhancedLoginCredentialsComponent = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            email: props.userInfo.email || '',
            password: '',
            password_repeat: '',
        }
    },
    validate: (values) => {
        const errors = {}

        Object.entries(values).forEach(([fieldName, fieldValue]) => {
            if (!fieldValue) {
                errors[fieldName] = i18.required
            }
        })

        if (values.password !== values.password_repeat) {
            errors["password"] = i18.password_repeat_different
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

    enableReinitialize: true,
    mapPropsToValues: () => {

        return {

            email: '',
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

        props.setUpdateStatusText(i18.account_information_update_success)
        console.log(values)
        return

        auth.onAuthStateChanged((user) => {
            axiosInst.get(api.customers, { params: { customerID: user.uid } }).then((res) => {

                const customerInfo = {}
                Object.assign(customerInfo, { customerID: user.uid }) // ensure customerID exists

                // Temp filter asdf
                res.data.forEach((value) => {
                    if (value['customerID'] === user.uid) return Object.assign(customerInfo, value)
                })

                // Assign updated values
                Object.assign(customerInfo, values)

                const customerSchemaInfo = {
                    Email: customerInfo?.email || '',
                    shippingAddress: {
                        address: customerInfo?.address || '',
                        zip: customerInfo?.zip || '',
                        city: customerInfo?.zone || '',
                        county: customerInfo?.district || '',
                        provice: customerInfo?.provice || '',
                        fullname: customerInfo?.fullname || '',
                    },
                    fullname: customerInfo?.fullname || '',
                    phone: customerInfo?.phone || ''
                }

                console.log("asdf", customerSchemaInfo)

                const documentKey = customerInfo.myID || null

                if (!documentKey) {
                    // Make new if doesn't exist

                    const pack = {
                        uid: user.uid,
                        data: customerSchemaInfo
                    }

                    axiosInst.post(api.customers, pack).then((res) => {
                        alert(i18.account_information_update_success)
                    }).catch((reason) => {
                        alert(i18.account_information_update_failed_general, reason)
                    })
                } else {
                    // Otherwise update
                    axiosInst.put(api.customers + `/${documentKey}`, customerSchemaInfo).then((res) => {
                        alert(i18.account_information_update_success)
                    }).catch((reason) => {
                        alert(i18.account_information_update_failed_general, reason)
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


const MemberAccountComponent = () => {

    const [userInfo, setUserInfo] = useState({})
    const [updateStatusText, setUpdateStatusText] = useState("　")

    useEffect(() => {
        // console.log(currentEmail)
        auth.onAuthStateChanged((userCredential) => {
            axiosInst.get(`customers/${auth.currentUser.uid}`).then((res) => {
                // console.log(res, auth.currentUser.uid)

                // Temporary for filtering the customer data
                const custInfo = res.data

                // console.log(custInfo)

                const formikSchema = {
                    email: custInfo.Email || userCredential.email,

                    address: custInfo?.shippingAddress?.address || '',
                    zip: custInfo?.shippingAddress?.zip || '',
                    zone: custInfo?.shippingAddress?.city || '',
                    district: custInfo?.shippingAddress?.county || '',
                    provice: custInfo?.shippingAddress?.provice || '',

                    fullname: custInfo?.fullname || '',
                    phone: custInfo?.phone || ''
                }

                setUserInfo(formikSchema)
            })
        })
    }, [])

    return (
        <main className={styles.pageContainer}>

            <h2>มุมสมาชิก - จัดการบัญชี</h2>
            <h3>สวัสดีคุณ  customer_name  เลือกเมนูการใช้งานได้เลยค่ะ</h3>
            <h3>หมายเลขสมาชิก MEM0001</h3>
            {(() => {
                if (updateStatusText === i18.account_information_update_success) {
                    return (<p className={styles.accountCreateSuccess}>{updateStatusText}</p>)
                } else if (updateStatusText !== null) {
                    return (<p className={styles.accountCreateFailed}>{updateStatusText}</p>)
                }
                return (<p>　</p>)
            })()}

            <div className={styles.flexWrapper}>

                <EnhancedLoginCredentialsComponent emailDisabled={true} userInfo={userInfo} setUserInfo={setUserInfo} setUpdateStatusText={setUpdateStatusText} />
                <EnchancedLocationFieldsComponent onlyLocation={false} emailDisabled={true} userInfo={userInfo} setUserInfo={setUserInfo} setUpdateStatusText={setUpdateStatusText} />

            </div>

        </main>
    );
}

export default MemberAccountComponent;
