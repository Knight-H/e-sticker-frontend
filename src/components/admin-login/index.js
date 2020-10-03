import React from "react";
import styles from './index.module.scss';
import { withFormik } from 'formik';
import TextInput from '../common/formik-text-input';
import PasswordInput from '../common/formik-password-input';

const AdminLoginComponent = () => {
    return (
        <main>
            <form className={styles.formAdminLogin}>
                <h3>Stickerwish Admin Login</h3>
                <label>อีเมล</label>
                <TextInput className="inputText" name="email" />

                <label>รหัสผ่าน</label>
                <PasswordInput className="inputText" name="password" />

                <button type="button">เข้าสู่ระบบ</button>
            </form>
        </main >
    );
};

const EnhancedAdminLoginComponent = withFormik({
    mapPropsToValues: (props) => ({
        email: '',
        password: ''
    })
})(AdminLoginComponent);

export default EnhancedAdminLoginComponent;