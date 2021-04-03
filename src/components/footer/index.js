import React from "react";
import styles from './index.module.scss';
import { Link } from "react-router-dom";

import { ReactComponent as BannerFooter } from './banner-footer.svg';
import { ReactComponent as QrCode } from './qr-code.svg';

const FooterComponent = () => {
    return (
        <footer>
            <div className={styles.bgFooter}>
                <BannerFooter className={styles.banner} />
                <ul>
                    <li><b>เมนู</b></li>
                    <li>
                        <Link to="/">หน้าแรก</Link>
                    </li>
                    <li><Link to={{
                        pathname: "/",
                        // hash: "#stepsOrder",
                        state: { scrollToStepsOrder: true }
                    }}
                    // onClick={stepsOrderScroll}
                    >วิธีการสั่งซื้อ</Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/",
                            // hash: "#ourWorks",  
                            state: { scrollToOurWorks: true }
                        }}>ตัวอย่างผลงาน</Link>
                    </li>
                    <li>
                        {/* <button> */}
                            <Link to="/customize">สั่งทำสติกเกอร์</Link>
                        {/* </button> */}
                    </li>
                </ul>
                <ul className={styles.colQrCode}>
                    <li><b>Scan Line QR code</b></li>
                    <li><QrCode /></li>
                </ul>
                <ul className={styles.listContract}>
                    <li className={styles.squareLine}><b>Line Official</b><span className={styles.squareWhite}>@digitalwish.sticker</span></li>
                    <li className={styles.squareFace}><b>Facebook</b><span className={styles.squareWhite}>digitalwish.sticker</span></li>
                    <li className={styles.squareEmail}><b>Email</b><span className={styles.squareWhite}>stickerwish.th@gmail.com</span></li>
                </ul>
            </div>
            <div className={styles.footerBar}>
                © 2020 Digitalwish Sticker by Digitalwish CO. LTD
            </div>
        </footer>
    );
};

export default FooterComponent;