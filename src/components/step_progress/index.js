import React from "react";
import styles from './index.module.scss';

const StepProgress = (props) => {
    return (
        <div className={styles.container}>
            <ul className={styles.progressbar}>
                <li className={props.stepIndex===1 && styles.active}>เลือกรูปแบบสินค้า</li>
                <li className={props.stepIndex===2 && styles.active}>อัพโหลดไฟล์ & ชำระเงิน</li>
                <li className={props.stepIndex===3 && styles.active}>อนุมัติแบบ</li>
                <li className={props.stepIndex===4 && styles.active}>ผลิต และ จัดส่งสินค้า</li>
            </ul>
        </div>
    );
};

export default StepProgress;