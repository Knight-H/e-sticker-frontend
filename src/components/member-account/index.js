import React, { useEffect, useState } from "react";
import styles from './index.module.scss';

import LocationFieldsComponent from '../location-fields';
import { LoginCredentialsComponent2 } from '../login-credentials';
import { Form, Field, withFormik } from 'formik'


import { i18_th } from '../common-scss/i18_text'

import { axiosInst } from '../common-scss/common'

import axios from "axios";
import auth, { db } from "../../firebase";


const EnhancedLoginCredentialsComponent = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            email: '',
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

    const { userInfo } = props
    useEffect(() => {
        props.setFieldValue("email", userInfo.email)
    }, [userInfo])

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
                errors[fieldName] = i18_th.required
            }
        })

        return errors
    },
    handleSubmit: async (values) => {

        const api = {
            customers: "customers",
            cart: "cart",
            noti: "noti",
            orders: "orders",
            paymentOptions: "paymentOptions",
            productOptions: "productOptions",
            shippingOptions: "shippingOptions"
        }

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

                //     email: '',
                // phone: '',

                // address: '',
                // fullname: '',

                // district: '',
                // zone: '',

                // provice: '',
                // zip: '',

                const customerSchemaInfo = {
                    Email: customerInfo?.email,
                    shippingAddress: {
                        address: customerInfo?.address,
                        zip: customerInfo?.zip,
                        city: null,
                        county: null,
                        province: customerInfo?.province,
                        fullname: customerInfo?.fullname,
                    },
                    fullname: customerInfo?.fullname,
                    phone: customerInfo?.phone
                }

                const documentKey = customerInfo.myID || null

                // console.log("key", documentKey)
                if (!documentKey) {
                    // Make new if doesn't exist
                    axiosInst.post(api.customers, customerSchemaInfo).then((res) => {
                        alert(i18_th.account_information_update_success)
                    }).catch((reason) => {
                        alert(i18_th.account_information_update_failed_general, reason)
                    })
                } else {
                    // Otherwise update
                    axiosInst.put(api.customers + `/${documentKey}`, customerSchemaInfo).then((res) => {
                        alert(i18_th.account_information_update_success)
                    }).catch((reason) => {
                        alert(i18_th.account_information_update_failed_general, reason)
                    })
                }
            })
        })

        // const axiosInst = axios.create({
        //     baseURL: "https://asia-east2-digitalwish-sticker.cloudfunctions.net/",
        // })


        // let res = null
        // try {
        //     res = await axiosInst.get(api.customers, {
        //         params: {
        //             myID: "DUfm5vSyoOhfuGThW3LDeVKAAbv1"
        //         }
        //     })
        // } catch (e) {
        //     console.log(e)
        // }
        // console.log(res.data)

        // axiosInst.get(api.customers, { params: { customerInfo: "" } })

        // axiosInst.post(api.customers, values).then((res) => {
        //     alert(i18_th.account_information_update_success)
        // }).catch((reason) => {
        //     alert(i18_th.account_information_update_failed_general, reason)
        // })

        // axiosInst.post(api.customers + "/validate", values).then((res) => {
        //     console.log("ok post", res)
        // })

        // setTimeout(() => {
        //     console.log(values)
        //     alert(JSON.stringify(values, null, 2))
        // }, 0)
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

    useEffect(() => {
        // console.log(currentEmail)
        auth.onAuthStateChanged((userCredential) => {
            axiosInst.get("customers", {
                params: {
                    customerID: auth.currentUser.uid
                }
            }).then((res) => {
                // Temporary for filtering the customer data
                const customerInfo = res.data.filter((data) => {
                    return data["customerID"] === auth.currentUser.uid
                })[0]
                // console.log("got:", customerInfo)

                setUserInfo(customerInfo)
            })
        })
    }, [userInfo])

    // useEffect(() => {

    // }, [currentEmail])

    return (
        <main className={styles.pageContainer}>

            <h2>มุมสมาชิก - จัดการบัญชี</h2>
            <h3>สวัสดีคุณ  customer_name  เลือกเมนูการใช้งานได้เลยค่ะ</h3>
            <h3>หมายเลขสมาชิก MEM0001</h3>

            <div className={styles.flexWrapper}>

                <EnhancedLoginCredentialsComponent emailDisabled={true} userInfo={userInfo} />
                <EnchancedLocationFieldsComponent onlyLocation={false} emailDisabled={true} userInfo={userInfo} setUserInfo={setUserInfo} />

            </div>

        </main>
    );
}

export default MemberAccountComponent;