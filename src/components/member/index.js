import React, {useState}  from "react";
import styles from './index.module.scss';
import { ReactComponent as IconArrow } from './icon-arrow.svg';
import LocationFieldsComponent from '../location-fields';
import LoginCredentialsComponent from '../login-credentials';


const useInputChange = () => {
    const [input, setInput] = useState({})

    const handleInputChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    })

    return [input, handleInputChange]
}

const MemberComponent = () => {
    const [selectMonth, setSelectMonth] = useInputChange();
    const [dropDawn, setDropDawn] = useState(0);

    const handleChangeDropDawn = (e) => {
        setDropDawn(e.value);
    };


    return (
        <main className={styles.container}>

            <h2>มุมสมาชิก - จัดการบัญชี</h2>
            <h3>สวัสดีคุณ  customer_name  เลือกเมนูการใช้งานได้เลยค่ะ</h3>
            <h3>หมายเลขสมาชิก MEM0001</h3>

            <div className={styles.flexWrapper}>

                <section className={styles.loginCredentials}>
                    <LoginCredentialsComponent isRegistering={false}/>
                </section>

                <section className={styles.userInfo}>
                    < LocationFieldsComponent />
                    <div className={styles.row}>
                        <p>สถานะ</p>
                        <div className={styles.selectBox}>
                            <div className={styles.selectBoxCurrent} tabindex="1">
                                <div className={`${styles.selectBoxValue}`}>
                                    <input className={styles.selectBoxInput} type="radio" id="0" value="0" checked={`${dropDawn}` === `${0}` ? true : false} onChange={(e) => handleChangeDropDawn(e.target)} />
                                    <p className={`${styles.selectBoxInputText}  ${styles.comboBoxStatusGreen}`}>ปกติ</p>
                                </div>
                                <div className={styles.selectBoxValue}>
                                    <input className={styles.selectBoxInput} type="radio" id="1" value="1" checked={`${dropDawn}` === `${1}` ? true : false} onChange={(e) => handleChangeDropDawn(e.target)} />
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
                    
                    <button className={styles.greenButton}>บันทึก</button>
                    
                </section>
                

            </div>


        </main>
    );
}

export default MemberComponent;