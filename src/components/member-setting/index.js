import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent from '../login-credentials';
import AdminKpi from '../admin-kpi'

import { Formik, Field, Form, useFormik, withFormik, ErrorMessage } from "formik";

const PasswordChangeComponent = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props
    return (

        <>
            <form onSubmit={handleSubmit}>
                <section className={styles.loginCredentials}>
                    <div className={styles.flexWrapper}>

                        {/* if email is provided, display the email in the disabled text input field */}
                        {props.email ?
                            <div className={styles.formControl}>
                                <p>อีเมล</p>
                                <div className={styles.formControl}>
                                    <Field name="email" type="text" disabled value={props.email} />
                                </div>
                            </div>
                            : <></>
                        }

                        <div className={styles.formControl}>
                            <p>เปลี่ยนรหัสผ่าน <ErrorMessage name="password" render={msg => <span style={{ color: "red" }}>{msg}</span>} /></p>
                            <div className={styles.formControl}>
                                <Field name="password" type="password" placeholder="" />
                            </div>
                            <div className={styles.formControl}>
                                <Field name="password_repeat" type="password" placeholder="รหัดผ่านอีกครัง" />
                            </div>
                        </div>

                        <button type="submit" className={styles.greenButton}>เปลี่ยนรหัสผ่าน</button>

                    </div>
                </section>
            </form>
        </>
    )
}

export const EnhancedPasswordChangeComponent = withFormik({
    mapPropsToValues: () => ({
        password: '',
        password_repeat: ''
    }),
    validate: values => {
        const errors = {}

        if (values.password === "") {
            errors.password = "Required"
        }
        else if (values.password_repeat === "") {
            errors.password = "Required"
        }
        else if (values.password !== values.password_repeat) {
            errors.password = "Different!"
        }

        return errors;
    },
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false)
        }, 100)
    },
    displayName: 'PasswordChangeComponentForm',
})(PasswordChangeComponent)



const useInputChange = () => {
    const [input, setInput] = useState({})

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })

    return [input, handleInputChange]
}

const MemberSettingComponent = () => {
    // const [selectMonth, setSelectMonth] = useInputChange();
    // const [dropDawn, setDropDawn] = useState(0);

    // const handleChangeDropDawn = (e) => {
    //     setDropDawn(e.value);
    // };

    // useEffect(() => {
    //     let url = window.location.search;
    //     const urlParams = new URLSearchParams(url);
    //     const userID = urlParams.get('user_id');
    // }, []);

    return (

        <>
            <section className={styles.section1}>
                <AdminKpi kpi={{ "order": 10, "sales": 1234567, "member": 1000 }} />
            </section>

            <main className={styles.section1}>

                <h3>เปลี่ยนรหัสผ่าน</h3>

                {/* <div className={styles.flexWrapper}> */}

                {/* <section className={styles.loginCredentials}> */}

                <EnhancedPasswordChangeComponent email="admin@gmail.com" />
                {/* </section> */}

                {/* </div> */}

            </main>
        </>
    );
}

export default MemberSettingComponent;