import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import styles from './index.module.scss';

const FooterComponent = ({ history }) => {
    return (
        <footer>
            <div className={styles.bg_footer}>
                <ul>
                    <li className={styles.title_bold}>เมนู</li>
                    <li>สั่งสติกเกอร์</li>
                    <li>ขั้นตอนการสั่ง</li>
                    <li>ดูสถานะการสั่งซื้อ</li>
                    <li>ติดต่อเรา</li>
                </ul>

            </div>
            <div className={styles.footer}>
                © 2020 Digitalwish Sticker by Digitalwish CO. LTD
            </div>
        </footer>
    );
};

export default withRouter(FooterComponent);