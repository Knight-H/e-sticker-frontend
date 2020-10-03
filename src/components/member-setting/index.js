import React, {useState, useEffect}  from "react";
import styles from './index.module.scss';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent from '../login-credentials';
// import { Formik, Field, Form } from "formik";

const useInputChange = () => {
    const [input, setInput] = useState({})

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })

    return [input, handleInputChange]
}

const MemberSettingComponent = () => {
    const [selectMonth, setSelectMonth] = useInputChange();
    const [dropDawn, setDropDawn] = useState(0);

    const handleChangeDropDawn = (e) => {
        setDropDawn(e.value);
    };

    useEffect(() => {
        let url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const userID = urlParams.get('user_id');
    }, []);


    return (
        <main className={styles.container}>

            <h2>มุมสมาชิก - จัดการบัญชี</h2>
            <h3>สวัสดีคุณ  customer_name  เลือกเมนูการใช้งานได้เลยค่ะ</h3>
            <h3>หมายเลขสมาชิก MEM0001</h3>

            <div className={styles.flexWrapper}>

                <section className={styles.loginCredentials}>
                    <LoginCredentialsComponent isRegistering={false}/>
                </section>


                

            </div>


        </main>
    );
}

export default MemberSettingComponent;