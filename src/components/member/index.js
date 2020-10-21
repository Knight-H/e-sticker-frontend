import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent, { LoginCredentialsComponent2 } from '../login-credentials';
import AdminKpi from '../admin-kpi';
import { Formik, Field, Form, withFormik } from "formik";
import { dummyHandleSubmit, dummyValidateError, DummyDiv } from "../common-scss/common"

import { auth } from "../../firebase";
import Firebase from 'firebase'

import axios from 'axios'
import { i18_th } from "../common-scss/i18_text";

// const useInputChange = () => {
//     const [input, setInput] = useState({})

//     const handleInputChange = (e) => setInput({
//         ...input,
//         [e.currentTarget.name]: e.currentTarget.value
//     })

//     return [input, handleInputChange]
// }




export let EnhancedLoginComponent = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            email: props.email || "",
            password: "",
            password_repeat: ""
        }
    },
    validate: (values) => {
        const errors = {}

        if (values.email === "") {
            errors.email = "Required!"
        }

        if (values.password !== values.password_repeat) {
            errors.password = "Different!"
        }

        return errors
    },
    handleSubmit: async (values) => {

        // re-provide their sign-in credentials
        // https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user

        // Getting fresh credential
        // https://stackoverflow.com/a/37812541

        // Makeing credential object
        // https://firebase.google.com/docs/reference/js/firebase.auth.EmailAuthProvider#.credential
        // TL;DR use the Prototype(Class) itself's auth not the instance
        // Firebase.auth IS NOT EQUAL TO Firebase.auth()

        let freshCredential = null
        try {
            freshCredential = Firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, "admin123")
        } catch (e) {
            alert("eeee", e)
        }

        try {
            await auth.currentUser.reauthenticateWithCredential(freshCredential)
        } catch (e) {
            alert(e)
        }

        try {
            await auth.currentUser.updatePassword(values.password)

            console.log("password changed ok")
            alert(i18_th.account_password_change_success)
        } catch (e) {
            console.log("failed to change", e)
            alert(i18_th.account_password_change_failed_general, e)
        }

    }
})((props) => {
    return (
        <Form className={styles.loginCredentials}>
            <LoginCredentialsComponent2 isRegistering={false} {...props} />
        </Form>
    )
})

export let EnhancedLocationFields = withFormik({
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
    const [dropDawn, setDropDawn] = useState(0);

    const { values, setFieldValue } = props

    const handleChangeDropDawn = (e) => {
        values.accountState = parseInt(e.value) || 0 // If error value then assume be 0 (Normal)
        setDropDawn(e.value);
    }

    // useEffect(() => {

    //     auth.signInWithEmailAndPassword("admin@admin.com", "admin123")
    //     auth.onAuthStateChanged((user) => {
    //         console.log("user", user.uid)   
    //         axios.get("https://asia-east2-digitalwish-sticker.cloudfunctions.net/customers/" + user.uid).then((res) => {
    //             console.log("'/customers/" + user.uid + "' got:", res.data)
    //         })
    //     })
    // }, []);

    // useEffect(async () => {

    //     console.log("current user uid:", JSON.stringify(auth.onAuthStateChanged))
    //     // Object.keys(values).forEach((key) => {
    //     //     setFieldValue(key, testObj[key])
    //     // })

    // }, [])

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
})

let MemberComponent = (props) => {

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

            <section className={styles.section2}>

                <h2>รายสมาชิก - จัดการบัญชี</h2>
                <h3>สมาชิกหมายเลข MEM0001</h3>

                <div className={styles.flexWrapper}>

                    <EnhancedLoginComponent email={currentEmail} emailDisabled={true} />
                    <EnhancedLocationFields email={currentEmail} emailDisabled={true} />

                </div>
            </section>
        </main>
    )
}


const EnhancedMemberComponent = withFormik({
    mapPropsToValues: () => ({

        email: '',
        phone: '',
        address: '',
        fullname: '',

        district: '',
        zone: '',
        provice: '',
        zip: '',

        accountState: 0
    }),
    validate: (values) => {
        const errors = {}

        // TODO add validation for the values

        return errors
    },
    handleSubmit: (values) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
        }, 0)
    }
})(MemberComponent)

// MemberComponent = EnhancedMemberComponent
// let memberComponent = MemberComponent


export default (props) => { return (<MemberComponent />) }