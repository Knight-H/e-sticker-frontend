import React from "react";
import styles from './index.module.scss';

import { ReactComponent as BannerFooter } from './banner-footer.svg';
import { ReactComponent as QrCode } from './qr-code.svg';

const FooterComponent = () => {
    return (
        <footer>
            <div className={styles.bgFooter}>
                <BannerFooter className={styles.banner} />
                <ul>
                    <li><b>เมนู</b></li>
                    <li>สั่งสติกเกอร์</li>
                    <li>ขั้นตอนการสั่ง</li>
                    <li>ดูสถานะการสั่งซื้อ</li>
                    <li>ติดต่อเรา</li>
                </ul>
                <ul className={styles.colQrCode}>
                    <li><b>Scan Line QR code</b></li>
                    <li><QrCode /></li>
                </ul>
                <ul className={styles.listContract}>
                    <li className={styles.squareLine}><b>Line Official</b><span className={styles.squareWhite}>@digitalwish.sticker</span></li>
                    <li className={styles.squareFace}><b>Facebook</b><span className={styles.squareWhite}>digitalwish.sticker</span></li>
                    <li className={styles.squareEmail}><b>Email</b><span className={styles.squareWhite}>contact@stickerwish.com</span></li>
                </ul>
            </div>
            <div className={styles.footerBar}>
                © 2020 Digitalwish Sticker by Digitalwish CO. LTD
            </div>
        </footer>
    );
};

export default FooterComponent;