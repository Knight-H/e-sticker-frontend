import React from "react";
import styles from './index.module.scss';

const LoginCredentialsComponent = ({ isRegistering = true }) => {
    return (
        <>
            <div className={styles.formControl}>
                <p>อีเมล</p>
                <div ><input type="text" value="" /></div>
            </div>

            <div className={styles.formControl}>
                <p>เปลี่ยนรหัสผ่าน</p>
                <div ><input type="text" value="" /></div>
                <div ><input type="text" value="" /></div>
            </div>

            {isRegistering ?
                <>
                    <div className={styles.formControl}>
                        <p>เบอร์โทรศัพท์</p>
                        <div ><input type="text" value="" /></div>
                    </div>
                </> :
                <>
                    <button className={styles.greenButton}>
                        เปลี่ยนรหัสผ่าน
                    </button>
                </>
            }


        </>
    );
}
export default LoginCredentialsComponent;