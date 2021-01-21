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
import qs from 'qs'

import { i18_th as i18 } from "../common-scss/i18_text";

export let EnhancedLocationFields = withRouter(withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        return {
            email: props.email || '',
            phone: '',
            address: '',
            fullname: '',

            county: '',
            city: '',
            provice: '',
            zip: '',

            accountState: ''
        }
    },
    validate: (values) => {
        const errors = {}

        // console.log(values)
        Object.entries(values).forEach(([fieldName, fieldValue]) => {

            // Ignore accountState because the value 0 is used
            // to indicate "Normal"
            if (["accountState", "line_channel", "line_token", "loading"].includes(fieldName)) { return }
            if (!fieldValue) {
                errors[fieldName] = i18.required
            }
        })

        return errors
    },
    handleSubmit: (values, { props }) => {
        props.setLoading(true);
        const moreUserInfo = Object.fromEntries(Object.entries(values).filter(([key, value]) => {
            // 
            return true
        }))
        Object.assign(values, moreUserInfo)
        console.log("moreUserInfo", moreUserInfo)

        auth.onAuthStateChanged((userCredential) => {

            const uid = moreUserInfo.id

            const customerSchemaInfo = {
                email: moreUserInfo?.email || moreUserInfo?.email || '',
                shippingAddress: {
                    address: moreUserInfo?.address || '',
                    zip: moreUserInfo?.zip || '',
                    city: moreUserInfo?.city || '',
                    county: moreUserInfo?.county || '',
                    provice: moreUserInfo?.provice || '',
                    fullname: moreUserInfo?.fullname || '',
                },
                fullname: moreUserInfo?.fullname || '',
                phone: moreUserInfo?.phone || '',
                customerID: moreUserInfo.customerID ? moreUserInfo.customerID : '',
                status: moreUserInfo?.accountState || moreUserInfo?.state || "ok"
            }
            console.log("sent", customerSchemaInfo)

            axiosInst.put(`customers/${uid}`, customerSchemaInfo).then((res) => {
                // console.log(customerSchemaInfo)
                // console.log(props.setUserInfo)
                props.setLoading(false);
                props.setUserInfo(customerSchemaInfo)
                props.setUpdateStatusText(i18.account_information_update_success)
                console.log("Update sucessful")
            }).catch((reason) => {
                props.setUpdateStatusText(i18.account_information_update_failed_general)
                props.setLoading(false);
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
        console.log("e.value", e.value)
        // values.accountState = parseInt(e.value) || 0 // If error value then assume be 0 (Normal)
        setDropDawn(e.value);
        setFieldValue("accountState", e.value, false)
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
                            <Field className={styles.selectBoxInput} name="accountState" type="radio" id="0" value="ok" checked={`${values.accountState}` === `ok` ? true : false} onChange={(e) => handleChangeDropDawn(e.target)} />
                            <p className={`${styles.selectBoxInputText}  ${styles.comboBoxStatusGreen}`}>ปกติ</p>
                        </div>
                        <div className={styles.selectBoxValue}>
                            <Field className={styles.selectBoxInput} name="accountState" type="radio" id="1" value="notOk" checked={`${values.accountState}` === `notOk` ? true : false} onChange={(e) => handleChangeDropDawn(e.target)} />
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
    const [loading, setLoading] = useState(false);
    const [updateStatusText, setUpdateStatusText] = useState("　")

    useEffect(() => {
        setLoading(true);
        const urlParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        // console.log(urlParams)

        axiosInst.get(`customers/${urlParams.user_id}`).then((res) => {

            // React.setC
            const custInfo = res.data
            console.log("custInfo", custInfo)
            const formikSchema = {
                id: custInfo.id ? custInfo.id : '',
                email: custInfo.Email || custInfo.email,
                customerID: custInfo.customerID ? custInfo.customerID : '',

                address: custInfo?.shippingAddress?.address || '',
                zip: custInfo?.shippingAddress?.zip || '',
                city: custInfo?.shippingAddress?.city || '',
                county: custInfo?.shippingAddress?.county || '',
                provice: custInfo?.shippingAddress?.provice || '',

                fullname: custInfo?.fullname || '',
                phone: custInfo?.phone || '',

                line_channel: custInfo.line_channel ? custInfo.line_channel : '',
                line_token: custInfo.line_token ? custInfo.line_token : '',
                
                accountState: custInfo.status
            }

            console.log("Receive", formikSchema)

            setUserInfo(formikSchema)
            setLoading(false);
        }).catch((reason) => {
            console.log(reason)
            setLoading(false);
        })
    }, [])

    const currentEmail = "123@123.123"

    return (
        <main className={styles.pageContainer}>
<div class={`loader loader-default ${loading ? 'is-active' : ''}`}></div>
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

                {userInfo.line_channel ?
                    <div className={styles.loginCredentialsNoneDisplay}>

                    </div>
                    :
                    <EnhancedLoginCredentialsComponent email={currentEmail} setLoading={setLoading} emailDisabled={true} userInfo={userInfo} setUpdateStatusText={setUpdateStatusText} setUserInfo={setUserInfo} />
                }
                    <EnhancedLocationFields email={currentEmail} emailDisabled={true} setLoading={setLoading} userInfo={userInfo} setUpdateStatusText={setUpdateStatusText} setUserInfo={setUserInfo} />

                </div>
            </section>
        </main>
    )
}

export default MemberComponent