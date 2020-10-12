import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent, { LoginCredentialsComponent2 } from '../login-credentials';
import AdminKpi from '../admin-kpi';
import { Formik, Field, Form, withFormik } from "formik";


// const useInputChange = () => {
//     const [input, setInput] = useState({})

//     const handleInputChange = (e) => setInput({
//         ...input,
//         [e.currentTarget.name]: e.currentTarget.value
//     })

//     return [input, handleInputChange]
// }

let MemberComponent = (props) => {
    // const [selectMonth, setSelectMonth] = useInputChange();
    const [dropDawn, setDropDawn] = useState(0);

    const { values } = props

    const handleChangeDropDawn = (e) => {
        values.accountState = parseInt(e.value) || 0 // If error value then assume be 0 (Normal)
        setDropDawn(e.value);
    };

    console.log(styles)
    // const [accountState, setAccountState] = useState(0)

    // useEffect(() => {
    //     let url = window.location.search;
    //     const urlParams = new URLSearchParams(url);
    //     const userID = urlParams.get('user_id');
    // }, []);

    return (
        <main className={styles.pageContainer}>

            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            {/* <section className={styles.section1}> */}

                <h2>รายสมาชิก - จัดการบัญชี</h2>
                <h3>สมาชิกหมายเลข MEM0001</h3>

                <div className={styles.testExists}>

                    <section className={styles.testExists}>
                    {/* <section style={{padding: "100px"}}> */}
                        <LoginCredentialsComponent2 isRegistering={false} />
                    </section>

                        <Form className={styles.userInfo}>
                            <LocationFieldsComponent onlyLocation={false} />

                            <div className={styles.row}>
                                <p>สถานะ</p>
                                <div className={styles.selectBox}>

                                    {/* Display option when dropdown is hidden */}
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

                                    {/* The dropdown options */}
                                    <ul className={styles.selectBoxList}>
                                        <li><label className={`${styles.selectBoxOption} ${styles.comboBoxStatusGreen}`} value="0">ปกติ</label></li>
                                        <li><label className={`${styles.selectBoxOption} ${styles.comboBoxStatusRed}`} value="1">แบน</label></li>
                                    </ul>

                                </div>
                            </div>

                            <Field type="submit" className={styles.greenButton} value="บันทึก" />
                        </Form>

                </div>
            {/* </section> */}
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
export default EnhancedMemberComponent;