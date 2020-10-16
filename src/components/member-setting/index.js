import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent from '../login-credentials';
import AdminKpi from '../admin-kpi'
import { EnhancedLoginComponent } from '../member/index'

import { dummyHandleSubmit } from '../common-scss/common'
import { i18_th } from '../common-scss/i18_text'
import { Field, withFormik, ErrorMessage, Form } from "formik";

let EnhancedLocationFieldsNoAccStatus = withFormik({
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
        }
    },
    validate: (values) => {
        const errors = {}

        console.log(values)
        Object.entries(values).forEach(([fieldName, fieldValue]) => {
            if (!fieldValue) {
                errors[fieldName] = i18_th.required
            }
        })

        return errors
    },
    handleSubmit: dummyHandleSubmit
})((props) => {
    return (
        <Form className={styles.userInfo}>
            <LocationFieldsComponent onlyLocation={false} {...props} />
            <Field name="submit" type="submit" className={styles.greenButton} value="บันทึก" />
        </Form>
    )
})


let MemberSettingComponent = (props) => {

    // const emailState = useState("asdf")

    // const [selectMonth, setSelectMonth] = useInputChange();
    // const [dropDawn, setDropDawn] = useState(0);

    // const { values } = props

    // const handleChangeDropDawn = (e) => {
    //     values.accountState = parseInt(e.value) || 0 // If error value then assume be 0 (Normal)
    //     setDropDawn(e.value);
    // };

    // const [accountState, setAccountState] = useState(0)

    // useEffect(() => {
    //     let url = window.location.search;
    //     const urlParams = new URLSearchParams(url);
    //     const userID = urlParams.get('user_id');
    // }, []);



    // const [currentEmail, setCurrentEmail] = useState("asdf@ee")
    // const [counter, setCounter] = useState(0)

    // useEffect(() => {
    //     setInterval(()=>{
    //         setCurrentEmail("kkkkkk@rtyu"+counter)
    //         setCounter(counter + 1)
    //     })
    //     setFieldValue
    // }, [currentEmail])
    const currentEmail = "123@123.123"

    return (
        <main className={styles.pageContainer}>

            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            <section className={styles.section1}>

                <h2>รายสมาชิก - จัดการบัญชี</h2>
                {/* <h3>สมาชิกหมายเลข MEM0001</h3> */}

                <div className={styles.flexWrapper}>

                    <EnhancedLoginComponent email={currentEmail} emailDisabled={true} />
                    <EnhancedLocationFieldsNoAccStatus email={currentEmail} emailDisabled={true} />

                </div>
            </section>
        </main>
    )
}

export default MemberSettingComponent;